const express = require("express");
const mongoose = require("mongoose");
const { router } = require("./routes/users");

const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => console.log("Connected to MongoDB."))
  .catch((err) => console.error(`Error: ${err}`));

// perhaps i wont need this if school doesnt mention it?
app.use(express.json());

app.use("/", router);

const { PORT = 3001 } = process.env;

app.listen(PORT, () => {
  console.log("Spark...");
});
