const queries = {};
const {devConfig} = require('../../config');

queries.updateUserQuery = `UPDATE ${devConfig.database.schemaName}.users SET name = COALESCE($1, name), 
surname = COALESCE($2, surname), profile_photo_link = COALESCE($3, profile_photo_link) WHERE id=$4;`;

queries.getUserByEmailQuery = `select * from ${devConfig.database.schemaName}.users u where u.email=$1;`;

queries.insertUser = `INSERT INTO ${devConfig.database.schemaName}.users(email, password, is_active, salt) 
VALUES ($1, $2, $3, $4) RETURNING id;`;

module.exports = queries;