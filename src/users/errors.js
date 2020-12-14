module.exports.usersErrorName = {
  userIsPassive: "userIsPassive",
  userNotFound: "userNotFound",
  emailIsNotValid: "emailIsNotValid",
  emailAlreadyInUse: "emailAlreadyInUse",
  passwordNotEqualToRepeatPassword: "passwordNotEqualToRepeatPassword",
  passwordLengthShort: "passwordLengthShort"
};

module.exports.usersErrorType = {
  userIsPassive: {
    message: 'can not perform this operation because user is passive!',
    statusCode: 1111
  },
  userNotFound: {
    message: 'user not found!',
    statusCode: 1112
  },
  emailIsNotValid: {
    message: 'email is not valid!',
    statusCode: 1113
  },
  emailAlreadyInUse: {
    message: 'email already in use!',
    statusCode: 1114
  },
  passwordNotEqualToRepeatPassword: {
    message: 'password does not equal to repeat password!',
    statusCode: 1115
  },
  passwordLengthShort: {
    message: 'password length should be min 8 or longer!',
    statusCode: 1116
  }
};