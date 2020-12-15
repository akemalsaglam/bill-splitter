module.exports.eventUsersErrorName = {
  eventUserIsPassive: 'eventUserIsPassive',
  eventUserNotFound: 'eventUserNotFound',
};

module.exports.eventUsersErrorType = {
  eventUserIsPassive: {
    message: 'can not perform this operation because event user is passive!',
    statusCode: 4441,
  },
  eventUserNotFound: {
    message: 'event user not found!',
    statusCode: 4442,
  },
};
