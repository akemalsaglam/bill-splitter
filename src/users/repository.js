const postgreSqlDb = require('../postgreSqlDb');
const {usersErrorName} = require('./errors');
const logger = require('../logger');
const usersSqlQueries = require('./sql-queries');
const mainSqlQueries = require('../main-sql-queries');

const userRepository = {};
const userTableName = 'users';

userRepository.getAll = async function () {
  return postgreSqlDb.manyOrNone(mainSqlQueries.getAllQuery(userTableName))
  .then(data => {
    logger.info("getting all users");
    return data;
  })
  .catch(error => logger.error('exception occurred while users getAll', error));
};

userRepository.getById = async function (id) {
  return postgreSqlDb.oneOrNone(mainSqlQueries.getByIdQuery(userTableName), id)
  .then(data => {
    if (data === null) {
      logger.warn("user is not found for id:" + id);
      return new Error(usersErrorName.userNotFound);
    }
    logger.info(`getting user by id: ${id}`);
    return data;
  })
  .catch(
      error => logger.error(`exception occurred while users getById, id: ${id}`,
          error));
};

userRepository.getByEmail = async function (email) {
  return postgreSqlDb.oneOrNone(usersSqlQueries.getUserByEmailQuery, email)
  .then(user => {
    return user;
  })
  .catch(
      error => logger.error(`exception occurred while users getById, id: ${id}`,
          error));
};

userRepository.deleteById = function (id) {
  return postgreSqlDb.none(mainSqlQueries.deleteByIdQuery(userTableName), id)
  .then(() => {
    logger.info(`user id: ${id} was deleted.`);
    return true;
  })
  .catch(error => {
    logger.error(`exception occurred while users deleteById, id: ${id}`, error);
  });
};

userRepository.activateUserById = function (id) {
  return postgreSqlDb.none(mainSqlQueries.activateByIdQuery(userTableName), id)
  .then(() => {
    logger.info(`user id: ${id} was activated.`);
    return true;
  })
  .catch(error => {
    logger.error(`exception occurred while users activateUserById, id: ${id}`,
        error);
  });
};

userRepository.updateUser = async function (input) {
  if (await isUserPassive(input.id)) {
    return new Error(usersErrorName.userIsPassive);
  }

  return postgreSqlDb.none(usersSqlQueries.updateUserQuery,
      [input.name, input.surname, input.profile_photo_link, input.id])
  .then(function () {
    logger.info(`user id: ${id} was updated.`);
    return userRepository.getById(input.id);
  })
  .catch(error => {
    logger.error(`exception occurred while users updateUser, id: ${input.id}`,
        error);
  });
};

userRepository.insertUser = async function (registerInput) {
  return postgreSqlDb.one(usersSqlQueries.insertUser,
      [registerInput.email_address, registerInput.password, registerInput.is_active, registerInput.salt ])
  .then(data => {
    return data.id;
  })
  .catch(
      error => logger.error(
          'exception occurred while users insertUser', error));
};

async function isUserActive(id) {
  const user = await userRepository.getById(id);
  return (user.is_active === true);
}

async function isUserPassive(id) {
  return !await isUserActive(id);
}

module.exports = userRepository;
