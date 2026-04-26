const { createProxyMiddleware } = require("http-proxy-middleware");
const { PRODUCT_SERVICE } = require("../../config/services");
const auth = require("../../middlewares/auth.middleware");
const role = require("../../middlewares/role.middleware");

module.exports = (app) => {
  app.use(
    "/api/admin/products",
    auth,
    role("admin"),
    createProxyMiddleware({
      target: PRODUCT_SERVICE,
      changeOrigin: true,
      onProxyReq: (proxyReq, req, res) => {
        proxyReq.setHeader("x-internal-secret", process.env.INTERNAL_SECRET);
        proxyReq.setHeader("x-user-role", req.user.role);
      },
    }),
  );
};
