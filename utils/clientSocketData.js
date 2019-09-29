export default class ClientSocketData {
  constructor(name, data = null) {
    this._name = name;
    this._data = data;
  }

  toString = () => JSON.stringify({ name: this._name, data: this._data });

  get name() { return this._name; }

  get data() { return this._data; }
}