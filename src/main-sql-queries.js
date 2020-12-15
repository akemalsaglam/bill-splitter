const queries = {};
const { devConfig } = require('../config');

queries.getAllQuery = function getAllQuery(tableName) {
  return `select * from ${devConfig.database.schemaName}.${tableName} e where e.is_active=true;`;
};

queries.getByIdQuery = function getByIdQuery(tableName) {
  return `select * from ${devConfig.database.schemaName}.${tableName} e where e.id=$1 and e.is_active=true;`;
};

queries.deleteByIdQuery = function deleteByIdQuery(tableName) {
  return `UPDATE ${devConfig.database.schemaName}.${tableName} SET is_active = false WHERE id=$1;`;
};

queries.activateByIdQuery = function activateByIdQuery(tableName) {
  return `UPDATE ${devConfig.database.schemaName}.${tableName} SET is_active = true WHERE id=$1;`;
};

module.exports = queries;
