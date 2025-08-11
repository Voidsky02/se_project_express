const clothingItemsRouter = require("express").Router();
const {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
} = require("../controllers/clothingItems");

clothingItemsRouter.get("/items", getItems);

clothingItemsRouter.post("/items", createItem);

clothingItemsRouter.delete("/items/:itemId", deleteItem);

module.exports = { clothingItemsRouter };
