module.exports = function (app) {
    'use strict';

    var wsRouter = require('./ws');

    app.use('/ws', wsRouter);
};
