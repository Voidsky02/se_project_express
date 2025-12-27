const usersRouter = require("express").Router();
const {
  createUser,
  login,
  getCurrentUser,
  updateProfile,
} = require("../controllers/users");
const auth = require("../middleware/auth");

// NEW ROUTES:
usersRouter.post("/signin", login);
usersRouter.post("/signup", createUser);
usersRouter.get("/users/me", auth, getCurrentUser);
usersRouter.patch("/users/me", auth, updateProfile);

module.exports = { usersRouter };
