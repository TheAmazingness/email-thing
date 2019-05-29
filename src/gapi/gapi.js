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
  authenticate() {
    if (this.status) {
      window.gapi.auth2.getAuthInstance().signOut();
      window.location.reload();
    } else {
      window.gapi.auth2.getAuthInstance().signIn();
    }
  }

  /** connect
   * @desc tries to establish connection with Google APIs
   */
  connect() {
    try {
      this.data = new Promise(resolve => {
        document.addEventListener('DOMContentLoaded', () => {
          window.gapi.load('client:auth2', () => {
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
   */
  getMessages() {
    return new Promise(resolve => {
      if (!this.status) {
        resolve({ status: this.status, messages: null });
      } else {
        window.gapi.client.gmail.users.messages.list({
          userId: 'me',
          labelIds: ['INBOX']
        }).then(response => {
          let { messages } = response.result || {};
          resolve({ status: this.status, messages: messages });
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
      window.gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
      }).then(() => {
        this.status = window.gapi.auth2.getAuthInstance().isSignedIn.get();
        resolve(this.getMessages(this.status));
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
