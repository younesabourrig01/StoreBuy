const { sendSuccess, sendError } = require("../tools/responseHelper");
const Product = require("../model/Product");

exports.sendResults = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids)) {
      return sendError(res, "Invalid IDs provided", 400);
    }

    const products = await Product.find({
      _id: { $in: ids },
    });

    return sendSuccess(res, products);
  } catch (error) {
    return sendError(res, error.message);
  }
};
