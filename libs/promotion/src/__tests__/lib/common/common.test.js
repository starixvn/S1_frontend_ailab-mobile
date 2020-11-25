import {
	isArrayNotEmpty,
	isExpiry,
	isNew,
	isClaimed
} from "../../../lib/common/common";
import { defPromoStatus, defPromotionType } from "../../../lib/common/def";
import moment from "moment";

describe("isArrayNotEmpty", () => {
	test(`When value is []`, () => {
		expect(isArrayNotEmpty([])).toBe(false);
	});
	test(`When value is "testdata"`, () => {
		expect(isArrayNotEmpty("testdata")).toBe(false);
	});
	test(`When value is { data: "test" }`, () => {
		expect(isArrayNotEmpty({ data: "test" })).toBe(false);
	});
	test(`When value is 123`, () => {
		expect(isArrayNotEmpty(123)).toBe(false);
	});
	test(`When value is [1, 2, 3]`, () => {
		expect(isArrayNotEmpty([1, 2, 3])).toBe(true);
	});
});

describe("isExpiry", () => {
	let nextMonth = moment().add(1, "months").unix();
	let tomorrow = moment().add(1, "days").unix();
	let yesterday = moment().add(-1, "days").unix();

	Object.keys(defPromotionType).forEach(key => {
		let type = defPromotionType[key];
		test(`not join & not login, type=${key} & periodTo=nextMonth`, () => {
			expect(
				isExpiry({
					periodTo: nextMonth,
					custExpiryTime: null,
					isLogin: false,
					isJoin: false,
					status: null,
					promotionType: type
				})
			).toBe(false);
		});

		test(`not join & not login, type=${key} & periodTo=yesterday`, () => {
			expect(
				isExpiry({
					periodTo: yesterday,
					custExpiryTime: null,
					isLogin: false,
					isJoin: false,
					status: null,
					promotionType: type
				})
			).toBe(true);
		});

		test(`not join & login, type=${key} & periodTo=nextMonth`, () => {
			expect(
				isExpiry({
					periodTo: nextMonth,
					custExpiryTime: null,
					isLogin: true,
					isJoin: false,
					status: null,
					promotionType: type
				})
			).toBe(false);
		});

		test(`not join & login, type=${key} & periodTo=yesterday`, () => {
			expect(
				isExpiry({
					periodTo: yesterday,
					custExpiryTime: null,
					isLogin: true,
					isJoin: false,
					status: null,
					promotionType: type
				})
			).toBe(true);
		});

		test(`join & login & type=${key} & periodTo=nextMonth, custExpiryTime=tomorrow`, () => {
			expect(
				isExpiry({
					periodTo: nextMonth,
					custExpiryTime: tomorrow,
					isLogin: true,
					isJoin: true,
					promotionType: type
				})
			).toBe(false);
		});

		test(`join & login & type=${key} & periodTo=yesterday, custExpiryTime=tomorrow`, () => {
			let result =
				type === defPromotionType.rebate ||
				type === defPromotionType.cashback;
			expect(
				isExpiry({
					periodTo: yesterday,
					custExpiryTime: tomorrow,
					isLogin: true,
					isJoin: true,
					promotionType: type
				})
			).toBe(result);
		});

		test(`join & login & type=${key} & periodTo=yesterday, custExpiryTime=yesterday`, () => {
			expect(
				isExpiry({
					periodTo: yesterday,
					custExpiryTime: yesterday,
					isLogin: true,
					isJoin: true,
					status: defPromoStatus.TransferOut,
					promotionType: type
				})
			).toBe(true);
		});
	});
});

describe("isNew", () => {
	test("started 1 days ago", () => {
		expect(isNew({ periodFrom: moment().add(-1, "days").unix() })).toBe(
			true
		);
	});

	test("started 13 days ago", () => {
		expect(isNew({ periodFrom: moment().add(-13, "days").unix() })).toBe(
			true
		);
	});

	test("started 14 days ago", () => {
		expect(isNew({ periodFrom: moment().add(-14, "days").unix() })).toBe(
			true
		);
	});

	test("started 15 days ago", () => {
		expect(isNew({ periodFrom: moment().add(-15, "days").unix() })).toBe(
			false
		);
	});
});

describe("isClaimed", () => {
	Object.keys(defPromoStatus).forEach(key => {
		let status = defPromoStatus[key];
		test(`join, status=${key}`, () => {
			expect(isClaimed({ isJoin: true, status })).toBe(true);
		});

		test(`not join, status=${key}`, () => {
			let result =
				status === defPromoStatus.running ||
				status === defPromoStatus.TransferOut;
			expect(isClaimed({ isJoin: false, status })).toBe(result);
		});
	});
});
