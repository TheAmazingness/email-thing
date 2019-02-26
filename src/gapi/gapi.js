// Imports ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Imports //
// Other ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
import credentials from './../credentials';
// Other ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// Imports ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Imports //

// Constants ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Constants //
const
  API_KEY = credentials.localhost.API_KEY,
  CLIENT_ID = credentials.localhost.CLIENT_ID,
  DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest'],
  SCOPES = 'https://www.googleapis.com/auth/gmail.modify';
// Constants ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Constants //

// Gapi ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Gapi //
export default class Gapi {
  /** constructor */
  constructor() {
    this.gapi = window.gapi;
  }
  // constructor ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

  /** connect
   * @desc tries to establish connection with Google APIs
   */
  connect() {
    try {
      this.data = new Promise(resolve => {
        document.addEventListener('DOMContentLoaded', () => {
          this.gapi.load('client:auth2', () => {
            resolve(this.init());
          });
        }, false);
      });
    } catch (e) {
      console.error(e);
      window.location.reload();
    }
  }
  // connect ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

  /** getMessages
   * @desc Fetches all emails from inbox of current account
   * @param status
   */
  getMessages(status) {
    return new Promise(resolve => {
      if (!status) {
        resolve({ status: status, messages: null });
      } else {
        this.gapi.client.gmail.users.messages.list({
          userId: 'me',
          labelIds: ['INBOX']
        }).then(response => {
          let { messages } = response.result;
          resolve({ status: status, messages: messages });
        });
      }
    });
  }
  // getMessages ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

  /** init
   * @desc Initializes Google API
   */
  init() {
    return new Promise(resolve => {
      this.gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
      }).then(() => {
        resolve(this.getMessages(this.gapi.auth2.getAuthInstance().isSignedIn.get()));
        // TODO: sign in and sign out
        // this.props.isLogin(window.gapi.auth2.getAuthInstance().isSignedIn.get());
        // window.gapi.client.gmail.users.getProfile({ userId: 'me' }).then(response => {
        //   this.props.getEmail(JSON.parse(response.body));
        // });
        // try { document.getElementById('btn-login').onclick = Mailbox.login; } catch (e) {}
        // try { document.getElementById('btn-logout').onclick = Mailbox.logout; } catch (e) {}
      });
    });
  }
  // init ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

  /** get getData
   * @desc returns logged in status and message data
   */
  get getData() {
    return this.data;
  }
  // getData ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
}
// Gapi ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Gapi //
