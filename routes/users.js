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
// I didnt add auth to this, so it never extracts the token from the user after logging in
// I need to pass auth to every request that needs to verify user or use user object i think
usersRouter.get("/users/me", auth, getCurrentUser);

// need to take the payload, which carries the user id, and use that to find the user and update?
usersRouter.patch("/users/me", auth, updateProfile);

module.exports = { usersRouter };
