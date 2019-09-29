export default class ClientSession {
  constructor(email, pass, keep) {
    this._email = email;
    this._pass = pass;
    this._keep = keep;
  }

  static fromJSON = obj =>
    new Session(obj.email, obj.pass, obj.keep)
    || throw new Error('Cannot read property email, pass, or keep of JSON');

  get email() { return this._email; }

  get pass() { return this._pass; }

  get keep() { return this._keep; }
}
