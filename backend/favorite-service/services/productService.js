const { getProductById } = require("../clients/product.client");

exports.checkProductAvailability = async (product_id) => {
  const product = await getProductById(product_id);

  if (!product) {
    throw new Error("Product not found");
  }

  return product.data;
};