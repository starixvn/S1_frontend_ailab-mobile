module.exports = {
	displayName: "promotion",
	preset: "../../jest.preset.js",
	transform: {
		"^.+\\.[tj]sx?$": [
			"babel-jest",
			{ cwd: __dirname, configFile: "./babel-jest.config.json" }
		]
	},
	moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
	coverageDirectory: "./coverage/libs/promotion",
	collectCoverage: true,
	coverageReporters: ["json", "lcov", "text", "clover"],
	collectCoverageFrom: ["./src/**/*.{js,jsx}"]
};
