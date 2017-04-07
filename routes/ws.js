'use strict';

var express = require('express');
var router = express.Router();
var handler = require('../handlers/ws');

module.exports = function wsRouter() {

    router.post('/balance', handler.balance);
    router.post('/history', handler.history);

    return router;
};

