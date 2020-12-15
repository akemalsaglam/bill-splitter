const queries = require('./repository');

const eventUserService = {};

eventUserService.getUsersByEventId = function getUsersByEventId(args) {
  return queries.getUsersByEventId(args.eventId);
};

eventUserService.deleteUserById = function deleteUserById(args) {
  return queries.deleteUserById(args.id);
};

module.exports = eventUserService;
