const Cart = require("../model/cart");
const {
  sendSuccess,
  sendError,
  sendNotFound,
} = require("../tools/responseHelper");

const { checkProductAvailability } = require("../service/productService");
const { getProductsByIds } = require("../clients/product.client");

//add an item to cart
exports.addItem = async (req, res) => {
  try {
    const user_id = req.headers["x-user-id"];
    const { product_id, quantity = 1 } = req.body;

    if (!user_id) return sendError(res, "user id required", 400);
    if (!product_id) return sendError(res, "product id required", 400);

    const product = await checkProductAvailability(product_id, quantity);

    const item = await Cart.findOneAndUpdate(
      { userId: user_id, productId: product._id },
      { $inc: { quantity: quantity } },
      { new: true, upsert: true },
    );

    return sendSuccess(res, item, 201);
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};
//get cart items
exports.getCart = async (req, res) => {
  try {
    const user_id = req.headers["x-user-id"];

    const items = await Cart.find({ userId: user_id });

    const productIds = items.map((it) => it.productId);
    const products = await getProductsByIds(productIds);

    return sendSuccess(res, products);
  } catch (error) {
    return sendError(res, error.message);
  }
};
// remove item from cart
exports.removeItem = async (req, res) => {
  try {
    const user_id = req.headers["x-user-id"];
    const product_id = req.params.id;

    if (!user_id) return sendError(res, "user id required", 400);
    if (!product_id) return sendError(res, "product id required", 400);

    const product = await checkProductAvailability(product_id);

    const item = await Cart.findOneAndDelete({
      userId: user_id,
      productId: product._id,
    });

    if (!item) return sendNotFound(res, "product in cart", 404);

    return sendSuccess(res, item, 200);
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};
//clear cart
exports.clearCart = async (req, res) => {
  try {
    const user_id = req.headers["x-user-id"];

    if (!user_id) {
      return sendError(res, "user id required!", 400);
    }

    const result = await Cart.deleteMany({ userId: user_id });

    if (result.deletedCount === 0) {
      return sendNotFound(res, "Cart", 404);
    }

    return sendSuccess(
      res,
      {
        message: "Cart cleared successfully",
        deletedItems: result.deletedCount,
      },
      200,
    );
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};
// update a produxt quantity
exports.updateItemQuantity = async (req, res) => {
  try {
    const user_id = req.headers["x-user-id"];
    const cart_id = req.params.id;
    const { quantity } = req.body;

    if (!user_id) {
      return sendError(res, "user id required", 400);
    }

    if (!cart_id) {
      return sendError(res, "cart id required", 400);
    }

    if (typeof quantity !== "number" || quantity < 0) {
      return sendError(res, "invalid quantity", 400);
    }

    const item = await Cart.findById(cart_id);

    if (!item) {
      return sendNotFound(res, "Item not found in cart", 404);
    }

    if (item.userId.toString() !== user_id) {
      return sendError(res, "Unauthorized", 403);
    }

    if (quantity === 0) {
      await item.deleteOne();
      return sendSuccess(res, {
        message: "Item removed from cart",
      });
    }

    item.quantity = quantity;
    await item.save();

    return sendSuccess(res, item, 200);
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};
