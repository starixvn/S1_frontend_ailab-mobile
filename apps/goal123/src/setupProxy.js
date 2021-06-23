/* eslint-disable @typescript-eslint/no-var-requires */
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = app => {
	app.use(
		["/api", "*/Cashier", "/SiteSkin"],
		createProxyMiddleware({
			target: "https://stag.goal123.com",
			changeOrigin: true
		})
	);
};
