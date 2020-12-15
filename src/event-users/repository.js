const { eventUsersErrorName } = require('./errors');
const postgreSqlDb = require('../postgreDb');

const eventUserRepository = {};
const logger = require('../logger');
const mainSqlQueries = require('../main-sql-queries');

const tableName = 'event_users';
const eventUsersSqlQueries = require('./sql-queries');

eventUserRepository.getUsersByEventId = function getUsersByEventId(eventId) {
  return postgreSqlDb.manyOrNone(
    eventUsersSqlQueries.getUsersByEventIdQuery, eventId,
  )
    .then((data) => {
      if (data === null) {
        logger.warn(`event user is not found for id: ${eventId}`);
        return new Error(eventUsersErrorName.userNotFound);
      }
      logger.info(`getting event users by event_id: ${eventId}`);
      return data;
    })
    .catch((error) => {
      logger.error(
        `exception occurred while event-users getUsersByEventId, id: ${eventId}`,
        error,
      );
    });
};

eventUserRepository.deleteUserById = function deleteUserById(id) {
  return postgreSqlDb.none(mainSqlQueries.deleteByIdQuery(tableName), id)
    .then(() => {
      logger.info(`deleting event user by id: ${id}`);
      return true;
    })
    .catch((error) => {
      logger.error(
        `exception occurred while event-users deleteUserById, id: ${id}`,
        error,
      );
    });
};

eventUserRepository.activateEventUserById = function activateEventUserById(id) {
  return postgreSqlDb.none(mainSqlQueries.activateByIdQuery(tableName), id)
    .then(() => {
      logger.info(`activate event-user by id: ${id}`);
      return true;
    })
    .catch((error) => {
      logger.error(
        `exception occurred while event-users activateEventById, id: ${id}`,
        error,
      );
    });
};

module.exports = eventUserRepository;
