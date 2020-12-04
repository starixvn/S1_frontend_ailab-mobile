import { number_format } from "../../lib/common";

describe("number_format", () => {
	test(`When value is 2000`, () => {
		expect(number_format({ number: 2000 })).toBe("2,000.00");
	});

	test(`When value is 2000, digits = 3`, () => {
		expect(number_format({ number: 2000, digits: 3 })).toBe("2,000.000");
	});

	test(`When value is 2000, digits = 0`, () => {
		expect(number_format({ number: 2000, digits: 0 })).toBe("2,000");
	});

	test(`When value is 2000, formatRequired = true, digits = 0`, () => {
		expect(
			number_format({ number: 2000, formatRequired: true, digits: 0 })
		).toBe("2 ('000)");
	});

	test(`When value is 2000, isConvertRequired = true, digits = 0`, () => {
		expect(
			number_format({
				number: 2000,
				isConvertRequired: true,
				digits: 0
			})
		).toBe("2");
	});

	test(`When value is 2000, formatRequired = true, isConvertRequired = true, digits = 0`, () => {
		expect(
			number_format({
				number: 2000,
				formatRequired: true,
				isConvertRequired: true,
				digits: 0
			})
		).toBe("2 ('000)");
	});
});
