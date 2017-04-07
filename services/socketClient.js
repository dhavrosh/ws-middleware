var NodeCache = require('node-cache');
var config = require('../config');
var Connection = require('../constructors/connection');
var ObjectStore = require('../constructors/objectStore');
var SocketClient = require('../constructors/socketClient');

var time = 60000;
var sapURL = config.serverUrl;
var storageOptions = { stdTTL: time, checkperiod: time };
var messagesStore = new NodeCache(storageOptions);
var clientsStore = new ObjectStore(storageOptions); // Object(null);
var socketClient = new SocketClient(clientsStore, messagesStore);
var connection = new Connection(sapURL, socketClient);
var ws = connection.initialize();

clientsStore.startClearing();
socketClient.initializeWS(ws);

module.exports = socketClient;

