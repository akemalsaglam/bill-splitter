const eventSqlQueries = {};
const { devConfig } = require('../../config');

eventSqlQueries.updateEventQuery = `UPDATE ${devConfig.database.schemaName}.events SET name=$2, description = COALESCE($3, description) WHERE id=$1;`;

module.exports = eventSqlQueries;
