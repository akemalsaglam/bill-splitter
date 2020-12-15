const queries = {};
const {devConfig} = require('../../config');

queries.getUsersByEventIdQuery = `select * from ${devConfig.database.schemaName}.event_users eu where eu.event_id=$1 and is_active=true;`;

module.exports = queries;