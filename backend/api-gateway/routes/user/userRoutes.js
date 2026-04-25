const { createProxyMiddleware } = require("http-proxy-middleware");
const { AUTH_SERVICE } = require("../../config/services");
const auth = require("../../middlewares/auth.middleware");

module.exports = (app) => {
  app.use(
    "/api/user",
    auth,
    createProxyMiddleware({
      target: AUTH_SERVICE,
      changeOrigin: true,
      onProxyReq: (proxyReq, req, res) => {
        proxyReq.setHeader("x-internal-secret", process.env.INTERNAL_SECRET);
      },
    }),
  );
};
