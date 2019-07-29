import MailPreview from '../components/MailPreview';

const Main = props => {
  let count = 0;
  return (
    <main>
      {
        props.data.map(message =>
          <MailPreview key={ `mp-${ count++ }` } message={ message } onHelp={ data => props.onHelp(data) } />
        )
      }
    </main>
  );
};

export default Main;