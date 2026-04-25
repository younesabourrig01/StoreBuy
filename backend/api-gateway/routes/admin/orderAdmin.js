const { createProxyMiddleware } = require("http-proxy-middleware");
const { ORDER_SERVICE } = require("../../config/services");
const auth = require("../../middlewares/auth.middleware");
const role = require("../../middlewares/role.middleware");

module.exports = (app) => {
  app.use(
    "/api/user/orders/admin",
    auth,
    role("admin"),
    createProxyMiddleware({
      target: ORDER_SERVICE,
      changeOrigin: true,
    }),
  );
};
