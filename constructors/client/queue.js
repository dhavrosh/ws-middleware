var Client = require('./base');

function QueueClient(data) {
    Client.call(this, data);

    this._messagesReceived = 0;
    this._messagesCount = data.messagesCount;
}

QueueClient.prototype = Object.create(Client.prototype);

QueueClient.prototype.messageReceived = function(data) {
    this._data.push(data);
    this._messagesReceived += 1;
};

QueueClient.prototype.isReady = function() {
    return this._messagesReceived === this._messagesCount;
};

module.exports = QueueClient;