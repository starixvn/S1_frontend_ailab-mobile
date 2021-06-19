module.exports = {
	displayName: "goal123",
	preset: "../../jest.preset.js",
	globals: {
		"ts-jest": {
			tsConfig: "<rootDir>/tsconfig.spec.json"
		}
	},
	transform: {
		"^(?!.*\\.(js|jsx|ts|tsx|css|json)$)": "@nrwl/react/plugins/jest",
		"^.+\\.[tj]sx?$": "ts-jest"
	},
	moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
	coverageDirectory: "../../coverage/apps/goal123",
	collectCoverage: true,
	coverageReporters: ["html"]
};
