/* eslint-disable @typescript-eslint/no-var-requires */
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = app => {
	app.use(
		["/api", "*/Cashier"],
		createProxyMiddleware({
			target: "https://stag.bwing.com",
			changeOrigin: true
		})
	);
};
