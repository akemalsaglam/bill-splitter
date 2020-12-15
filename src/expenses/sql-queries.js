const queries = {};
const { devConfig } = require('../../config');

queries.getExpenseByEventIdQuery = `select * from ${devConfig.database.schemaName}.expenses e where e.event_id=$1;`;

module.exports = queries;
