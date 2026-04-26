const Product = require("../model/Product");

exports.catchResults = async (req, res) => {
  const { ids } = req.body;

  const products = await Product.find({
    _id: { $in: ids },
  });

  return res.status(200).json(products);
};
