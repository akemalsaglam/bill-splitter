const eventPhotosService = require('./service');

const EventPhotos = `
  type EventPhotos {
        id: Int
        url: String
        event_id: Int
        is_active: Boolean
    },
   
   input EventPhotosInput {
        url: String!
        event_id: Int!
    }
`;

const Queries = `
  getPhotosByEventId(eventId: Int!): [EventPhotos]
`;

const Mutations = ` 
  addEventPhoto(input: EventPhotosInput): EventPhotos
`;

const root = {
  getPhotosByEventId: eventPhotosService.getPhotosByEventId,
  addEventPhoto: eventPhotosService.addEventPhoto
};

module.exports.model = EventPhotos;
module.exports.queries = Queries;
module.exports.mutations = Mutations;
module.exports.root = root;
