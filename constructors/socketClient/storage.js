var Client = require('../client');
var actions = require('../../constants/actions');

function Storage(clientsStore, messagesStore) {
    var _storage;
    var _clientsStore = clientsStore;
    var _messagesStore = messagesStore;

    Storage = function Storage() {
        return _storage;
    };

    Storage.prototype = this;

    _storage = new Storage();
    _storage.constructor = Storage;

    _storage.addClient = function(type, data) {
        if (data && !_clientsStore.has(data.id)) {
            var Client = getClientConstructor(type);
            _clientsStore.set(data.id, new Client(data));
        } else throw new Error('Client already exists');
    };

    _storage.removeClient = function(id) {
        if (id && _clientsStore.has(id)) {
            _clientsStore.del(id);
        } else throw new Error('Client can not be removed');
    };

    _storage.getClient = function(id) {
        if (id && _clientsStore.has(id)) {
            return _clientsStore.get(id);
        } else throw new Error('Client not found')
    };

    _storage.addMessages = function(clientId, messageIds) {
        messageIds.forEach(function(id) {
            if (!_messagesStore.get(id)) {
                _messagesStore.set(id, clientId);
            } else throw new Error('Message already exists');
        });
    };

    _storage.getMessage = function(id) {
        if (id && _messagesStore.get(id)) {
            return _messagesStore.get(id);
        } else throw new Error('Message not found')
    };

    _storage.removeMessage = function(id) {
        if (id && _messagesStore.get(id)) {
            _messagesStore.del(id);
        } else throw new Error('Message can not be removed');
    };

    function getClientConstructor(type) {
        var clients = {};

        clients[actions.balance] = Client.queue;
        clients[actions.history] = Client.sole;

        var selection = clients[type];

        if (typeof selection === 'undefined') {
            throw new Error('Bad client type');
        }

        return selection;
    }

    return _storage;
}

module.exports =  Storage;