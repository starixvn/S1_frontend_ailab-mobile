/* eslint-disable @typescript-eslint/no-var-requires */
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = app => {
	app.use(
		["/api", "*/Cashier", "/SiteSkin"],
		createProxyMiddleware({
			target: "https://www.n88dev.com",
			changeOrigin: true
		})
	);
};
