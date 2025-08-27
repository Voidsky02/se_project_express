const bcrypt = require("bcryptjs");
const { User } = require("../models/user");
const { serverErrorHandler, orFailErrorHandler } = require("../utils/errors");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => serverErrorHandler(req, res, err));
};

module.exports.getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(orFailErrorHandler)
    .then((user) => res.status(200).send(user))
    .catch((err) => serverErrorHandler(req, res, err));
};

// update to read email and password - hash password before saving to database
module.exports.createUser = (req, res) => {
  const { name, avatar, email } = req.body;
  // hash password here before creating user with it?
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      User.create({ name, avatar, email, password: hash });
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => serverErrorHandler(req, res, err));
  // User.create({ name, avatar, email, password })
  //   .then((user) => res.status(200).send(user))
  //   .catch((err) => serverErrorHandler(req, res, err));
};
