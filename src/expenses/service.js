const expenseRepository = require('./repository');

const expenseService = {};

expenseService.getAll = function getAll() {
  return expenseRepository.getAll();
};

expenseService.getById = function getById(args) {
  return expenseRepository.getById(args.id);
};

expenseService.getExpenseByEventId = function getExpenseByEventId(args) {
  return expenseRepository.getExpenseByEventId(args.eventId);
};

expenseService.deleteExpenseById = function deleteExpenseById(args) {
  return expenseRepository.deleteExpenseById(args.id);
};

expenseService.activateExpenseById = function activateExpenseById(args) {
  return expenseRepository.activateExpenseById(args.id);
};

module.exports = expenseService;
