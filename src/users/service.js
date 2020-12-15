const emailValidator = require('email-validator');
const userRepository = require('./repository');

const { usersErrorName } = require('./errors');

const userService = {};

const cryptography = require('../cryptography');

userService.getAll = function () {
  return userRepository.getAll();
};

userService.getById = function (args) {
  return userRepository.getById(args.id);
};

userService.deleteById = function (args) {
  return userRepository.deleteById(args.id);
};

userService.updateUser = function (args) {
  return userRepository.updateUser(args.input);
};

userService.activateUserById = function (args) {
  return userRepository.activateUserById(args.id);
};

userService.register = async function (args) {
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
  return await userRepository.getById(userId);
};

userService.login = async function (args) {
  const loginInput = args.input;
  const user = await userRepository.getByEmail(loginInput.email_address);
  if (user == null) {
    return false;
  }

  const persistedPass = cryptography.decrypt(user.password, user.salt);
  return persistedPass === loginInput.password;
};

module.exports = userService;
