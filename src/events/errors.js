module.exports.eventsErrorName = {
  eventIsPassive: 'eventIsPassive',
  eventNotFound: 'eventNotFound',
};

module.exports.eventsErrorType = {
  eventIsPassive: {
    message: 'can not perform this operation because event is passive!',
    statusCode: 2221,
  },
  eventNotFound: {
    message: 'event not found!',
    statusCode: 2222,
  },
};
