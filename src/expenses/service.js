const expenseRepository = require('./repository');

const service = {};

service.getAll = function () {
  return expenseRepository.getAll();
};

service.getById = function (args) {
  return expenseRepository.getById(args.id);
};

service.getExpenseByEventId = function (args) {
  return expenseRepository.getExpenseByEventId(args.eventId);
};

service.deleteExpenseById = function (args) {
  return expenseRepository.deleteExpenseById(args.id);
};

service.activateExpenseById = function (args) {
  return expenseRepository.activateExpenseById(args.id);
};

module.exports = service;
