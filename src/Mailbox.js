// Imports ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Imports //
// React ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
import React from 'react';
// React ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

// Material UI ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
import CircularProgress from '@material-ui/core/CircularProgress';
// Material UI ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

// Other ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
import MailPreview from './MailPreview';
import TTS from './features/tts';
// Other ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// Imports ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Imports //

// Mailbox Component ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Mailbox Component//
export default class Mailbox extends React.Component {
  /** constructor */
  constructor(props) {
    super(props);
    this.state = {
      jsx: (
        <div onClick={ () => new TTS('Loading').speak() }>
          <CircularProgress color='secondary' />
        </div>
      )
    };
  }
  // constructor ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

  /** componentDidMount */
  componentDidMount() {
    let
      results = [],
      index = 0;
    document.addEventListener('read', () => {
      let email = '';
      results.forEach(e => {
        email += `
          Email number ${ e[0] + 1 }
          From ${ e[1].payload.headers.filter(f => f.name === 'From')[0].value.split('<')[0] }.
          ${ e[1].payload.headers.filter(e => e.name === 'Subject')[0].value }.
        `;
      });
      new TTS(
        `
          You have ${ results.length } email${ results.length === 1 ? '' : 's' }.
          ${ email }
        `
      ).speak();
    });
    this.props.messages.forEach((message, i) => {
      window.gapi.client.gmail.users.messages.get({
        userId: 'me',
        id: message.id
      }).then(m => {
        results.push([i, m.result]);
        index++;
        if (index === this.props.messages.length) {
          results.sort((a, b) => parseInt(a[0]) - parseInt(b[0]));
          this.setState({
            jsx: results.map((e, i) =>
              <div key={ `preview-${ i }` }>
                <MailPreview id={ message.id } result={ e[1] } />
                <br />
                <br />
              </div>
            )
          });
        }
      });
    });
  }
  // componentDidMount ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

  /** render */
  render() {
    return (
      <div>
        { this.state.jsx }
      </div>
    );
  }
  // render ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
}
// Mailbox Component ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Mailbox Component//