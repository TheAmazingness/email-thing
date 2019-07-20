import { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import CssBaseline from '@material-ui/core/CssBaseline';
import TopNav from '../components/TopNav';
import SideNav from '../components/SideNav';
import Main from '../components/Main';
import CustomHead from '../components/Head';
import Login from '../components/Login'

const App = () => {
  const [load, setLoad] = useState(
    <div className="load-wrap">
     <CircularProgress className="load-app" />
    </div>
  );
  let open = false;
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8081');
    const credentials = JSON.parse(localStorage.getItem('login'));
    ws.onerror = err => console.error(err);
    ws.onopen = () => {
      open = true;
      ws.send(JSON.stringify(!!credentials ? ['credentials', credentials] : ['no-login']));
    };
    ws.onmessage = e => {
      const data = JSON.parse(e.data);
      if (data[0] === 'no-login') {
        setLoad(
          <Login open={ true } onSubmit={ login => {
            ws.send(JSON.stringify(['credentials', login]));
            localStorage.setItem('login', JSON.stringify(login));
            setLoad(
              <div className="load-wrap">
                <CircularProgress className="load-app" />
              </div>
            );
          } } />
        );
      } else {
        let messages = [];
        data[1].forEach((el, index) => !!el ? messages[index] = {
          from: el.from.value[0],
          subject: el.subject,
          body: el.html
        } : null);
        setLoad(
          <>
            <TopNav onLogout={ () => {
              localStorage.removeItem('login');
              setLoad(
                <Login open={ true } onSubmit={ login => {
                  ws.send(JSON.stringify(['credentials', login]));
                  localStorage.setItem('login', JSON.stringify(login));
                  setLoad(
                    <div className="load-wrap">
                      <CircularProgress className="load-app" />
                    </div>
                  );
                } } />
              );
            } } />
            <SideNav onSend={ data => open && ws.send(JSON.stringify(['send', credentials, data])) } />
            <Main data={ messages } />
          </>
        );
      }
    };
  }, []);
  return (
    <div className="app">
      <CssBaseline />
      <CustomHead />
      { load }
    </div>
  );
};

export default App;