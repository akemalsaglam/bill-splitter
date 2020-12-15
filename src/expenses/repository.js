const postgreSqlDb = require('../postgreDb');

const queries = {};

const logger = require('../logger');
const mainSqlQueries = require('../main-sql-queries');

const tableName = 'expenses';
const expensesSqlQueries = require('./sql-queries');
const { expensesErrorName } = require('./errors');

queries.getAll = function getAll() {
  return postgreSqlDb.manyOrNone(mainSqlQueries.getAllQuery(tableName))
    .then((data) => {
      logger.info('getting all expenses.');
      return data;
    })
    .catch(
      (error) => logger.error('exception occurred while expenses getAll', error),
    );
};

queries.getById = function getById(id) {
  return postgreSqlDb.oneOrNone(mainSqlQueries.getByIdQuery(tableName), id)
    .then((data) => {
      if (data === null) {
        logger.warn(`user is not found for id:${id}`);
        return new Error(expensesErrorName.expenseNotFound);
      }
      logger.info(`getting expense by id: ${id}`);
      return data;
    })
    .catch(
      (error) => logger.error(
        `exception occurred while expenses getById, id: ${id}`,
        error,
      ),
    );
};

queries.getExpenseByEventId = function getExpenseByEventId(eventId) {
  return postgreSqlDb.manyOrNone(expensesSqlQueries.getExpenseByEventIdQuery,
    eventId)
    .then((data) => {
      logger.info(`getting expenses by eventId: ${eventId}`);
      return data;
    })
    .catch(
      (error) => logger.error(
        `exception occurred while expenses getExpenseByEventId, id: ${eventId}`,
        error,
      ),
    );
};

queries.deleteExpenseById = function deleteExpenseById(id) {
  return postgreSqlDb.none(mainSqlQueries.deleteByIdQuery(tableName), id)
    .then(() => {
      logger.info(`expense id: ${id} was deleted.`);
      return true;
    })
    .catch((error) => {
      logger.error(`exception occurred while expense deleteById, id: ${id}`,
        error);
    });
};

queries.activateExpenseById = function activateExpenseById(id) {
  return postgreSqlDb.none(mainSqlQueries.activateByIdQuery(tableName), id)
    .then(() => {
      logger.info(`expense id: ${id} was activated.`);
      return true;
    })
    .catch((error) => {
      logger.error(`exception occurred while expense activateUserById, id: ${id}`,
        error);
    });
};

async function isExpenseActive(id) {
  const expense = await queries.getById(id);
  return (expense.is_active === true);
}

async function isExpensePassive(id) {
  return !await isExpenseActive(id);
}

module.exports = queries;
