const { ClothingItem } = require("../models/clothingItems");
const { serverErrorHandler, orFailErrorHandler } = require("../utils/errors");

// mabey i should have my api calls return an object, with properties like "data"
// containing the likes array, and "message" containing info on wether the call was
// a success or not

module.exports.likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(orFailErrorHandler)
    .then((likes) => res.status(200).send(`Successfully liked item: ${likes}`))
    .catch((err) => serverErrorHandler(req, res, err));
};

module.exports.dislikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(orFailErrorHandler)
    .then((likes) =>
      res.status(200).send(`Successfully removed like from item: ${likes}`)
    )
    .catch((err) => serverErrorHandler(req, res, err));
};
