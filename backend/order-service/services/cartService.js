const { getItems, clearCart } = require("../clients/cart.client");

exports.checkItemsAvailability = async (userId) => {
  const cart = await getItems(userId);

  if (!cart) {
    throw new Error("cart not found Or empty");
  }

  const cartItems = cart.data;

  if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
    throw new Error("cart empty");
  }

  return cartItems;
};

exports.clearCart = async (userId) => {
  return await clearCart(userId);
};
