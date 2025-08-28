const likesRouter = require("express").Router();
const auth = require("../middleware/auth");
const { likeItem, dislikeItem } = require("../controllers/likes");

likesRouter.put("/items/:itemId/likes", auth, likeItem);

likesRouter.delete("/items/:itemId/likes", auth, dislikeItem);

module.exports = { likesRouter };
