const postgreSqlDb = require('../postgreDb');
const eventsSqlQueries = require('./sql-queries');
const logger = require('../logger');
const mainSqlQueries = require('../main-sql-queries');

const eventRepository = {};
const tableName = 'events';

eventRepository.getAll = function getAll() {
  return postgreSqlDb.manyOrNone(mainSqlQueries.getAllQuery(tableName))
    .then((data) => {
      logger.info('getting all events.');
      return data;
    })
    .catch((error) => {
      logger.error('exception occurred while events getAll', error);
    });
};

eventRepository.getById = function getById(id) {
  return postgreSqlDb.oneOrNone(mainSqlQueries.getByIdQuery(tableName), id)
    .then((data) => {
      logger.info(`getting event by id: ${id}`);
      return data;
    })
    .catch((error) => {
      logger.error(`exception occurred while events getById, id: ${id}`, error);
    });
};

eventRepository.updateEvent = function updateEvent(id, eventInput) {
  return postgreSqlDb.none(eventsSqlQueries.updateEventQuery,
    [id, eventInput.name, eventInput.description])
    .then(() => {
      logger.info(`updating event by id: ${id}`);
    })
    .catch((error) => {
      logger.error(`exception occurred while events updateEvent, id: ${id}`,
        error);
    });
};

eventRepository.deleteEventById = function deleteEventById(id) {
  return postgreSqlDb.none(mainSqlQueries.deleteByIdQuery(tableName), id)
    .then(() => {
      logger.info(`deleting event by id: ${id}`);
      return true;
    })
    .catch((error) => {
      logger.error(`exception occurred while events deleteEventById, id: ${id}`,
        error);
      return false;
    });
};

eventRepository.activateEventById = function activateEventById(id) {
  return postgreSqlDb.none(mainSqlQueries.activateByIdQuery(tableName), id)
    .then(() => {
      logger.info(`activate event by id: ${id}`);
      return true;
    })
    .catch((error) => {
      logger.error(`exception occurred while events activateEventById, id: ${id}`,
        error);
      return false;
    });
};

module.exports = eventRepository;
