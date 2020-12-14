const eventRepository = require('./repository');

const service = {};

service.getAll = function () {
    return eventRepository.getAll();
};

service.getById = function (args) {
    return eventRepository.getById(args.id);
};

service.updateEvent = function (args) {
    return eventRepository.updateEvent(args.id, args.eventInput);
};

service.deleteEventById = function (args) {
    return eventRepository.deleteEventById(args.id);
};

service.activateEventById = function (args) {
    return eventRepository.activateEventById(args.id);
};

module.exports = service;
