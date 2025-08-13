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

module.exports.createUser = (req, res) => {
  const { name, avatar } = req.body;
  User.create({ name, avatar })
    .then((user) => res.status(200).send(user))
    .catch((err) => serverErrorHandler(req, res, err));
};
