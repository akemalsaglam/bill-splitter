const expenseRepository = require('./repository');

const expenseService = {};

expenseService.getAll = function () {
  return expenseRepository.getAll();
};

expenseService.getById = function (args) {
  return expenseRepository.getById(args.id);
};

expenseService.getExpenseByEventId = function (args) {
  return expenseRepository.getExpenseByEventId(args.eventId);
};

expenseService.deleteExpenseById = function (args) {
  return expenseRepository.deleteExpenseById(args.id);
};

expenseService.activateExpenseById = function (args) {
  return expenseRepository.activateExpenseById(args.id);
};

module.exports = expenseService;
