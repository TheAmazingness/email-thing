// Imports ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Imports //
// React ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
import React from 'react';
// React ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

// Material UI ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
// Material UI ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

// Other ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
import Mailbox from './Mailbox';
import SideNav from './SideNav';
import TopNav from './TopNav'
// Other ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// Imports ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Imports //

// Constants ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Constants //
const
  API_KEY = '<API_KEY>',
  CLIENT_ID = '<CLIENT_ID>',
  DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest'],
  SCOPES = 'https://www.googleapis.com/auth/gmail.modify',
  style = {
    loading: {
      height: '100vh',
      lineHeight: '100vh',
      textAlign: 'center',
      width: '100vw'
    }
  };
// Constants ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Constants //

// App Component ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ App Component//
class App extends React.Component {
  /** constructor */
  constructor(props) {
    super(props);
    this.state = {
      jsx: (
        <div className={ this.props.classes.loading }>
          <CircularProgress color='secondary' />
        </div>
      )
    };
  }
  // constructor ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

  /** componentDidMount */
  componentDidMount() {
    try {
      document.addEventListener('DOMContentLoaded', () => {
        window.gapi.load('client:auth2', () => {
          this.gapiInit();
        });
      }, false);
    } catch (e) {
      console.error(e);
      alert('Something went wrong. Try refreshing the page?');
    }
  }
  // componentDidMount ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

  /** gapiInit
   * @description Initializes Gmail API
   */
  gapiInit() {
    window.gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES
    }).then(() => {
      if (window.gapi.auth2.getAuthInstance().isSignedIn.get()) {
        // this.gapiGetMessages();
        this.setState({
          jsx: (
            <div>
              <TopNav status={ true } />
              <SideNav />
              <Mailbox />
            </div>
          )
        });
      } else {
        this.setState({
          jsx: (
            <div>
              <TopNav status={ false } />
            </div>
          )
        });
      }
      // this.props.isLogin(window.gapi.auth2.getAuthInstance().isSignedIn.get());
      // window.gapi.client.gmail.users.getProfile({ userId: 'me' }).then((response) => {
      //   this.props.getEmail(JSON.parse(response.body));
      // });
      // try { document.getElementById('btn-login').onclick = Mailbox.login; } catch (e) {}
      // try { document.getElementById('btn-logout').onclick = Mailbox.logout; } catch (e) {}
    });
  }
  // gapiInit ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//


  /** gapiGetMessages
   * @description Fetches all emails from inbox of current account
   */
  gapiGetMessages() {
    window.gapi.client.gmail.users.messages.list({
      userId: 'me',
      labelIds: ['INBOX']
    }).then((response) => {
      let { messages } = response.result;
      this.setState({
        jsx: (
          <div>
            <TopNav status='Sign Out' />
            <SideNav />
            <Mailbox />
          </div>
        )
      });
    });
  }
  // gapiGetMessages ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

  /** render */
  render() {
    return (
      <div>
        <CssBaseline />
        { this.state.jsx }
      </div>
    );
  }
  // render ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
}
// App Component ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ App Component//

// Export ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Export //
export default withStyles(style)(App);
// Export ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Export //