const queries = require('./repository');

const service = {};

service.getUsersByEventId = function (args) {
    return queries.getUsersByEventId(args.eventId);
};

service.deleteUserById = function (args) {
    return queries.deleteUserById(args.id);
};

module.exports = service;
