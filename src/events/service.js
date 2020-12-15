const eventRepository = require('./repository');

const eventService = {};

eventService.getAll = function () {
    return eventRepository.getAll();
};

eventService.getById = function (args) {
    return eventRepository.getById(args.id);
};

eventService.updateEvent = function (args) {
    return eventRepository.updateEvent(args.id, args.eventInput);
};

eventService.deleteEventById = function (args) {
    return eventRepository.deleteEventById(args.id);
};

eventService.activateEventById = function (args) {
    return eventRepository.activateEventById(args.id);
};

module.exports = eventService;
