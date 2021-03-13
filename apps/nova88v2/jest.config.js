module.exports = {
	displayName: "nova88",
	preset: "../../jest.preset.js",
		moduleNameMapper: {
			"@Router": "<rootDir>/src/route/link.js",
			//"Config" : "<rootDir>/src/config.js",
			"Context" : "<rootDir>/src/components/common/context.js",
		},
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
		coverageDirectory: "../../coverage/apps/nova88"
}

