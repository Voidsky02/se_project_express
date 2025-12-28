const clothingItemsRouter = require("express").Router();
const auth = require("../middleware/auth");
const {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");
const { validateClothingItemBody } = require("../middleware/validation");

clothingItemsRouter.get("/items", validateClothingItemBody, getClothingItems);

clothingItemsRouter.post("/items", auth, validateClothingItemBody, createClothingItem);

clothingItemsRouter.delete("/items/:itemId", auth, validateClothingItemBody, deleteClothingItem);

// Likes
clothingItemsRouter.patch("/items/:itemId/likes", auth, likeItem);

clothingItemsRouter.delete("/items/:itemId/likes", auth, dislikeItem);

module.exports = { clothingItemsRouter };
