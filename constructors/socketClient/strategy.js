var actions = require('../../constants/actions');

function Strategy(storage) {
    var _strategy;
    var _storage = storage;

    Strategy = function Strategy() {
        return _strategy;
    };

    Strategy.prototype = this;

    _strategy = new Strategy();
    _strategy.constructor = Strategy;
    
    _strategy.get = function(type) {
        var strategies = {};

        strategies[actions.balance] = handleQueueClient;
        strategies[actions.history] = handleSoleClient;

        var selection = strategies[type];

        if (typeof selection === 'undefined') {
            throw new Error('Bad strategy type');
        }

        return selection;
    };

    function handleQueueClient(response) {
        var id = response.id;
        var msg = _storage.getMessage(id);
        var client = _storage.getClient(msg);
        var clearResponse = clearMessage(response);

        client.messageReceived(clearResponse);
        _storage.removeMessage(id);

        return client;
    }

    function handleSoleClient(response) {
        var id = response.id;
        var client = _storage.getClient(id);
        var clearResponse = clearMessage(response);

        client.messageReceived(clearResponse);

        return client;
    }

    function clearMessage(data) {
        if (data.hasOwnProperty('id')) delete data.id;
        if (data.hasOwnProperty('type')) delete data.type;

        return data;
    }

    return _strategy;
}

module.exports =  Strategy;