var Client = require('./base');

function SoleClient(data) {
    Client.call(this, data);
}

SoleClient.prototype = Object.create(Client.prototype);

SoleClient.prototype.messageReceived = function(data) {
    this._data = data;
};

SoleClient.prototype.isReady = function() {
    return this._data !== null;
};

module.exports = SoleClient;