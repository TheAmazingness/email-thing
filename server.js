const express = require('express');
const next = require('next');
const Imap = require('imap');
const inspect = require('util').inspect;
const fs = require('fs');

const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev });
const handle = app.getRequestHandler();
const port = 3000;
const login = JSON.parse(fs.readFileSync('login.json', 'utf8'));

const imap = new Imap(login);

const openInbox = cb => imap.openBox('INBOX', true, cb);

app
  .prepare()
  .then(() => {
    const server = express();

    server.get('*', (req, res) => handle(req, res));

    server.listen(port, err => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });

    imap
      .once('ready', () => {
        openInbox((err, box) => {
          if (err) throw err;
          imap.seq
            .fetch('1:3', {
              bodies: 'HEADER.FIELDS (FROM TO SUBJECT DATE)',
              struct: true
            })
            .on('message', (msg, seqno) => {
              console.log('Message #%d', seqno);
              let prefix = '(#' + seqno + ') ';
              msg
                .on('body', (stream, info) => {
                  let buffer = '';
                  stream
                    .on('data', chunk => buffer += chunk.toString('utf8'))
                    .once('end', () => console.log(prefix + 'Parsed header: %s', inspect(Imap.parseHeader(buffer))));
                })
                .once('attributes', attrs => console.log(prefix + 'Attributes: %s', inspect(attrs, false, 8)))
                .once('end', () => console.log(prefix + 'Finished'));
            })
            .once('error', err => console.log('Fetch error: ' + err))
            .once('end', () => {
              console.log('Done fetching all messages!');
              imap.end();
            });
        });
      })
      .once('error', err => console.log(err))
      .once('end', () => console.log('Connection ended'))
      .connect();
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });