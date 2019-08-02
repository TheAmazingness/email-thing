import MailPreview from '../components/MailPreview';
import whitelist from '../utils/whitelist';

const Main = props => {
  let count = 0;
  let list = whitelist() ? localStorage.getItem('whitelist') : [];
  return (
    <main>
      {
        props.data.map(message => {
          if (list.includes(props.data.from.address) || !list.length) {
            return <MailPreview key={ `mp-${ count++ }` } message={ message } onHelp={ data => props.onHelp(data) }/>
          }
        })
      }
    </main>
  );
};

export default Main;