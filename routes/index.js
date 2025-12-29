const router = require('express').Router();
const { usersRouter } = require("./users");
const { clothingItemsRouter } = require("./clothingItems");
const { error404 } = require("../utils/errors");

// don't use auth middleware for any user routes
router.use("/", usersRouter);
// use auth middleware for every route except getClothingItems
router.use("/", clothingItemsRouter);
router.use((req, res) =>
  res.status(error404.code).send({ message: error404.message })
);

module.exports = router;