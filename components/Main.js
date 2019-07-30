import MailPreview from '../components/MailPreview';
import whitelist from '../utils/whitelist';

const Main = props => {
  let count = 0;
  return (
    <main>
      {
        props.data.map(message => (whitelist() && localStorage.getItem('whitelist').includes(message.from.address))
          && <MailPreview key={ `mp-${ count++ }` } message={ message } onHelp={ data => props.onHelp(data) }/>
        )
      }
    </main>
  );
};

export default Main;