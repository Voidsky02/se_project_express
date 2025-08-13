const express = require("express");
const mongoose = require("mongoose");
const { usersRouter } = require("./routes/users");
const { clothingItemsRouter } = require("./routes/clothingItems");
const { likesRouter } = require("./routes/likes");

const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => console.log("Connected to MongoDB."))
  .catch((err) => console.error(`Error: ${err}`));

// perhaps i wont need this if school doesnt mention it?
app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: "68995d729ccd16b14822bf18",
  };
  next();
});
app.use("/", usersRouter);
app.use("/", clothingItemsRouter);
app.use("/", likesRouter);
app.use((req, res) => {
  return res.status(404).send({ message: "Requested resource not found" });
});

const { PORT = 3001 } = process.env;

app.listen(PORT, () => {
  console.log("Spark...");
});
