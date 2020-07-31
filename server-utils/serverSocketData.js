class ServerSocketDataReceiver {
  constructor(data) {
    data = JSON.parse(data);
    this._name = data.name;
    this._data = data.data || null;
  }

  get name() { return this._name; }

  get data() { return this._data; }
}

const ServerSocketDataSender = (name, data = null) =>
  JSON.stringify({ name, data });

module.exports = { ServerSocketDataReceiver, ServerSocketDataSender };