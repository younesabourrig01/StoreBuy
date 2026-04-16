const Favorite = require("../model/favorite");
const {
  sendSuccess,
  sendError,
  sendNotFound,
} = require("../tools/responseHelper");

//add a product to fav list
exports.addToFav = async (req, res) => {
  try {
    const user_id = req.headers["x-user-id"];
    const { product_id } = req.body;

    if (!product_id) {
      return sendError(res, "product_id is required", 400);
    }

    const existingFav = await Favorite.findOne({
      user: user_id,
      product: product_id,
    });

    if (existingFav) {
      return sendError(res, "Product already in favorites", 409);
    }

    const fav = await Favorite.create({
      user: user_id,
      product: product_id,
    });

    return sendSuccess(res, fav, 201);
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

//remove a product from fav list
exports.removeFav = async (req, res) => {
  try {
    const user_id = req.headers["x-user-id"];
    const { product_id } = req.body;

    if (!user_id) {
      return sendError(res, "User ID is required", 400);
    }

    if (!product_id) {
      return sendError(res, "Product ID is required", 400);
    }

    const deletedFav = await Favorite.findOneAndDelete({
      user: user_id,
      product: product_id,
    });

    if (!deletedFav) {
      return sendNotFound(res, "Favorite", 404);
    }

    return sendSuccess(res, deletedFav, 200);
  } catch (error) {
    console.error("removeFav error:", error);
    return sendError(res, error.message, 500);
  }
};

//fet fav list
exports.getFav = async (req, res) => {
  try {
    const user_id = req.headers["x-user-id"];

    if (!user_id) {
      return sendError(res, "User ID is required", 400);
    }

    const favList = await Favorite.find({ user: user_id });
    if (!favList || favList.length === 0) {
      return sendSuccess(res, [], 200);
    }

    return sendSuccess(res, favList, 200);
  } catch (error) {
    console.error("getFav error:", error);
    return sendError(res, error.message, 500);
  }
};
