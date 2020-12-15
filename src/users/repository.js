const postgreSqlDb = require('../postgreDb');
const logger = require('../logger');
const usersSqlQueries = require('./sql-queries');
const mainSqlQueries = require('../main-sql-queries');

const userRepository = {};
const userTableName = 'users';

userRepository.getAll = async function getAll() {
  return postgreSqlDb.manyOrNone(mainSqlQueries.getAllQuery(userTableName))
    .then((data) => {
      logger.info('getting all users');
      return data;
    })
    .catch(
      (error) => logger.error('exception occurred while users getAll', error),
    );
};

userRepository.getById = async function getById(id) {
  return postgreSqlDb.oneOrNone(mainSqlQueries.getByIdQuery(userTableName), id)
    .then((data) => data)
    .catch(
      (error) => logger.error(
        `exception occurred while users getById, id: ${id}`,
        error,
      ),
    );
};

userRepository.getByEmail = async function getByEmail(email) {
  return postgreSqlDb.oneOrNone(usersSqlQueries.getUserByEmailQuery, email)
    .then((user) => user)
    .catch(
      (error) => logger.error(
        `exception occurred while users getByEmail, id: ${email}`,
        error,
      ),
    );
};

userRepository.deleteById = function deleteById(id) {
  return postgreSqlDb.none(mainSqlQueries.deleteByIdQuery(userTableName), id)
    .then(() => {
      logger.info(`user id: ${id} was deleted.`);
      return true;
    })
    .catch((error) => {
      logger.error(`exception occurred while users deleteById, id: ${id}`, error);
      return false;
    });
};

userRepository.activateUserById = function activateUserById(id) {
  return postgreSqlDb.none(mainSqlQueries.activateByIdQuery(userTableName), id)
    .then(() => {
      logger.info(`user id: ${id} was activated.`);
      return true;
    })
    .catch((error) => {
      logger.error(`exception occurred while users activateUserById, id: ${id}`,
        error);
      return false;
    });
};

userRepository.updateUser = async function updateUser(input) {
  return postgreSqlDb.none(usersSqlQueries.updateUserQuery,
    [input.name, input.surname, input.profile_photo_link, input.id])
    .then(() => {
      logger.info(`user id: ${input.id} was updated.`);
    })
    .catch((error) => {
      logger.error(`exception occurred while users updateUser, id: ${input.id}`,
        error);
    });
};

userRepository.insertUser = async function insertUser(registerInput) {
  return postgreSqlDb.one(usersSqlQueries.insertUser,
    [registerInput.email_address, registerInput.password,
      registerInput.is_active, registerInput.salt])
    .then((data) => data.id)
    .catch(
      (error) => logger.error(
        'exception occurred while users insertUser', error,
      ),
    );
};

module.exports = userRepository;
