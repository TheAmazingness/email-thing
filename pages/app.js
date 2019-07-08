import { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import CssBaseline from '@material-ui/core/CssBaseline';
import TopNav from '../components/TopNav';
import SideNav from '../components/SideNav';
import Main from '../components/Main';
import CustomHead from '../utils/head';

const App = () => {
  const [load, setLoad] = useState(
    <div className="load-wrap">
     <CircularProgress className="load-app"/>
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
          <>
            Log in :(
          </>
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