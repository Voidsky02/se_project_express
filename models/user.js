const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minLength: 2, maxLength: 30 },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: "You must enter a valid Email",
    },
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("user", userSchema);

module.exports = { User };
