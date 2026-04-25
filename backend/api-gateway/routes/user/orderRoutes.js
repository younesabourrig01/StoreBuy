const { createProxyMiddleware } = require("http-proxy-middleware");
const { ORDER_SERVICE } = require("../../config/services");
const auth = require("../../middlewares/auth.middleware");

module.exports = (app) => {
  app.use(
    "/api/user/orders",
    auth,
    createProxyMiddleware({
      target: ORDER_SERVICE,
      changeOrigin: true,
    }),
  );
};
