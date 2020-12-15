const expenseRepository = require('./repository');

const expenseService = {};

const logger = require('../logger');
const { expensesErrorName } = require('./errors');

expenseService.getAll = function getAll() {
  return expenseRepository.getAll();
};

expenseService.getById = async function getById(args) {
  const expense = await expenseRepository.getById(args.id);
  if (expense === null) {
    logger.warn(`expense not found for id: ${args.id}`);
    return new Error(expensesErrorName.expenseNotFound);
  }
  logger.info(`getting expense by id: ${args.id}`);
  return expense;
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
