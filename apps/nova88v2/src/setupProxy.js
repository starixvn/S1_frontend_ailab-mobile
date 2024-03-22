/* eslint-disable @typescript-eslint/no-var-requires */
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = app => {
	app.use(
		[
			"/api",
			"*/Cashier",
			"/SiteSkin",
			"*/entPage",
			"*/liveStreamingEntPage"
		],
		createProxyMiddleware({
			target: "https://stage.nova88dev.com",
			changeOrigin: true
		})
	);
};
