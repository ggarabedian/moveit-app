const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    "/token",
    createProxyMiddleware({
      target: "https://mobile-1.moveitcloud.com/api/v1",
      changeOrigin: true,
    })
  );

  app.use(
    "/users/self",
    createProxyMiddleware({
      target: "https://mobile-1.moveitcloud.com/api/v1",
      changeOrigin: true,
    })
  );

  app.use(
    "/folders/:directoryId/files",
    createProxyMiddleware({
      target: "https://mobile-1.moveitcloud.com/api/v1",
      changeOrigin: true,
    })
  );

  app.use(
    "/token/revoke",
    createProxyMiddleware({
      target: "https://mobile-1.moveitcloud.com/api/v1",
      changeOrigin: true,
    })
  );
};
