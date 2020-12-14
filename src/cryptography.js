const CryptoJS = require('crypto-js');
const crypto = require('crypto');

const pepperKey = "UR`aSekN-h9[:-vGa)!;2m_jWKC}cA'2>/Ege==kCY.!?tC5dB--b(cVEW}&sxB#/";
const pepper = "91cbbe92c0f0f01f1f0f0ab051d5659cd6d6deb2d98f6d080a125f0585"
    + "bcb60b8c37a91fdf0a511165a2698f85e7f886d8f914dec42eb3ed73a1dd4486fd59f1";

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
  return CryptoJS.AES.encrypt(password, salt + pepper);
};

cryptography.decrypt = function decrypt(hashedPassword, salt) {
  return CryptoJS.AES.decrypt(hashedPassword, salt + pepper).toString(
      CryptoJS.enc.Utf8);
};

module.exports = cryptography;