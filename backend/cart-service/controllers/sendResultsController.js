const Cart = require("../model/cart");

exports.sendResults = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const items = await Cart.find({ userId: userId });
    return res.status(200).json(items);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
