const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { User } = require("../models/user");
const { serverErrorHandler, orFailErrorHandler } = require("../utils/errors");

module.exports.getCurrentUser = (req, res) => {
  const userId = req.user._id;
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
    { new: true, runValidators: true }
  )
    .orFail(orFailErrorHandler)
    .then((user) => res.status(200).send(user))
    .catch((err) => serverErrorHandler(req, res, err));
};

module.exports.createUser = (req, res) => {
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
      .catch((err) => {
        console.log(`Error in create user: ${err}`);
        return serverErrorHandler(req, res, err);
      });
  });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return serverErrorHandler(req, res, { name: "ValidationError" });
  }
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      res.send({ token });
    })
    .catch((err) => serverErrorHandler(req, res, err));
};
