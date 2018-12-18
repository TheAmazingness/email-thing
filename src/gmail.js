const CLIENT_ID = '';
const API_KEY = '';
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"];
const SCOPES = 'https://www.googleapis.com/auth/gmail.modify';

export function load() {
  window.gapi.load('client:auth2', init);
}

function init() {
  window.gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  }).then(function () {
    if (window.gapi.auth2.getAuthInstance().isSignedIn.get()) {
      getMessages();
    }
    document.getElementById('btn-login').onclick = login;
    // document.getElementById('').onclick = logout;
  }, (error) => {});
}

function login() {
  window.gapi.auth2.getAuthInstance().signIn();
}

function logout() {
  window.gapi.auth2.getAuthInstance().signOut();
}

function getMessages() {
  window.gapi.client.gmail.users.messages.list({
    userId: 'me'
  }).then(function(response) {
    let { messages, nextPageToken, resultSizeEstimate } = response.result;
    let fullMessage = [];
    messages.forEach((m, i) => {
      window.gapi.client.gmail.users.messages.get({
        userId: 'me',
        id: m.id,
      }).then((res) => {
        fullMessage.push(res);
        if (i + 1 === messages.length) {
          return fullMessage;
        }
      });
    });
  });
}