import { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import CssBaseline from '@material-ui/core/CssBaseline';
import TopNav from '../components/TopNav';
import SideNav from '../components/SideNav';
import Main from '../components/Main';
import CustomHead from '../utils/head';
import Login from '../components/Login'

const App = () => {
  const [load, setLoad] = useState(
    <div className="load-wrap">
     <CircularProgress className="load-app" />
    </div>
  );
  useEffect(() => {
    let messages = {};
    let ws = new WebSocket('ws://localhost:8081');
    ws.onerror = err => console.error(err);
    ws.onmessage = e => {
      let data = JSON.parse(e.data);
      if (!data) {
        setLoad(
          <Login open={ true } onSubmit={ login => {
            ws.send(JSON.stringify(login));
            setLoad(
              <div className="load-wrap">
                <CircularProgress className="load-app" />
              </div>
            );
          } } />
        );
      } else {
        data.forEach((el, index) => messages[index] = {
          from: el.from.value[0],
          subject: el.subject,
          body: el.html
        });
        console.log(messages);
        setLoad(
          <>
            <TopNav />
            <SideNav />
            <Main />
          </>
        );
      }
      ws.send('close');
    };
  });
  return (
    <div className="app">
      <CssBaseline />
      <CustomHead />
      { load }
    </div>
  );
};

export default App;