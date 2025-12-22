require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middleware/loggers');
const { usersRouter } = require("./routes/users");
const { clothingItemsRouter } = require("./routes/clothingItems");
const { likesRouter } = require("./routes/likes");
const { error404 } = require("./utils/errors");
const { errorHandler } = require('./middleware/error-handler');

const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => console.log("Connected to MongoDB."))
  .catch((err) => console.error(`Error: ${err}`));

// perhaps i wont need this if school doesn't mention it?
app.use(cors());
app.use(express.json());

// request logger
app.use(requestLogger);

// don't use auth middleware for any user routes
app.use("/", usersRouter);
// use auth middleware for ever route except getClothingItems
app.use("/", clothingItemsRouter);
app.use("/", likesRouter);
app.use((req, res) =>
  res.status(error404.code).send({ message: error404.message })
);

// error LOGGER
app.use(errorLogger);

// celebrate and Joi error handler 
app.use(errors());

// Centralized Error Handling => 4 parameters is how express knows this is an error handling middleware
app.use(errorHandler); // (They told me to put after all other app.use)

const { PORT = 3001 } = process.env;

app.listen(PORT, () => {
  console.log("Spark...");
});
