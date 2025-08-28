const express = require("express");
const mongoose = require("mongoose");
const { usersRouter } = require("./routes/users");
const { clothingItemsRouter } = require("./routes/clothingItems");
const { likesRouter } = require("./routes/likes");
const { error404 } = require("./utils/errors");

const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => console.log("Connected to MongoDB."))
  .catch((err) => console.error(`Error: ${err}`));

// perhaps i wont need this if school doesnt mention it?
app.use(express.json());

// dont use auth middleware for any user routes
app.use("/", usersRouter);
// use auth middleware for ever route except getClothingItems
app.use("/", clothingItemsRouter);
app.use("/", likesRouter);
app.use((req, res) =>
  res.status(error404.code).send({ message: error404.message })
);

const { PORT = 3001 } = process.env;

app.listen(PORT, () => {
  console.log("Spark...");
});
