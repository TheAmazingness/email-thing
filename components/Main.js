import MailPreview from '../components/MailPreview';
import whitelist from '../utils/whitelist';

const Main = props => {
  let count = 0;
  let list = whitelist() ? JSON.parse(localStorage.getItem('whitelist')) : [];
  return (
    <main>
      {
        props.data.reverse().map(message => {
          if (list.includes(message.from.address) || !list.length) {
            return <MailPreview key={ `mp-${ count++ }` } message={ message } onHelp={ data => props.onHelp(data) } />
          }
        })
      }
    </main>
  );
};

export default Main;
