const axios = require("axios");
require("dotenv").config();

const CART_SERVICE = process.env.CART_SERVICE;

exports.getItems = async (userId) => {
  try {
    const response = await axios.get(`${CART_SERVICE}/api/user/cart`, {
      timeout: 3000,
      headers: {
        "x-internal-secret": process.env.INTERNAL_SECRET,
        "x-user-id": userId,
      },
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "cart error");
    }
    throw new Error("Cart service unavailable");
  }
};

exports.clearCart = async (userId) => {
  try {
    const response = await axios.delete(`${CART_SERVICE}/api/user/cart`, {
      timeout: 3000,
      headers: {
        "x-internal-secret": process.env.INTERNAL_SECRET,
        "x-user-id": userId,
      },
    });

    return response.data;
  } catch (error) {
    console.error("clearCart error:", error.message);
    // We don't necessarily want to fail the whole order if cart clearing fails,
    // but it's good to log it.
  }
};
