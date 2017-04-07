var config = Object(null);

config.port = process.env.PORT || 3000;
config.serverUrl = process.env.SERVER_URL || ''; // ws-server

module.exports =  Object.freeze(config);