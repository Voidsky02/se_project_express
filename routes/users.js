const usersRouter = require("express").Router();
const {
  createUser,
  login,
  getCurrentUser,
  updateProfile,
} = require("../controllers/users");
const auth = require("../middleware/auth");
const { validateUserInfoBody, validateAuthentication } = require('../middleware/validation');

// NEW ROUTES:
usersRouter.post("/signin", validateAuthentication, login);
usersRouter.post("/signup", validateUserInfoBody, createUser);
usersRouter.get("/users/me", auth, getCurrentUser);
usersRouter.patch("/users/me", auth, updateProfile);

module.exports = { usersRouter };
