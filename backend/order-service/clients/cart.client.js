const axios = require("axios");
require("dotenv").config();

const CART_SERVICEE = process.env.CART_SERVICE;

exports.getItems = async (userId) => {
  try {
    const response = await axios.get(`${CART_SERVICE}/api/cart/${userId}`, {
      timeout: 3000,
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "cart error");
    }
    throw new Error("Cart service unavailable");
  }
};
