const CryptoJS = require('crypto-js');
const crypto = require('crypto');
const {devConfig} = require('../config');

const cryptography = {};

cryptography.produceSalt = function (password) {
  let salt = crypto.randomBytes(
      Math.ceil(devConfig.cryptography.saltLength)).toString('hex');
  return CryptoJS.PBKDF2(password, salt, {
    keySize: devConfig.cryptography.saltKeyBitsSize / 32,
    iterations: devConfig.cryptography.saltGenerationIteration
  });
};

cryptography.encrypt = function (password, salt) {
  return CryptoJS.AES.encrypt(password, salt + devConfig.cryptography.pepper);
};

cryptography.decrypt = function decrypt(hashedPassword, salt) {
  return CryptoJS.AES.decrypt(hashedPassword,
      salt + devConfig.cryptography.pepper).toString(CryptoJS.enc.Utf8);
};

module.exports = cryptography;