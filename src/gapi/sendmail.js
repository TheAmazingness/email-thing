// SendMail Component ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ SendMail Component//
export default class SendMail {
  /** constructor */
  constructor(message, recipient) {
    this.message = message;
    this.recipient = recipient;
  }
  // constructor ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

  /** send
   * @desc Sends the email
   */
  send() {
    window.gapi.client.gmail.users.getProfile({ userId: 'me' }).then((response) => {
      let profile = JSON.parse(response.body);
      this.email = `Content-Type: text/plain\r\nFrom: ${ profile.emailAddress }\r\nTo: ${ this.recipient }\r\nSubject: Email from ${ profile.emailAddress }\r\nReply-To: ${ profile.emailAddress }\r\n\r\n${ this.message }\n\nSent with AbleMail.`;
      window.gapi.client.gmail.users.messages.send({
        userId: 'me',
        resource: {
          raw: btoa(this.email).replace(/\+/g, '-').replace(/\//g, '_')
        }
      }).then(() => setTimeout(() => window.location.reload(), 500));
    });
  }
}
// SendMail Component ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ SendMail Component//