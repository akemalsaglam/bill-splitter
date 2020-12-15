const eventUserSqlQueries = {};
const { devConfig } = require('../../config');

eventUserSqlQueries.getUsersByEventIdQuery = `select * from ${devConfig.database.schemaName}.event_users eu where eu.event_id=$1 and is_active=true;`;

module.exports = eventUserSqlQueries;
