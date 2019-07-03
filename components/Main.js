import CircularProgress from '@material-ui/core/CircularProgress';
import { useEffect } from 'react';


const Main = () => {
  let [mail, setMail] = useState(<CircularProgress />);
  useEffect(() => {
    let ws = new WebSocket('ws://localhost:8081');
    ws.onopen = () => console.log('Connection open ...');
    ws.onerror = err => console.error(err);
    ws.onclose = () => console.log('Connection closed...');
    ws.onmessage = event => {
      let data = JSON.parse(event.data);
      console.log(data);
    };
  });

  return (
    <main>
      { mail }
    </main>
  );
};

export default Main;