const express = require('express');
const next = require('next');
const Imap = require('imap');
const nodemailer = require('nodemailer');
const parser = require('mailparser').simpleParser;
const WebSocketServer = require('ws').Server;
const {
    ServerSocketDataSender,
    ServerSocketDataReceiver
  } = require('./server-utils/serverSocketData');

const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

const imapConnect = login => {
  const imap = new Imap(login);
  return new Promise(resolve => {
    let mail = [];
    imap
      .once('ready', () => {
        imap.openBox('INBOX', true, (err, box) => {
          if (err) throw err;
          imap.seq.fetch(`${ box.messages.total - 20 }:${ box.messages.total }`, { bodies: '', markSeen: true })
            .on('message', (msg, seqno) => msg.on('body', stream => {
              let buffer = '', count = 0;
              stream.on('data', chunk => {
                count += chunk.length;
                buffer += chunk;
              });
              stream.once('end', () => parser(buffer).then(parsed => mail[seqno - 1] = parsed));
            }))
            .once('end', () => imap.end());
        });
      })
      .once('error', () => resolve(-1))
      .once('end', () => resolve(mail))
      .connect();
  });
};

app
  .prepare()
  .then(async () => {
    const server = express()
      .get('*', (req, res) => handle(req, res))
      .listen(port, err => {
        if (err) throw err;
        dev && console.log('> Ready on http://localhost:3000');
      });

    const wss = new WebSocketServer({ server });

    wss.on('connection', ws => ws.on('message', async message => {
      const m = new ServerSocketDataReceiver(message);
      switch (m.name) {
        case 'no-login':
          ws.send(ServerSocketDataSender('no-login'));
          break;
        case 'credentials':
          let config = {
            user: m.data.email,
            password: m.data.password,
            host: m.data.imap,
            port: 993,
            tls: true
          };
          if (dev) config.tlsOptions = { rejectUnauthorized: false };
          const mail = await imapConnect(config);
          ws.send(
            mail !== -1 ?
              ServerSocketDataSender('mail', mail)
              : ServerSocketDataSender('no-login')
          );
          break;
        case 'send':
          let fields = {
            from: `"AbleMail" <${ m.data.credentials.email }>`,
            to: m[2][0], // TODO: Clean up this mess
            subject: m[2][1],
            html: m[2][2],
            // attachments: [{ filename: 'recording.mp4' }] // TODO: Make this work: https://nodemailer.com/message/attachments/
          };
          if (m[3] !== '') fields.cc =  m[3];
          await nodemailer.createTransport({
            host: m[4],
            port: 465,
            secure: true,
            auth: {
              user: m[1][0],
              pass: m[1][1]
            }
          }).sendMail(fields);
          break;
        case 'help':
          await nodemailer.createTransport({
            host: m[4],
            port: 465,
            secure: true,
            auth: {
              user: m[1][0],
              pass: m[1][1]
            }
          }).sendMail({
            from: `"AbleMail" <${ m[1][0] }>`,
            to: m[3],
            subject: `Fwd (help needed): ${ m[2].subject }`,
            html: `I think I may need help with this email:
              <br>
              <br>
              <blockquote>${ m[2].body }</blockquote>`
          });
      }
    }));
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
