const postgreSqlDb = require('../postgreDb');

const mainSqlQueries = require('../main-sql-queries');
const logger = require('../logger');
const eventPhotosSqlQueries = require('./sql-queries');

const tableName = 'event_photos';
const queries = {};

queries.getPhotosByEventId = function getPhotosByEventId(eventId) {
  return postgreSqlDb.manyOrNone(
    eventPhotosSqlQueries.getPhotosByEventIdQuery, eventId,
  )
    .then((data) => data)
    .catch(
      (error) => logger.error(
        'exception occurred while event-photos getPhotosByEventId', error,
      ),
    );
};

queries.getPhotosById = function getPhotosById(id) {
  return postgreSqlDb.one(mainSqlQueries.getByIdQuery(tableName), id)
    .then((data) => data)
    .catch(
      (error) => logger.error(
        'exception occurred while event-photos getPhotosById', error,
      ),
    );
};

queries.addEventPhoto = function addEventPhoto(input) {
  return postgreSqlDb.one(eventPhotosSqlQueries.addEventPhotoQuery,
    [input.url, input.event_id])
    .then((data) => queries.getPhotosById(data.id))
    .catch(
      (error) => logger.error(
        'exception occurred while event-photos addEventPhoto', error,
      ),
    );
};

module.exports = queries;
