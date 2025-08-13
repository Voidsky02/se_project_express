const likesRouter = require("express").Router();
const { likeItem, dislikeItem } = require("../controllers/likes");

likesRouter.put("/items/:itemId/likes", likeItem);

likesRouter.delete("/items/:itemId/likes", dislikeItem);

module.exports = { likesRouter };
