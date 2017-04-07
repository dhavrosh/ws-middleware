function Client(obj) {
    this._id = obj.id;
    this._data = obj.data;
    this._response = obj.response;
}

Client.prototype.messageReceived = function() {
    throw new Error('messageReceived should be implemented');
};

Client.prototype.isReady = function() {
    throw new Error('isReady should be implemented');
};

Client.prototype.getData = function() {
    return this._data;
};

Client.prototype.getResponse = function() {
    return this._response;
};

Client.prototype.getId = function() {
    return this._id;
};

module.exports = Client;