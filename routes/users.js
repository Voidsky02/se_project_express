// const { User } = require("../models/user");
const router = require("express").Router();
const { getUsers, createUser, getUser } = require("../controllers/users");

// returns all users
router.get("/users", getUsers);

// returns one user by Id
router.get("/users/:userId", getUser);

// creates a new user
router.post("/users", createUser);

// might rename to be more specific
module.exports = { router };
