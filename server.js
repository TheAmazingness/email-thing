const express = require('express');
const next = require('next');
const Imap = require('imap');
const fs = require('fs');
const parser = require('mailparser').simpleParser;

const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev });
const handle = app.getRequestHandler();
const port = 3000;
const login = JSON.parse(fs.readFileSync('login.json', 'utf8'));

const imap = new Imap(login);

app
  .prepare()
  .then(() => {
    let mail = [];
    imap
      .once('ready', () => {
        imap.openBox('INBOX', true, (err, box) => {
          if (err) throw err;
          imap.seq.fetch(`1:${ box.messages.total }`, {
            bodies: ['HEADER.FIELDS (FROM TO SUBJECT DATE)', 'TEXT']
          }).on('message', (msg, seqno) => {
            msg.on('body', stream => {
              let buffer = '', count = 0;
              stream.on('data', chunk => {
                count += chunk.length;
                buffer += chunk.toString('utf8');
              });
              stream.once('end', () => {
                if (!mail[seqno - 1]) mail[seqno - 1] = [];
                parser(buffer).then(parsed => mail[seqno - 1].push(parsed));
              });
            });
          });
        });
      })
      .once('error', err => console.log(err))
      .once('end', () => console.log('Connection ended'))
      .connect();

    const server = express();

    server.get('/app', (req, res) => {
      res.send(mail);
    });

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