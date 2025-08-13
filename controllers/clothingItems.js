const { ClothingItem } = require("../models/clothingItems");
const { serverErrorHandler, orFailErrorHandler } = require("../utils/errors");

module.exports.getClothingItems = (req, res) => {
  ClothingItem.find({})
    .then((clothingItems) => res.status(200).send(clothingItems))
    .catch((err) => serverErrorHandler(req, res, err));
};

module.exports.createClothingItem = (req, res) => {
  const owner = req.user._id;
  const { name, weather, imageUrl } = req.body;
  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((clothingItem) => res.status(200).send(clothingItem))
    .catch((err) => serverErrorHandler(req, res, err));
};

module.exports.deleteClothingItem = (req, res) => {
  const { itemId } = req.params;
  ClothingItem.findByIdAndDelete(itemId)
    .orFail(orFailErrorHandler)
    .then((clothingItem) => res.status(200).send(clothingItem))
    .catch((err) => serverErrorHandler(req, res, err));
};
