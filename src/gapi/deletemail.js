// DeleteMail Component ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ DeleteMail Component//
export default class DeleteMail {
  /** constructor */
  constructor(id) {
    this.id = id;
  }
  // constructor ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

  /** delete
   * @desc Deletes the email
   */
  delete() {
    window.gapi.client.gmail.users.messages.trash({
      userId: 'me',
      id: this.id
    }).then(() => window.location.reload());
  }
}
// DeleteMail Component ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ DeleteMail Component//