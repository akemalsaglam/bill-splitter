const queries = require('./repository');

const eventUserService = {};

eventUserService.getUsersByEventId = function (args) {
    return queries.getUsersByEventId(args.eventId);
};

eventUserService.deleteUserById = function (args) {
    return queries.deleteUserById(args.id);
};

module.exports = eventUserService;
