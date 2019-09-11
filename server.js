const express = require('express');
const next = require('next');
const Imap = require('imap');
const nodemailer = require('nodemailer');
const fs = require('fs');
const parser = require('mailparser').simpleParser;
const WebSocketServer = require('ws').Server;

const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;
const hosts = JSON.parse(fs.readFileSync('imap.json'));

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

    wss.on('connection', ws => {
      ws.on('message', async message => {
        const m = JSON.parse(message);
        switch (m[0]) {
          case 'no-login':
            ws.send(JSON.stringify(['no-login']));
            break;
          case 'credentials':
            let config = {
              user: m[1][0],
              password: m[1][1],
              host: hosts[m[1][0].split('@')[1]],
              port: 993,
              tls: true
            };
            if (dev) {
              config.tlsOptions = { rejectUnauthorized: false };
            }
            const mail = await imapConnect(config);
            ws.send(JSON.stringify(mail !== -1 ? ['mail', mail] : ['no-login']));
            break;
          case 'send':
            let fields = {
              from: `"AbleMail" <${ m[1][0] }>`,
              to: m[2][0],
              subject: m[2][1],
              html: m[2][2],
              // attachments: [{ filename: 'recording.mp4' }] // TODO: Make this work: https://nodemailer.com/message/attachments/
            };
            if (m[3] !== '') fields.cc =  m[3];
            await nodemailer.createTransport({
              host: 'smtp.gmail.com', // TODO: Other smtp servers
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
              host: 'smtp.gmail.com', // TODO: Other smtp servers
              port: 465,
              secure: true,
              auth: {
                user: m[1][0],
                pass: m[1][1]
              }
            }).sendMail({
              from: `"AbleMail" <${ m[1][0] }>`,
              to: m[3],
              subject: m[2].subject,
              html: m[2].body
            });
        }
      });
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
