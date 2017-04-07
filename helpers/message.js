var uuid = require('uuid');

function createMessageCover(type) {
    return function (data) {
        var id  = uuid.v1();

        return {
            id: id,
            type: type,
            body: data
        };
    }
}

exports.createMessageCover = createMessageCover;

exports.createMessagesQueue = function createMessagesQueue(type, data) {
    var queueHandler = createMessageCover(type);

    return data.map(queueHandler);
};

exports.getMessagesIds = function getMessagesIds(data) {
    return data.map(function (item) {
        return item.id;
    });
};