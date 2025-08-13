const { ClothingItem } = require("../models/clothingItems.js");

module.exports.getClothingItems = (req, res) => {
  ClothingItem.find({})
    .then((clothingItems) => res.status(200).send(clothingItems))
    .catch((err) => {
      return res.status(500).send(`Error: ${err}`);
    });
};

module.exports.createClothingItem = (req, res) => {
  const owner = req.user._id;
  const { name, weather, imageUrl } = req.body;
  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((clothingItem) => res.status(200).send(clothingItem))
    .catch((err) => {
      return res.status(500).send(`Error: ${err}`);
    });
};

module.exports.deleteClothingItem = (req, res) => {
  const itemId = req.params.itemId;
  ClothingItem.findByIdAndDelete(itemId)
    .then((clothingItem) => {
      return res.status(200).send(`Deletion successfull: ${clothingItem}`);
    })
    .catch((err) => {
      return res.status(500).send(`Error: ${err}`);
    });
};
