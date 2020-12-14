const eventUsersService = require('./service');

const EventUser = `
  type EventUser {
        id: Int
        event_id: Int
        name: String
        created_user_id: Int
        created_date: String,
        is_active: Boolean
    }
`;

const Queries = `
  getUsersByEventId(eventId: Int!): [EventUser]
`;

const Mutations = ` 
deleteEventUserById(id: Int!): Boolean
`;

const root = {
  getUsersByEventId: eventUsersService.getUsersByEventId,
  deleteEventUserById: eventUsersService.deleteUserById
};

module.exports.model = EventUser;
module.exports.queries = Queries;
module.exports.mutations = Mutations;
module.exports.root = root;
