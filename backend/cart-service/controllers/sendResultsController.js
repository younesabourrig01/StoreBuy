const Cart = require("../model/cart");

exports.catchResults = async (req, res) => {
  const { ids } = req.body;

  const Cart = await Product.find({
    _id: { $in: ids },
  });

  return res.status(200).json(products);
};
