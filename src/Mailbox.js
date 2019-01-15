import React from 'react';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import MailPreview from './MailPreview';
import RefreshIcon from '@material-ui/icons/Refresh';
import Typography from '@material-ui/core/Typography';
import { speak } from './Voice';

const CLIENT_ID = '<CLIENT_ID>';
const API_KEY = '<API_KEY>';
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest'];
const SCOPES = 'https://www.googleapis.com/auth/gmail.modify';

export default class Mailbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mail: <CircularProgress color='secondary' />
    };
    this.emailCount = 0;
    this.compiled = '';
    setTimeout(() => this.setState({
      mail: (
        <div>
          <CircularProgress color='secondary' />
          <br />
          <br />
          <br />
          <br />
          <br />
          <Button color='secondary' variant='contained'>
            <RefreshIcon style={ { fontSize: JSON.parse(window.localStorage.getItem('icon')) ? '60pt': '40pt' } } />&emsp;
            Reload
          </Button>
        </div>
      )
    }), 5000);
  }
  componentDidMount() {
    try {
      window.gapi.load('client:auth2', () => {
        this.init();
      });
    } catch (e) {
      console.error(e);
      alert('Something went wrong. Try refreshing the page?');
      this.setState({ mail: <Typography variant='h2' onClick={ () => speak('Unable to fetch emails') }>Unable to fetch emails.</Typography> });
    }
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
      this.props.isLogin(window.gapi.auth2.getAuthInstance().isSignedIn.get());
      window.gapi.client.gmail.users.getProfile({ userId: 'me' }).then((response) => {
        this.props.getEmail(JSON.parse(response.body));
      });
      try { document.getElementById('btn-login').onclick = Mailbox.login; } catch (e) {}
      try { document.getElementById('btn-logout').onclick = Mailbox.logout; } catch (e) {}
    });
  }

  static login() {
    window.gapi.auth2.getAuthInstance().signIn();
  }

  static logout() {
    window.gapi.auth2.getAuthInstance().signOut();
  }

  static trash(id) {
    window.gapi.client.gmail.users.messages.trash({
      userId: 'me',
      id: id
    }).then(() => window.location.reload());
  }

  getMessages() {
    window.gapi.client.gmail.users.messages.list({
      userId: 'me',
      labelIds: ['INBOX']
    }).then((response) => {
      let { messages } = response.result;
      let fullMessage = [];
      messages.forEach((m, i) => {
        window.gapi.client.gmail.users.messages.get({
          userId: 'me',
          id: m.id
        }).then((res) => {
          fullMessage.push(res.result);
          if (i + 1 === messages.length) {
            if (fullMessage.length !== messages.length) {
              window.location.reload();
            }
            fullMessage.sort((a, b) => b.internalDate - a.internalDate);
            this.setState({
              mail: fullMessage.map((el, i) =>
                <div key={ `preview-${ i }` }>
                  <MailPreview snippet={ el.snippet } payload={ el.payload } trash={ () => Mailbox.trash(messages[i].id) } mailData={ (data) => this.compile(data) } />
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

  compile(data) {
    this.emailCount++;
    this.compiled += `Email number ${ this.emailCount }: ${ data } `;
    this.props.mailData(this.compiled);
  }

  render() {
    return (
      <div>
        { this.state.mail }
      </div>
    );
  }
}
