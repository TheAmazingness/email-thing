export class ClientSocketDataReceiver {
  constructor(data) {
    data = JSON.parse(data);
    this._name = data.name;
    this._data = data.data || null;
  }

  get name() { return this._name; }

  get data() { return this._data; }
}

export const ClientSocketDataSender = (name, data = null) =>
  JSON.stringify({ name, data });