const queries = {};
const {devConfig} = require('../../config');

queries.getPhotosByEventIdQuery = `select * from ${devConfig.database.schemaName}.event_photos eu where eu.event_id=$1`;

queries.addEventPhotoQuery = `INSERT INTO ${devConfig.database.schemaName}.event_photos(url, event_id) VALUES ($1, $2) RETURNING id;`;

module.exports = queries;