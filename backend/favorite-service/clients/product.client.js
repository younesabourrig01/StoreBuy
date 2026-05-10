const axios = require("axios");
require("dotenv").config();

const PRODUCT_SERVICE = process.env.PRODUCT_SERVICE;

exports.getProductById = async (productId) => {
  try {
    const response = await axios.get(
      `${PRODUCT_SERVICE}/api/products/${productId}`,
      {
        timeout: 3000,
        headers: {
          "x-internal-secret": process.env.INTERNAL_SECRET,
        },
      },
    );

    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Product error");
    }
    throw new Error("Product service unavailable");
  }
};

exports.getProductsByIds = async (ids) => {
  try {
    const response = await axios.post(
      `${PRODUCT_SERVICE}/api/products/bulk`,
      { ids },
      {
        timeout: 3000,
        headers: {
          "x-internal-secret": process.env.INTERNAL_SECRET,
        },
      },
    );

    return response.data;
  } catch (error) {
    throw new Error("Product service unavailable");
  }
};
