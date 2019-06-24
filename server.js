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

imap
  .once('ready', () => {
    imap.openBox('INBOX', true, (err, box) => {
      if (err) throw err;
      imap.seq.fetch(`1:${ box.messages.total }`, {
        bodies: ['HEADER.FIELDS (FROM TO SUBJECT DATE)', 'TEXT']
      }).on('message', (msg, seqno) => {
        let prefix = `(#${ seqno })`;
        console.log(`Message #${ seqno }`);
        msg.on('body', function(stream, info) {
          if (info.which === 'TEXT')
            console.log(prefix + 'Body [%s] found, %d total bytes', inspect(info.which), info.size);
          var buffer = '', count = 0;
          stream.on('data', function(chunk) {
            count += chunk.length;
            buffer += chunk.toString('utf8');
            if (info.which === 'TEXT')
              console.log(prefix + 'Body [%s] (%d/%d)', inspect(info.which), count, info.size);
          });
          stream.once('end', function() {
            if (info.which !== 'TEXT')
              console.log(prefix + 'Parsed header: %s', inspect(Imap.parseHeader(buffer)));
            else
              console.log(prefix + 'Body [%s] Finished', inspect(info.which));
          });
        });
      });
    });
  })
  .once('error', err => console.log(err))
  .once('end', () => console.log('Connection ended'))
  .connect();

// app
//   .prepare()
//   .then(() => {
//     imap
//       .once('ready', () => {
//         imap.openBox('INBOX', true, (err, box) => {
//           if (err) throw err;
//           imap.seq
//             .fetch('1:3', {
//               bodies: 'HEADER.FIELDS (FROM TO SUBJECT DATE)',
//               struct: true
//             })
//             .on('message', (msg, seqno) => {
//               console.log('Message #%d', seqno);
//               let prefix = '(#' + seqno + ') ';
//               msg
//                 .on('body', (stream, info) => {
//                   let buffer = '';
//                   stream
//                     .on('data', chunk => buffer += chunk.toString('utf8'))
//                     .once('end', () => console.log(prefix + 'Parsed header: %s', inspect(Imap.parseHeader(buffer))));
//                 })
//                 .once('attributes', attrs => console.log(prefix + 'Attributes: %s', inspect(attrs, false, 8)))
//                 .once('end', () => console.log(prefix + 'Finished'));
//             })
//             .once('error', err => console.log('Fetch error: ' + err))
//             .once('end', () => {
//               console.log('Done fetching all messages!');
//               imap.end();
//             });
//         });
//       })
//       .once('error', err => console.log(err))
//       .once('end', () => console.log('Connection ended'))
//       .connect();
//
//     const server = express();
//
//     server.get('/app', (req, res) => {
//       res.send();
//     });
//
//     server.get('*', (req, res) => handle(req, res));
//
//     server.listen(port, err => {
//       if (err) throw err;
//       console.log('> Ready on http://localhost:3000');
//     });
//   })
//   .catch(ex => {
//     console.error(ex.stack);
//     process.exit(1);
//   });