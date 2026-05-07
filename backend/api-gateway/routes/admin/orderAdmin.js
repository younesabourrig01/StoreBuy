const { createProxyMiddleware } = require("http-proxy-middleware");
const { ORDER_SERVICE } = require("../../config/services");
const auth = require("../../middlewares/auth.middleware");
const role = require("../../middlewares/role.middleware");

module.exports = (app) => {
  app.use(
    "/api/admin/orders",
    auth,
    role("admin"),
    createProxyMiddleware({
      target: ORDER_SERVICE,
      changeOrigin: true,
      pathRewrite: {
        "^/": "/api/admin/orders/",
      },
      onProxyReq: (proxyReq, req, res) => {
        proxyReq.setHeader("x-internal-secret", process.env.INTERNAL_SECRET);
        proxyReq.setHeader("x-user-role", req.user.role);
      },
    }),
  );
};
