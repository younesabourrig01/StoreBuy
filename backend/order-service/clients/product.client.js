const axios = require("axios");
require("dotenv").config();

const PRODUCT_SERVICE = process.env.PRODUCT_SERVICE;
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
