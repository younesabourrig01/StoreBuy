const { createProxyMiddleware } = require("http-proxy-middleware");
const { PRODUCT_SERVICE } = require("../../config/services");
const auth = require("../../middlewares/auth.middleware");
const role = require("../../middlewares/role.middleware");

module.exports = (app) => {
  app.use(
    "/api/admin/products",
    auth,
    role("admin"),
    (req, res, next) => {
      req.headers["x-internal-secret"] = process.env.INTERNAL_SECRET;
      req.headers["x-user-role"] = req.user.role;
      next();
    },
    createProxyMiddleware({
      target: PRODUCT_SERVICE,
      changeOrigin: true,
      pathRewrite: (path) => {
        const newPath = "/api/admin/products" + (path.startsWith("/") ? path : "/" + path);
        return newPath;
      },
    }),
  );
};
