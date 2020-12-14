const postgreSqlDb = require('../postgreDb');
const eventsSqlQueries = require('./sql-queries');
const logger = require('../logger');
const mainSqlQueries = require('../main-sql-queries');

const queries = {};
const tableName = 'events';

queries.getAll = function () {
  return postgreSqlDb.manyOrNone(mainSqlQueries.getAllQuery(tableName))
  .then(data => {
    logger.info(`getting all events.`);
    return data;
  })
  .catch(error => {
    logger.error(`exception occurred while events getAll`, error);
  });
};

queries.getById = function (id) {
  return postgreSqlDb.oneOrNone(mainSqlQueries.getByIdQuery(tableName), id)
  .then((data) => {
    logger.info(`getting event by id: ${id}`);
    return data;
  })
  .catch(error => {
    logger.error(`exception occurred while events getById, id: ${id}`, error);
  });
};

queries.updateEvent = function (id, eventInput) {
  return postgreSqlDb.none(eventsSqlQueries.updateEventQuery,
      [id, eventInput.name, eventInput.description])
  .then(() => {
    logger.info(`updating event by id: ${id}`);
    return queries.getById(id);
  })
  .catch(error => {
    logger.error(`exception occurred while events updateEvent, id: ${id}`,
        error);
  });
};

queries.deleteEventById = function (id) {
  return postgreSqlDb.none(mainSqlQueries.deleteByIdQuery(tableName), id)
  .then(() => {
    logger.info(`deleting event by id: ${id}`);
    return true;
  })
  .catch(error => {
    logger.error(`exception occurred while events deleteEventById, id: ${id}`,
        error);
  });
};

queries.activateEventById = function (id) {
  return postgreSqlDb.none(mainSqlQueries.activateByIdQuery(tableName), id)
  .then(() => {
    logger.info(`activate event by id: ${id}`);
    return true;
  })
  .catch(error => {
    logger.error(`exception occurred while events activateEventById, id: ${id}`,
        error);
  });
};

module.exports = queries;
