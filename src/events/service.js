const eventRepository = require('./repository');

const eventService = {};

eventService.getAll = function getAll() {
  return eventRepository.getAll();
};

eventService.getById = function getById(args) {
  return eventRepository.getById(args.id);
};

eventService.updateEvent = async function updateEvent(args) {
  await eventRepository.updateEvent(args.id, args.eventInput);
  return eventRepository.getById(args.id);
};

eventService.deleteEventById = function deleteEventById(args) {
  return eventRepository.deleteEventById(args.id);
};

eventService.activateEventById = function activateEventById(args) {
  return eventRepository.activateEventById(args.id);
};

module.exports = eventService;
