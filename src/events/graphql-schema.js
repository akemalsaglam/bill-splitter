const eventService = require('./service');

const model = `
  type Event {
    id: Int
    name: String
    created_date: String
    created_user_id: Int
    photo_link: String
    description: String
    is_active: Boolean
  },
  
  input EventInput {
    name: String!
    created_user_id: Int
    photo_link: String
    description: String
  }
`;

const Queries = `
  getEventById(id: Int!): Event,
  getAllEvents:[Event],
`;

const Mutations = ` 
  updateEvent(id: Int!, input: EventInput): Event,
  deleteEventById(id: Int!): Boolean,
  activateEventById(id: Int!): Boolean
`;

const root = {
  getEventById: eventService.getById,
  getAllEvents: eventService.getAll,
  deleteEventById: eventService.deleteEventById,
  updateEvent: eventService.updateEvent,
  activateEventById: eventService.activateEventById,
};

module.exports.model = model;
module.exports.queries = Queries;
module.exports.mutations = Mutations;
module.exports.root = root;
