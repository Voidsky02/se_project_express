const usersRouter = require("express").Router();
const {
  getUsers,
  createUser,
  getUser,
  login,
  getCurrentUser,
  updateProfile,
} = require("../controllers/users");

// returns all users - DELETE (cant access other users with authorization)
//
// usersRouter.get("/users", getUsers);

// returns one user by Id - DELETE (Cant access other profiles)
//
// usersRouter.get("/users/:userId", getUser);

// creates a new user - DELETE (we are using /signup now)
//
// usersRouter.post("/users", createUser);

// NEW ROUTES:
usersRouter.post("/signin", login);
usersRouter.post("/signup", createUser);
usersRouter.get("/users/me", getCurrentUser);
usersRouter.patch("/users/me", updateProfile);

module.exports = { usersRouter };
