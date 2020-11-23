import { number_format, isConvert } from "../../../components/common/common";

describe("number_format", () => {
	test("Test can return expect format", () => {
		expect(number_format("123", true)).toBe("0.123 ('000)");
		expect(number_format("1234", true)).toBe("1.234 ('000)");
		expect(number_format("1234567", true)).toBe("1,234.567 ('000)");
		expect(number_format(123, true)).toBe("0.123 ('000)");
		expect(number_format(1234567, true)).toBe("1,234.567 ('000)");
		expect(number_format("abcde", true)).toBe("abcde");

		expect(number_format("123", false)).toBe("0.123");
		expect(number_format("1234", false)).toBe("1.234");
		expect(number_format("1234567", false)).toBe("1,234.567");
		expect(number_format(123, false)).toBe("0.123");
		expect(number_format(1234567, false)).toBe("1,234.567");
		expect(number_format("abcde", false)).toBe("abcde");
	});
});

describe("isConvert", () => {
	test("Test can return expect value", () => {
		expect(isConvert(51)).toBe(true);
		expect(isConvert(15)).toBe(true);
		expect(isConvert(4)).toBe(false);
	});
});
