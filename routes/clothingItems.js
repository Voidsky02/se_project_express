const clothingItemsRouter = require("express").Router();
const auth = require("../middleware/auth");
const {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
} = require("../controllers/clothingItems");

clothingItemsRouter.get("/items", getClothingItems);

clothingItemsRouter.post("/items", auth, createClothingItem);

clothingItemsRouter.delete("/items/:itemId", auth, deleteClothingItem);

module.exports = { clothingItemsRouter };
