exports.sendJSON = function sendJSON(res, status, data) {
    res.status(status).json(data);
};