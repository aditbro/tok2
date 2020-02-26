const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const serverSignature = crypto.randomBytes(20).toString('hex');

exports.createToken = function (attributes) {
  return jwt.sign(attributes, serverSignature);
}

exports.authenticate = function (attributes) {
  return jwt.verify(attributes, serverSignature);
}