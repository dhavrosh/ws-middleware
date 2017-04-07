var Storage = require('./storage');
var Strategy = require('./strategy');
var sendJSON = require('../../utils').sendJSON;

function SocketClient(clientsStore, messagesStore) {
    var _ws;
    var _socketClient;

    SocketClient = function SocketClient() {
        return _socketClient;
    };

    SocketClient.prototype = this;

    _socketClient = new SocketClient();
    _socketClient.constructor = SocketClient;
    _socketClient.storage = new Storage(clientsStore, messagesStore);
    _socketClient.strategy = new Strategy(_socketClient.storage);

    _socketClient.initializeWS = function (ws) {
        _ws = ws;
    };

    _socketClient.sendMessage = function sendMessage(data) {
        if (_ws.readyState === 1) {
            _ws.send(data);
        } else throw new Error('WS connection is not open');
    };

    _socketClient.addMessageHandler = function messageHandler(done) {
        if (typeof _ws._events.message === 'undefined') {
            var that = this;

            _ws.on('message', function(message) {
                var client;

                try {
                    var response = JSON.parse(message);
                    if (response.hasOwnProperty('id')) {
                        var handleMessage = that.strategy.get(response.type);

                        client = handleMessage.call(that, response);
                    } else console.log('Received SAP-message', message);
                } catch (err) {
                    console.log(err.message);
                    // sendJSON(res, 500, err.message);
                } finally {
                    if (client && client.isReady()) {
                        var res = client.getResponse();
                        var data = client.getData();
                        var id = client.getId();

                        sendJSON(res, 200, data);
                        that.storage.removeClient(id);
                    }
                }
            });
            done();
        } else done(new Error('WS message handler already exists'));
    };

    return _socketClient;
}

module.exports = SocketClient;