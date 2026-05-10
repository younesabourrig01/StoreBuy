module.exports = {
  AUTH_SERVICE: process.env.AUTH_SERVICE_URL || "http://localhost:5000",
  PRODUCT_SERVICE: process.env.PRODUCT_SERVICE_URL || "http://localhost:5001",
  FAVORITE_SERVICE: process.env.FAVORITE_SERVICE_URL || "http://localhost:5002",
  CART_SERVICE: process.env.CART_SERVICE_URL || "http://localhost:5003",
  ORDER_SERVICE: process.env.ORDER_SERVICE_URL || "http://localhost:5004",
  NOTIFICATION_SERVICE: process.env.NOTIFICATION_SERVICE_URL || "http://localhost:5005",
  PASSWORD_SERVICE: process.env.PASSWORD_GENERATOR_URL || "http://localhost:5006",
};



