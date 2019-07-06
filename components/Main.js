import CircularProgress from '@material-ui/core/CircularProgress';
import { useState, useEffect } from 'react';


const Main = () => {
  let [main, setMain] = useState(<CircularProgress color="secondary" className="main-load" />);
  useEffect(() => {
    let messages = {};
    let ws = new WebSocket('ws://localhost:8081');
    ws.onerror = err => console.error(err);
    ws.onmessage = e => {
      let data = JSON.parse(e.data);
      data.forEach((el, index) => messages[index] = {
        from: el.from.value[0],
        subject: el.subject,
        body: el.html
      });
      console.log(messages);
      setMain(3);
      ws.send('close');
    };
  });

  return (
    <main>
      { main }
    </main>
  );
};

export default Main;