const express = require('express');
const next = require('next');
const Imap = require('imap');
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
      .once('error', () => resolve([]))
      .once('end', () => resolve(mail))
      .connect();
  });
};

app
  .prepare()
  .then(async () => {
    wss.on('connection', ws => {
      ws.on('message', async message => {
        if (message === 'no-login') {
          ws.send('false');
        } else {
          let login = JSON.parse(message);
          let mail;
          let json = {
            user: login[0],
            password: login[1],
            host: hosts[login[0].split('@')[1]],
            port: 993,
            tls: true
          };
          mail = await imapConnect(json);
          ws.send(mail.length ? JSON.stringify(mail) : 'false');
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
