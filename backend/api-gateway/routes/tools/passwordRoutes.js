const { createProxyMiddleware } = require("http-proxy-middleware");
const { PASSWORD_SERVICE } = require("../../config/services");

module.exports = (app) => {
  app.use(
    "/api/tools/password",
    createProxyMiddleware({
      target: PASSWORD_SERVICE,
      changeOrigin: true,
      pathRewrite: {
        "^/": "/api/tools/password",
      },
      on: {
        proxyReq: (proxyReq, req, res) => {
          proxyReq.setHeader("x-internal-secret", process.env.INTERNAL_SECRET);
        },
      },
    }),
  );
};
