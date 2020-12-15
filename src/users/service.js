const emailValidator = require('email-validator');
const userRepository = require('./repository');

const { usersErrorName } = require('./errors');

const userService = {};

const cryptography = require('../cryptography');
const logger = require('../logger');

userService.getAll = function getAll() {
  return userRepository.getAll();
};

userService.getById = async function getById(args) {
  const user = await userRepository.getById(args.id);
  if (user === null) {
    logger.warn(`user is not found for id: ${args.id}`);
    return new Error(usersErrorName.userNotFound);
  }
  logger.info(`getting user by id: ${args.id}`);
  return user;
};

userService.deleteById = function deleteById(args) {
  return userRepository.deleteById(args.id);
};

async function isUserActive(id) {
  const user = await userRepository.getById(id);
  return (user.is_active === true);
}

async function isUserPassive(id) {
  return !await isUserActive(id);
}

userService.updateUser = async function updateUser(args) {
  if (await isUserPassive(args.input.id)) {
    return new Error(usersErrorName.userIsPassive);
  }
  await userRepository.updateUser(args.input);
  return userRepository.getById(args.input.id);
};

userService.activateUserById = function activateUserById(args) {
  return userRepository.activateUserById(args.id);
};

userService.register = async function register(args) {
  const registerInput = args.input;
  const isMailAddressValid = emailValidator.validate(registerInput.email_address);

  if (!isMailAddressValid) {
    return new Error(usersErrorName.emailIsNotValid);
  }

  if (registerInput.password.length < 8) {
    return new Error(usersErrorName.passwordLengthShort);
  }

  if (registerInput.repeat_password !== registerInput.password) {
    return new Error(usersErrorName.passwordNotEqualToRepeatPassword);
  }

  const user = await userRepository.getByEmail(registerInput.email_address);
  if (user != null) {
    return new Error(usersErrorName.emailAlreadyInUse);
  }

  const salt = cryptography.produceSalt(registerInput.password);
  const hashPassword = cryptography.encrypt(registerInput.password, salt);

  registerInput.salt = salt.toString();
  registerInput.password = hashPassword.toString();
  registerInput.is_active = true;

  const userId = await userRepository.insertUser(registerInput);
  return userRepository.getById(userId);
};

userService.login = async function login(args) {
  const loginInput = args.input;
  const user = await userRepository.getByEmail(loginInput.email_address);
  if (user == null) {
    return false;
  }

  const persistedPass = cryptography.decrypt(user.password, user.salt);
  return persistedPass === loginInput.password;
};

module.exports = userService;
