const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { User } = require("../models/user");
const { serverErrorHandler, orFailErrorHandler } = require("../utils/errors");

// delete since cant access other profiles now?
//
// module.exports.getUsers = (req, res) => {
//   User.find({})
//     .then((users) => res.status(200).send(users))
//     .catch((err) => serverErrorHandler(req, res, err));
// };

// Altered
//
// req.user is undefined
module.exports.getCurrentUser = (req, res) => {
  const userId = req.user;
  User.findById(userId)
    .orFail(orFailErrorHandler)
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      serverErrorHandler(req, res, err);
    });
};

// update users Name and Avatar fields ONLY
module.exports.updateProfile = (req, res) => {
  const { name, avatar } = req.body;

  User.findOneAndUpdate(
    { _id: req.user._id },
    { $set: { name, avatar } },
    { new: true }
  )
    .then((user) => res.status(200).send(user))
    .catch((err) => serverErrorHandler(req, res, err));
};

module.exports.createUser = (req, res) => {
  const { name, avatar, email } = req.body;
  bcrypt.hash(req.body.password, 10).then((hash) => {
    User.create({ name, avatar, email, password: hash })
      .then((user) => res.status(200).send(user))
      .catch((err) => serverErrorHandler(req, res, err));
  });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      res.send({ token });
    })
    .catch((err) => serverErrorHandler(req, res, err));
};
