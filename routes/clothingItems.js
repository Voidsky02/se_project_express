const clothingItemsRouter = require("express").Router();
const {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
} = require("../controllers/clothingItems");

clothingItemsRouter.get("/items", getClothingItems);

clothingItemsRouter.post("/items", createClothingItem);

clothingItemsRouter.delete("/items/:itemId", deleteClothingItem);

module.exports = { clothingItemsRouter };
