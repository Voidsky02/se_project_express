const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { User } = require("../models/user");
// const { serverErrorHandler, orFailErrorHandler } = require("../utils/errors");
const { convertServerError, NotFoundError, BadRequestError } = require('../utils/custom-error-constructors');

module.exports.getCurrentUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .orFail(new NotFoundError('User not found'))
    .then((user) => res.status(200).send(user))
    .catch((err) => next(convertServerError(err)));
};

// update users Name and Avatar fields ONLY
module.exports.updateProfile = (req, res, next) => {
  const { name, avatar } = req.body;

  User.findOneAndUpdate(
    { _id: req.user._id },
    { $set: { name, avatar } },
    { new: true, runValidators: true }
  )
    .orFail(new NotFoundError('User not found'))
    .then((user) => res.status(200).send(user))
    .catch((err) => next(convertServerError(err)));
};

module.exports.createUser = (req, res, next) => {
  console.log(`create user called with:`, req.body);
  const { name, avatar, email } = req.body;
  bcrypt.hash(req.body.password, 10).then((hash) => {
    console.log("Password Hashed correctly");
    return User.create({ name, avatar, email, password: hash })
      .then((user) => {
        console.log(`User created successfully`);
        const userObject = user.toJSON();
        delete userObject.password;
        res.status(200).send(userObject);
      })
      .catch((err) => next(convertServerError(err)));
  });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new BadRequestError('Invalid email or password'));
  }
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      res.send({ token });
    })
    .catch((err) => next(convertServerError(err)));
};
