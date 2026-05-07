const { createProxyMiddleware, fixRequestBody } = require("http-proxy-middleware");
const { AUTH_SERVICE } = require("../../config/services");
const auth = require("../../middlewares/auth.middleware");

module.exports = (app) => {
  app.use(
    "/api/user",
    auth,
    (req, res, next) => {
      req.headers["x-internal-secret"] = process.env.INTERNAL_SECRET;
      const userId = req.user?.id || req.user?._id;
      if (userId) {
        req.headers["x-user-id"] = String(userId);
      }
      next();
    },
    createProxyMiddleware({
      target: AUTH_SERVICE,
      changeOrigin: true,
      pathRewrite: {
        "^/": "/api/user/",
      },
    }),
  );
};
