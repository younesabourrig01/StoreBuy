const { createProxyMiddleware } = require("http-proxy-middleware");
const { PASSWORD_SERVICE } = require("../../config/services");

module.exports = (app) => {
  app.use(
    "/api/tools/password",
    (req, res, next) => {
      req.headers["x-internal-secret"] = process.env.INTERNAL_SECRET;
      next();
    },
    createProxyMiddleware({
      target: PASSWORD_SERVICE,
      changeOrigin: true,
      pathRewrite: {
        "^/": "/api/tools/password/",
      },
    }),
  );
};
