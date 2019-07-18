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
const port = 3000;
const wss = new WebSocketServer({ port: 8081 });
const hosts = JSON.parse(fs.readFileSync('imap.json'));

const imapConnect = login => {
  const imap = new Imap(login);
  return new Promise(resolve => {
    let mail = [];
    imap
      .once('ready', () => {
        imap.openBox('INBOX', true, err => {
          if (err) throw err;
          imap.seq.fetch('1:20', { bodies: '' })
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
    wss.on('connection', ws => {
      ws.on('message', async message => {
        const m = JSON.parse(message);
        switch (m[0]) {
          case 'no-login':
            ws.send('false');
          	break;
          case 'credentials':
            const json = {
              user: m[1][0],
              password: m[1][1],
              host: hosts[m[1][0].split('@')[1]],
              port: 993,
              tls: true
            };
            const mail = await imapConnect(json);
            ws.send(JSON.stringify(mail !== -1 ? ['mail', mail] : ['no-login']));
          	break;
          case 'send':
            const transporter = nodemailer.createTransport({
              host: 'smtp.gmail.com', // TODO: Other smtp servers
              port: 465,
              secure: true,
              auth: {
                user: m[1][0],
                pass: m[1][1]
              }
            });
            await transporter.sendMail({
              from: `"AbleMail" <${ m[1][0] }>`,
              to: m[2][0], // TODO: Auto cc option
              subject: m[2][1],
              text: m[2][2],
              // attachments: [{ filename: 'recording.mp4' }] // TODO: Make this work: https://nodemailer.com/message/attachments/
            });

        }
      });
    });

    const server = express();

    server.get('*', (req, res) => handle(req, res));

    server.listen(port, err => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
