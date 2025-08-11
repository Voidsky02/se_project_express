const { mongoose } = require("mongoose");
const validator = require("validator");

// Create USER Schema & Model

/* name — the name of the user, a required string from 2 to 30 characters
    avatar — a required string for the URL of the user's image */

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
});

const User = mongoose.model("user", userSchema);

module.exports = { User };
