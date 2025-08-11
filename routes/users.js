const usersRouter = require("express").Router();
const { getUsers, createUser, getUser } = require("../controllers/users");

// returns all users
usersRouter.get("/users", getUsers);

// returns one user by Id
usersRouter.get("/users/:userId", getUser);

// creates a new user
usersRouter.post("/users", createUser);

// might rename to be more specific
module.exports = { usersRouter };
