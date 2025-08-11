const { User } = require("../models/user.js");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      return res.status(500).send({ message: `Error: ${err}` });
    });
};

module.exports.getUser = (req, res) => {
  const userId = req.params.userId;
  User.findById(userId)
    .then((user) => res.status(200).send(user))
    .catch((err) => console.error(`Error: ${err}`));
};

module.exports.createUser = (req, res) => {
  const { name, avatar } = req.body;
  User.create({ name, avatar })
    .then((user) => res.status(200).send(user))
    .catch((err) => res.status(500).send(`Error: ${err}`));
};
