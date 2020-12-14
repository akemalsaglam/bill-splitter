const queries = {};
const {devConfig} = require('../../config');

queries.updateEventQuery = `UPDATE ${devConfig.database.schemaName}.events SET name=$2, description = COALESCE($3, description) WHERE id=$1;`;

module.exports = queries;