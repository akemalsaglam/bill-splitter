const pgPromise = require('pg-promise')(/* options */);
const { devConfig } = require('../config');

const connectionString = `postgres://${devConfig.database.user}${
  devConfig.database.password}:@${devConfig.database.host
}:${devConfig.database.port}/${
  devConfig.database.database}`;

module.exports = pgPromise(connectionString);
