import { isConvert } from "../../../components/common/common";

describe("isConvert", () => {
	test("Test can return expect value", () => {
		expect(isConvert(51)).toBe(true);
		expect(isConvert(15)).toBe(true);
		expect(isConvert(4)).toBe(false);
	});
});
