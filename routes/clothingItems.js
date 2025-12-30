const clothingItemsRouter = require("express").Router();
const auth = require("../middleware/auth");
const {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");
const { validateClothingItemBody, validateId } = require("../middleware/validation");

clothingItemsRouter.get("/items", validateId, getClothingItems);

clothingItemsRouter.post("/items", auth, validateClothingItemBody, createClothingItem);

clothingItemsRouter.delete("/items/:itemId", auth, validateId, deleteClothingItem);

// Likes
clothingItemsRouter.patch("/items/:itemId/likes", auth, validateId, likeItem);

clothingItemsRouter.delete("/items/:itemId/likes", auth, validateId, dislikeItem);

module.exports = { clothingItemsRouter };
