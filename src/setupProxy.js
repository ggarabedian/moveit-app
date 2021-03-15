const { createProxyMiddleware } = require("http-proxy-middleware");

// Workaround CORS by creating a proxy express app inside the client
module.exports = (app) => {
  app.use(
    ["/token", "/users/self", "/folders/:directoryId/files", "/token/revoke"],
    createProxyMiddleware({
      target: "https://mobile-1.moveitcloud.com/api/v1",
      changeOrigin: true,
    })
  );
};
