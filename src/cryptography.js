const CryptoJS = require('crypto-js');
const crypto = require('crypto');
const {devConfig} = require('../config');

const cryptography = {};

const saltLength = 32;
const saltGenerationIteration = 1000;
const saltKeyBitsSize = 512;

cryptography.produceSalt = function (password) {
  let salt = crypto.randomBytes(Math.ceil(saltLength)).toString('hex');
  return CryptoJS.PBKDF2(password, salt, {
    keySize: saltKeyBitsSize / 32,
    iterations: saltGenerationIteration
  });
};

cryptography.encrypt = function (password, salt) {
  return CryptoJS.AES.encrypt(password, salt + devConfig.cryptography.pepper);
};

cryptography.decrypt = function decrypt(hashedPassword, salt) {
  return CryptoJS.AES.decrypt(hashedPassword,
      salt + devConfig.cryptography.pepper).toString(
      CryptoJS.enc.Utf8);
};

module.exports = cryptography;