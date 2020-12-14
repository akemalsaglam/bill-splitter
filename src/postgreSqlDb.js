const pgPromise = require('pg-promise')(/* options */);
const user = "asaglam";
const password = "";
const host = "localhost";
const port = "5432";
const database = "split_billing";
const connectionString = 'postgres://' + user + '' + password + ':@' + host
    + ':' + port + '/'
    + database;
module.exports = pgPromise(connectionString);

