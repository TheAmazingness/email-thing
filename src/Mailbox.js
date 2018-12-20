import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import MailPreview from './MailPreview';


const CLIENT_ID = '<CLIENT_ID>';
const API_KEY = '<API_KEY>';
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"];
const SCOPES = 'https://www.googleapis.com/auth/gmail.modify';

export default class Mailbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mail: <CircularProgress color='secondary' />
    };
  }
  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      this.init();
    });
  }

  init() {
    window.gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES
    }).then(() => {
      if (window.gapi.auth2.getAuthInstance().isSignedIn.get()) {
        this.getMessages();
      }
      // document.getElementById('btn-login').onclick = Mail.login;
      // document.getElementById('').onclick = Mail.logout;
    });
  }

  static login() {
    window.gapi.auth2.getAuthInstance().signIn();
  }

  static logout() {
    window.gapi.auth2.getAuthInstance().signOut();
  }

  getMessages() {
    window.gapi.client.gmail.users.messages.list({
      userId: 'me'
    }).then((response) => {
      let { messages, nextPageToken, resultSizeEstimate } = response.result;
      let fullMessage = [];
      messages.forEach((m, i) => {
        window.gapi.client.gmail.users.messages.get({
          userId: 'me',
          id: m.id
        }).then((res) => {
          fullMessage.push(res);
          if (i + 1 === messages.length) {
            this.setState({
              mail: fullMessage.map((el, i) =>
                <div key={ `preview-${ i }` }>
                  <MailPreview headers={ el.result.payload.headers } snippet={ el.result.snippet } />
                  <br />
                  <br />
                </div>
              )
            });
          }
        });
      });
    });
  }

  render() {
    return (
      <div>
        { this.state.mail }
      </div>
    );
  }
}