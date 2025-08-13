const mongoose = require("mongoose");
const validator = require("validator");

const clothingItemSchema = new mongoose.Schema({
  name: { type: String, minLength: 2, maxLength: 30, required: true },
  weather: { type: String, enum: ["hot", "warm", "cold"], required: true },
  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  createdAt: { type: Date, default: Date.now },
});

const ClothingItem = mongoose.model("clothingItem", clothingItemSchema);

module.exports = { ClothingItem };
