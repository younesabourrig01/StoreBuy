const { createProxyMiddleware, fixRequestBody } = require("http-proxy-middleware");
const { FAVORITE_SERVICE } = require("../../config/services");
const auth = require("../../middlewares/auth.middleware");

module.exports = (app) => {
  app.use(
    "/api/user/favorite",
    auth,
    (req, res, next) => {
      req.headers["x-internal-secret"] = process.env.INTERNAL_SECRET;
      const userId = req.user?.id || req.user?._id;
      console.log("GATEWAY FAVORITE PROXY - User ID:", userId);
      if (userId) {
        req.headers["x-user-id"] = String(userId);
      }
      next();

    },
    createProxyMiddleware({
      target: FAVORITE_SERVICE,
      changeOrigin: true,
      pathRewrite: {
        "^/": "/api/user/favorite/",
      },
    }),

  );
};
