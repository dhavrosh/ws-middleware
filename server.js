'use strict';

var http = require('http');
var app = require('./app');
var config = require('./config');
var httpServer = http.createServer(app);

httpServer.listen(config.port, function () {
    var socketClient = require('./services/socketClient'); // connect to ws-server

    socketClient.addMessageHandler(function(err) {
        if (err) console.log(err.message);
    });
});
