const queries = require('./repository');

const eventPhotoService = {};

eventPhotoService.getPhotosByEventId = function (args) {
    return queries.getPhotosByEventId(args.eventId);
};

eventPhotoService.addEventPhoto = function (args) {
    return queries.addEventPhoto(args.input);
};

module.exports = eventPhotoService;
