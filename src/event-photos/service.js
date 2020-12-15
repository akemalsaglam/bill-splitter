const queries = require('./repository');

const eventPhotoService = {};

eventPhotoService.getPhotosByEventId = function getPhotosByEventId(args) {
  return queries.getPhotosByEventId(args.eventId);
};

eventPhotoService.addEventPhoto = function addEventPhoto(args) {
  return queries.addEventPhoto(args.input);
};

module.exports = eventPhotoService;
