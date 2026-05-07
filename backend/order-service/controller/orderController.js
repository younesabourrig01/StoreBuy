const Order = require("../model/order");
const {
  sendSuccess,
  sendError,
  sendNotFound,
} = require("../tooles/responseHelper");
const { getChannel } = require("../services/rabbitmq");

const {
  checkItemsAvailability,
  clearCart,
} = require("../services/cartService");
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

    // 1. Get items from cart
    const items = await checkItemsAvailability(user_id);

    // 2. Get current product details (especially prices)
    const productIds = items.map((it) => it.productId);
    const productsResponse = await getProductsByIds(productIds);
    const productsList = productsResponse.data;

    // 3. Map items to include current prices and names
    const enrichedItems = items.map((cartItem) => {
      const productDetail = productsList.find(
        (p) => p._id.toString() === cartItem.productId.toString(),
      );

      if (!productDetail) {
        throw new Error(`Product ${cartItem.productId} no longer exists`);
      }

      return {
        productId: cartItem.productId,
        name: productDetail.name,
        quantity: cartItem.quantity,
        price: productDetail.price,
      };
    });

    // 4. Calculate total price using current product prices
    const totalPrice = calculateTotalPrice(enrichedItems);

    // 5. Create the order
    const order = await Order.create({
      userId: user_id,
      items: enrichedItems,
      status: "CONFIRMED",
      totalPrice,
    });
    //----------------------rabbit message--------------------
    const channel = getChannel();
    await channel.assertQueue("order_created");
    channel.sendToQueue(
      "order_created",
      Buffer.from(
        JSON.stringify({
          orderId: order._id,
          userId: order.userId,
          totalPrice: order.totalPrice,
        }),
      ),
    );
    //-------------------------------------------------------
    // 6. Clear user cart after successful order
    await clearCart(user_id);

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
