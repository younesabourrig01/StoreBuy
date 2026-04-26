const { getItems } = require("../clients/cart.client");

exports.checkItemsAvailability = async (userId) => {
  const cart = await getItems(userId);

  if (!cart) {
    throw new Error("cart not found Or empty");
  }

  if (!cart || !Array.isArray(cart) || cart.length === 0) {
    throw new Error("cart empty");
  }

  return cart;
};
