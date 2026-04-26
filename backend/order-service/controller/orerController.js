const Order = require("../model/order");
const {
  sendSuccess,
  sendError,
  sendNotFound,
} = require("../tooles/responseHelper");

const { checkItemsAvailability } = require("../clients/cart.client");
const { getProductsByIds } = require("../clients/product.client");

//total price
const calculateTotalPrice = (items) => {
  return items.reduce((total, item) => {
    return total + item.quantity * item.price;
  }, 0);
};
exports.getOrderByUser = async (req, res) => {
  try {
    const user_id = req.headers["x-user-id"];

    if (!user_id) {
      return sendError(res, "user id required", 400);
    }

    const orders = await Order.find({ userId: user_id }).sort({
      createdAt: -1,
    });

    return sendSuccess(res, orders, 200);
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};
exports.createOrder = async (req, res) => {
  try {
    const user_id = req.headers["x-user-id"];

    if (!user_id) {
      return sendError(res, "user id is required", 400);
    }

    const items = await checkItemsAvailability(user_id);

    const productIds = items.map((it) => it.productId);
    const products = await getProductsByIds(productIds);

    for (const item of items) {
      if (!item.productId || !item.quantity || !item.price) {
        return sendError(res, "invalid item structure", 400);
      }

      if (item.quantity <= 0 || item.price <= 0) {
        return sendError(res, "invalid quantity or price", 400);
      }
    }

    const totalPrice = calculateTotalPrice(items);

    const order = await Order.create({
      userId: user_id,
      items,
      status: "CONFIRMED",
      totalPrice,
    });

    return sendSuccess(res, order, 201);
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};
exports.getAllOrders = async (req, res) => {
  try {
    const role = req.headers["x-user-role"];

    if (role !== "admin") {
      return sendError(res, "Access denied", 403);
    }

    const orders = await Order.find().sort({ createdAt: -1 });

    return sendSuccess(res, orders, 200);
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};
