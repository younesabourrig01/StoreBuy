const axios = require("axios");
require("dotenv").config();

const PRODUCT_SERVICE = process.env.PRODUCT_SERVICE;

exports.getProductById = async (productId) => {
  try {
    const response = await axios.get(
      `${PRODUCT_SERVICE}/products/${productId}`,
      {
        timeout: 3000,
      },
    );

    console.log(response.data);
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
      `${PRODUCT_SERVICE}/products/bulk`,
      { ids },
      {
        timeout: 3000,
      },
    );

    return response.data;
  } catch (error) {
    throw new Error("Product service unavailable");
  }
};
