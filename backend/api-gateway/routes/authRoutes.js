const { createProxyMiddleware, fixRequestBody } = require("http-proxy-middleware");
const { AUTH_SERVICE } = require("../config/services");

module.exports = (app) => {
  app.use(
    "/api/auth/uploads",
    createProxyMiddleware({
      target: AUTH_SERVICE,
      changeOrigin: true,
      pathRewrite: {
        "^/": "/uploads/",
      },
    }),
  );

  app.use(
    "/api/auth",
    (req, res, next) => {
      req.headers["x-internal-secret"] = process.env.INTERNAL_SECRET;
      next();
    },
    createProxyMiddleware({
      target: AUTH_SERVICE,
      changeOrigin: true,
      logLevel: "debug",
      pathRewrite: {
        "^/": "/api/auth/",
      },
    }),
  );
};
