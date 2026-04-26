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
      onProxyReq: (proxyReq, req, res) => {
        proxyReq.setHeader("x-internal-secret", process.env.INTERNAL_SECRET);
        proxyReq.setHeader("x-user-id", req.user.id);
      },
    }),
  );
};
