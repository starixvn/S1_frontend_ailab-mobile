import { isArrayNotEmpty } from "../../../lib/common/common";

describe("isArrayNotEmpty", () => {
	test("Test can return expect value", () => {
		expect(isArrayNotEmpty([])).toBe(false);
		expect(isArrayNotEmpty("testdata")).toBe(false);
		expect(isArrayNotEmpty({ data: "test" })).toBe(false);
		expect(isArrayNotEmpty(123)).toBe(false);
		expect(isArrayNotEmpty([1, 2, 3])).toBe(true);
	});
});
