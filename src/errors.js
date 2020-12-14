const {usersErrorName, usersErrorType} = require('./users/errors');
const {eventsErrorName, eventsErrorType} = require('./events/errors');

module.exports.errorName = {
  ...usersErrorName,
  ...eventsErrorName
};

module.exports.errorType = {
  ...usersErrorType,
  ...eventsErrorType
};