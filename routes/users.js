const usersRouter = require("express").Router();
const {
  createUser,
  login,
  getCurrentUser,
  updateProfile,
} = require("../controllers/users");
const auth = require("../middleware/auth");

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
usersRouter.get("/users/me", auth, getCurrentUser);
usersRouter.patch("/users/me", auth, updateProfile);

module.exports = { usersRouter };
