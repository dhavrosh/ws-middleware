'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json({}));

require('./routes/index')(app);

return app;

