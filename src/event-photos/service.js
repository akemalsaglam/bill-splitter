const queries = require('./repository');

const service = {};

service.getPhotosByEventId = function (args) {
    return queries.getPhotosByEventId(args.eventId);
};

service.addEventPhoto = function (args) {
    return queries.addEventPhoto(args.input);
};

module.exports = service;
