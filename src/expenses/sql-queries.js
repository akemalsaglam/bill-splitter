const expenseSqlQueries = {};
const { devConfig } = require('../../config');

expenseSqlQueries.getExpenseByEventIdQuery = `select * from ${devConfig.database.schemaName}.expenses e where e.event_id=$1;`;

module.exports = expenseSqlQueries;
