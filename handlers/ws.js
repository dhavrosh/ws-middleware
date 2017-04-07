var uuid = require('uuid');
var actions = require('../constants/actions');
var sendJSON = require('../utils').sendJSON;
var socketClient = require('../services/socketClient');
var helper = require('../helpers/message');

function isValidRequest(req) {
    // TODO: check here req.body

    return true;
}

function sendMessageRequest(data) {
    socketClient.sendMessage(JSON.stringify(data));
}

function getRouteHandler(type) {
    return function (req, res) {
        if (isValidRequest(req)) {
            try {
                var data = req.body.body;
                var messageCover = helper.createMessageCover(type);
                var message = messageCover(data);
                var client = {
                    id: message.id,
                    data: null,
                    response: res
                };

                socketClient.storage.addClient(type, client);
                sendMessageRequest(message);
            } catch (err) {
                sendJSON(res, 500, err.message);
            }
        } else {
            sendJSON(res, 500, 'Body is required')
        }
    }
}

function balance(req, res) {
    if (isValidRequest(req)) {
        try {
            var type = actions.balance;
            var balances = req.body.balances;
            var balancesToSend = helper.createMessagesQueue(type, balances);
            var messagesIds = helper.getMessagesIds(balancesToSend);
            var messagesCount = messagesIds.length;
            var id = uuid.v1();

            var client = {
                data: [],
                id: id,
                response: res,
                messagesCount: messagesCount
            };

            socketClient.storage.addClient(type, client);
            socketClient.storage.addMessages(id, messagesIds);
            balancesToSend.forEach(sendMessageRequest);
        } catch (err) {
            sendJSON(res, 500, err.message);
        }
    } else {
        sendJSON(res, 500, 'Body is required')
    }
}

exports.balance = balance;
exports.history = getRouteHandler(actions.history);
