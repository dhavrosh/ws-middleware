var WebSocket = require('ws');

function Connection(serverUrl, socketClient) {
    var _connection;

    Connection = function Connection() {
        return _connection;
    };

    Connection.prototype = this;

    _connection = new Connection();
    _connection.constructor = Connection;

    _connection.serverUrl = serverUrl;
    _connection.socketClient = socketClient;

    _connection.initialize = function () {
        var that = this;

        this.ws = new WebSocket(_connection.serverUrl);

        this.ws.on('open', function open() {
            console.log('socketClient: OPEN');
        });

        this.ws.on('error', function error(data) {
            console.log('socketClient: ERROR', data);
        });

        this.ws.on('close', function close(data) {
            console.log('socketClient: CLOSE');

            // TODO: check error status
            that.socketClient.initializeWS(_connection.initialize());
            that.socketClient.addMessageHandler(function(){});
        });

        return this.ws;
    };

    return _connection;
}

module.exports = Connection;