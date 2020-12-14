const queries = {};
const schema = 'public';

queries.getAllQuery = function (tableName) {
  return `select * from ${schema}.${tableName} e where e.is_active=true;`;
};

queries.getByIdQuery = function (tableName) {
  return `select * from ${schema}.${tableName} e where e.id=$1 and e.is_active=true;`;
};

queries.deleteByIdQuery = function (tableName) {
  return `UPDATE ${schema}.${tableName} SET is_active = false WHERE id=$1;`;
};

queries.activateByIdQuery = function (tableName) {
  return `UPDATE ${schema}.${tableName} SET is_active = true WHERE id=$1;`;
};

module.exports = queries;