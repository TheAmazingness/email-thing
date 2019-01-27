// Constants ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Constants //
const
  API_KEY = 'AIzaSyC6XSycYjfMuCRciYRlLchAu8W2OEpc594',
  CLIENT_ID = '98686281361-ncc9pmofugrtfk6a22nl23sokfeqj22p.apps.googleusercontent.com',
  DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest'],
  SCOPES = 'https://www.googleapis.com/auth/gmail.modify';
// Constants ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Constants //

// Gapi Component ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Gapi Component//
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
      alert('Something went wrong. Try refreshing the page?');
    }
  }
  // connect ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

  /** getMessages
   * @desc Fetches all emails from inbox of current account
   */
  getMessages(status) {
    return new Promise(resolve => {
      if (!status) {
        resolve({ status: status, data: null });
      } else {
        window.gapi.client.gmail.users.messages.list({
          userId: 'me',
          labelIds: ['INBOX']
        }).then(response => {
          let
            { messages } = response.result,
            index = 0;
          resolve({ status: status, data: messages });
          // messages.forEach(message => {
          //
          // });
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
// Gapi Component ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Gapi Component//