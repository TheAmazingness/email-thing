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
    const credentials = JSON.parse(localStorage.getItem('login'));
    ws.onerror = err => console.error(err);
    ws.onopen = () => {
      if (!!credentials) {
        ws.send(JSON.stringify( ['credentials', credentials]));
        setUser(credentials[0]);
      } else {
        ws.send(JSON.stringify( ['no-login']));
      }
    };
    ws.onmessage = e => {
      const data = JSON.parse(e.data);
      const loginJSX = (err = false) => <Login error={ err } open={ true } onSubmit={ login => {
        if (login[0].includes('gmail')) {
          login.push('imap.gmail.com');
        } else if (login[0].includes('hotmail') || login[0].includes('outlook')) {
          login.push('outlook.office365.com');
        }
        ws.send(JSON.stringify(['credentials', login]));
        login[2] && localStorage.setItem('login', JSON.stringify(login));
        setLoad(
          <div className="load-wrap">
            <CircularProgress className="load-app"/>
          </div>
        );
      } }
      />;
      if (data[0] === 'no-login') {
        setLoad(loginJSX(!first));
        first = false;
      } else {
        let messages = [];
        let smtp = '';
        if (credentials[0].includes('gmail')) {
          smtp = 'smtp.gmail.com';
        } else if (credentials[0].includes('outlook') || credentials[0].includes('hotmail')) {
          smtp = 'outlook.office365.com';
        }
        const send = data => ws.send(JSON.stringify([
          'send',
          credentials,
          data,
          help() ? localStorage.getItem('help') : '',
          smtp
        ]));
        data[1].forEach((el, i) => !!el ? messages[i] = {
          from: el.from.value[0],
          subject: el.subject,
          body: !!el.html ? el.html : el.textAsHtml,
          date: el.date
        } : null);
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
              onHelp={ data => ws.send(JSON.stringify([
                'help',
                credentials,
                data,
                localStorage.getItem('help'),
                smtp
              ])) }
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