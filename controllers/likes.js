const { ClothingItem } = require("../models/clothingItems");
const { convertServerError, NotFoundError } = require("../utils/custom-error-constructors");

// maybe i should have my api calls return an object, with properties like "data"
// containing the likes array, and "message" containing info on wether the call was
// a success or not

module.exports.likeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(new NotFoundError('Clothing item not found'))
    .then((likes) => res.status(200).send(likes))
    .catch((err) => next(convertServerError(err)));
};

module.exports.dislikeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(new NotFoundError('Clothing item not found'))
    .then((likes) => res.status(200).send(likes))
    .catch((err) => next(convertServerError(err)));
};
