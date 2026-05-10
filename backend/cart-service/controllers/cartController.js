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
    console.log("CART ADD REQUEST:", { user_id, product_id, quantity });

    if (!user_id) return sendError(res, "user id required", 400);
    if (!product_id) return sendError(res, "product id required", 400);

    const product = await checkProductAvailability(product_id, quantity);
    console.log("PRODUCT CHECK RESULT:", product ? "FOUND" : "NOT FOUND");


    const item = await Cart.findOneAndUpdate(
      { userId: String(user_id), productId: String(product._id) },
      { $inc: { quantity: quantity } },
      { new: true, upsert: true },
    );

    return sendSuccess(res, item, 201);
  } catch (error) {
    console.error("addItem error:", error);
    return sendError(res, error.message, 500);
  }
};
//get cart items
exports.getCart = async (req, res) => {
  try {
    const user_id = req.headers["x-user-id"];
    const cartItems = await Cart.find({ userId: String(user_id) });
    console.log("RAW CART ITEMS:", cartItems.length);

    if (!cartItems || cartItems.length === 0) {
      return sendSuccess(res, []);
    }

    const productIds = cartItems.map((item) => item.productId);
    console.log("FETCHING PRODUCT DETAILS FOR:", productIds);
    
    const productsResponse = await getProductsByIds(productIds);
    const products = productsResponse.data;

    console.log("PRODUCTS FOUND:", products?.length || 0);


    const fullCartItems = cartItems.map((item) => {
      const product = products.find((p) => {
        const pId = String(p._id);
        const cartPId = String(item.productId);
        const isMatch = pId === cartPId;
        if (!isMatch) {
           // console.log(`Mismatch: Product ${pId} vs Cart ${cartPId}`);
        }
        return isMatch;
      });
      
      return {
        ...item.toObject(),
        product: product || null,
      };
    });
    
    console.log("FINAL JOINED CART ITEMS:", fullCartItems.filter(i => i.product).length);
    return sendSuccess(res, fullCartItems);


  } catch (error) {
    console.error("getCart error:", error);
    return sendError(res, error.message);
  }
};
// remove item from cart
exports.removeItem = async (req, res) => {
  try {
    const user_id = req.headers["x-user-id"];
    const product_id = req.params.product_id;

    if (!user_id) return sendError(res, "user id required", 400);
    if (!product_id) return sendError(res, "product id required", 400);

    const product = await checkProductAvailability(product_id);

    const item = await Cart.findOneAndDelete({
      userId: String(user_id),
      productId: String(product._id),
    });

    if (!item) return sendNotFound(res, "product in cart", 404);

    return sendSuccess(res, item, 200);
  } catch (error) {
    console.error("removeItem error:", error);
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

    const result = await Cart.deleteMany({ userId: String(user_id) });

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
    console.error("clearCart error:", error);
    return sendError(res, error.message, 500);
  }
};
// update a produxt quantity
exports.updateItemQuantity = async (req, res) => {
  try {
    const user_id = req.headers["x-user-id"];
    const product_id = req.params.product_id;
    const { quantity } = req.body;

    if (!user_id) {
      return sendError(res, "user id required", 400);
    }

    if (!product_id) {
      return sendError(res, "product id required", 400);
    }

    if (typeof quantity !== "number" || quantity < 0) {
      return sendError(res, "invalid quantity", 400);
    }

    const item = await Cart.findOne({ userId: String(user_id), productId: String(product_id) });


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
