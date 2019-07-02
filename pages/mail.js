import Main from '../components/Main';
import dynamic from 'next/dynamic';

const Test = dynamic(() => {
  let ws = new window.WebSocket('ws://localhost:8081');
  ws.onopen = function (event) {
    console.log('Connection is open ...');
  };
  ws.onerror = function (err) {
    console.log('err: ', err);
  };
  ws.onmessage = function (event) {
    console.log(event.data);
    document.body.innerHTML += event.data + '&lt;br&gt;';
  };
  ws.onclose = function() {
    console.log("Connection is closed...");
  }
}, { ssr: false });

const Mail = () => {
  return (
    <Test />
  );
};

export default Mail;