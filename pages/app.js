import { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import CssBaseline from '@material-ui/core/CssBaseline';
import TopNav from '../components/TopNav';
import SideNav from '../components/SideNav';
import Main from '../components/Main';
import CustomHead from '../components/Head';
import Login from '../components/Login'
import help from '../utils/help';
import tts from '../utils/tts';
import Session from '../utils/clientSession';
import {
  ClientSocketDataSender as SocketDataSender,
  ClientSocketDataReceiver as SocketDataReceiver
} from '../utils/clientSocketData';

const App = () => {
  let first = true;
  const [load, setLoad] = useState(
    <div className="load-wrap">
     <CircularProgress className="load-app" />
    </div>
  );
  const [user, setUser] = useState();
  useEffect(() => {
    const ws = new WebSocket(`${ location.hostname === 'localhost' ? 'ws' : 'wss' }://${ location.host }`);
    const credentials = Session.fromJSON(JSON.parse(localStorage.getItem('login')));
    ws.onerror = err => console.error(err);
    ws.onopen = () => {
      if (!!credentials) {
        ws.send(SocketDataSender('credentials', credentials));
        setUser(credentials.email);
      } else {
        ws.send(SocketDataSender('no-login'));
      }
    };
    ws.onmessage = e => {
      const data = new SocketDataReceiver(e.data);
      const loginJSX = (err = false) => <Login error={ err } open={ true } onSubmit={ login => {
          if (login.email.includes('gmail')) {
            login.imap = 'imap.gmail.com';
          } else if (login.email.includes('hotmail') || login.email.includes('outlook')) {
            login.imap = 'outlook.office365.com';
          }
          ws.send(SocketDataSender('credentials', login));
          login.keep && localStorage.setItem('login', JSON.stringify(login));
          setLoad(
            <div className="load-wrap">
              <CircularProgress className="load-app"/>
            </div>
          );
        } }
      />;
      if (data.name === 'no-login') {
        setLoad(loginJSX(!first));
        first = false;
      } else {
        let messages = [];
        let smtp = '';
        if (credentials.email.includes('gmail')) {
          smtp = 'smtp.gmail.com';
        } else if (credentials.email.includes('outlook') || credentials.email.includes('hotmail')) {
          smtp = 'outlook.office365.com';
        }
        const send = data => ws.send(SocketDataSender('send', {
          credentials,
          data,
          help: help() ? localStorage.getItem('help') : '',
          smtp
        }));
        data.data.forEach(el => !!el ? messages.push({
          from: el.from.value[0],
          subject: el.subject,
          body: !!el.html ? el.html : el.textAsHtml,
          date: el.date
        }) : null);
        setLoad(
          <>
            <TopNav onLogout={ () => { localStorage.removeItem('login'); setLoad(loginJSX()); } } />
            <SideNav
              onSend={ data => send(data) }
              readHeaders={ () =>
                messages.forEach((el, i) =>
                  tts(`Email ${ i }, from ${ el.from.name }, ${ el.subject }`)
                )
              }
            />
            <Main
              data={ messages }
              onHelp={ data => ws.send(SocketDataSender('help', {
                credentials,
                data,
                help: localStorage.getItem('help'),
                smtp
              })) }
              onSend={ data => send(data) }
            />
          </>
        );
      }
    };
  }, []);
  return (
    <div className="app">
      <CssBaseline />
      <CustomHead>{ user }</CustomHead>
      { load }
    </div>
  );
};

export default App;