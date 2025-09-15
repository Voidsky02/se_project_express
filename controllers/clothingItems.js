const { ClothingItem } = require("../models/clothingItems");
const { serverErrorHandler } = require("../utils/errors");

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

module.exports.deleteClothingItem = async (req, res) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  let item;
  let deletedItem;

  try {
    item = await ClothingItem.findById(itemId);

    if (item === null) {
      await Promise.reject({ name: "DocumentNotFoundError" });
    }

    if (item.owner.toString() === userId) {
      deletedItem = await ClothingItem.findByIdAndDelete(itemId);
      return res.status(200).send(deletedItem);
    }

    return await Promise.reject({ name: "ForbiddenError" });
  } catch (error) {
    return serverErrorHandler(req, res, error);
  }
};
