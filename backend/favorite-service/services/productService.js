const { getProductById } = require("../clients/product.client");

exports.checkProductAvailability = async (productId) => {
  const product = await getProductById(productId);

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};