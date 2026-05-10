const { createProxyMiddleware } = require("http-proxy-middleware");
const { PRODUCT_SERVICE } = require("../../config/services");

module.exports = (app) => {
  app.use(
    "/api/products/uploads",
    createProxyMiddleware({
      target: PRODUCT_SERVICE,
      changeOrigin: true,
      pathRewrite: (path) => {
        const newPath = "/uploads" + (path.startsWith("/") ? path : "/" + path);
        return newPath;
      },
    })
  );

  app.use(
    "/api/products",
    (req, res, next) => {
      console.log(`[Gateway] Proxying ${req.method} ${req.originalUrl} to Product Service`);
      req.headers["x-internal-secret"] = process.env.INTERNAL_SECRET;
      next();
    },
    createProxyMiddleware({
      target: PRODUCT_SERVICE,
      changeOrigin: true,
      pathRewrite: (path) => {
        const newPath = "/api/products" + (path.startsWith("/") ? path : "/" + path);
        return newPath;
      },
    }),
  );
};

