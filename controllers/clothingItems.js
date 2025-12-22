const { ClothingItem } = require("../models/clothingItems");
const { error404, error403 } = require("../utils/errors");
const { convertServerError } = require("../utils/custom-error-constructors");

// must include next in parameters in order to use it
module.exports.getClothingItems = (req, res, next) => {
  ClothingItem.find({})
    .then((clothingItems) => res.status(200).send(clothingItems))
    .catch((err) => next(convertServerError(err))); // new error handling => pass to centralized error handling middleware
};

module.exports.createClothingItem = (req, res, next) => {
  const owner = req.user._id;
  const { name, weather, imageUrl } = req.body;
  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((clothingItem) => res.status(200).send(clothingItem))
    .catch((err) => next(convertServerError(err)));
};

module.exports.deleteClothingItem = async (req, res, next) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  let item;
  let deletedItem;

  try {
    item = await ClothingItem.findById(itemId);

    if (item === null) {
      /* mabey pass the error itself ex. error401 or whatever,
      then structure it to work with the error object itself to solve the lint error
      of not a error object being the reason for a Promise.reject */
      await Promise.reject(error404);
    }

    if (item.owner.toString() === userId) {
      deletedItem = await ClothingItem.findByIdAndDelete(itemId);
      return res.status(200).send(deletedItem);
    }

    return await Promise.reject(error403);
  } catch (err) {
    return next(convertServerError(err));
  }
};
