const { getProductById } = require("../clients/product.client");

exports.checkProductAvailability = async (productId, quantity) => {
  const product = await getProductById(productId);

  if (!product) {
    throw new Error("Product not found");
  }

  if (product.quantity < quantity) {
    throw new Error("Not enough stock");
  }

  return product;
};
