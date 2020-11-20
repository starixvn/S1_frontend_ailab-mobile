import { isArrayNotEmpty, isExpiry } from "../../../lib/common/common";
import { defPromoStatus, defPromotionType } from "../../../lib/common/def";
import moment from "moment";

describe("isArrayNotEmpty", () => {
	test("Test can return expect value", () => {
		expect(isArrayNotEmpty([])).toBe(false);
		expect(isArrayNotEmpty("testdata")).toBe(false);
		expect(isArrayNotEmpty({ data: "test" })).toBe(false);
		expect(isArrayNotEmpty(123)).toBe(false);
		expect(isArrayNotEmpty([1, 2, 3])).toBe(true);
	});
});

describe("isExpiry", () => {
	let nextMonth = moment().add(1, "months");
	let tomorrow = moment().add(1, "days");
	let yesterday = moment().add(-1, "days");
	test("not join & not login", () => {
		Object.values(defPromotionType).forEach(type => {
			expect(
				isExpiry({
					periodTo: yesterday.unix(),
					custExpiryTime: null,
					isLogin: false,
					isJoin: false,
					status: null,
					promotionType: type
				})
			).toBe(true);

			expect(
				isExpiry({
					periodTo: nextMonth.unix(),
					custExpiryTime: null,
					isLogin: false,
					isJoin: false,
					status: null,
					promotionType: type
				})
			).toBe(false);
		});
	});

	test("not join & login", () => {
		Object.values(defPromotionType).forEach(type => {
			expect(
				isExpiry({
					periodTo: yesterday.unix(),
					custExpiryTime: null,
					isLogin: true,
					isJoin: false,
					status: null,
					promotionType: type
				})
			).toBe(true);

			expect(
				isExpiry({
					periodTo: nextMonth.unix(),
					custExpiryTime: null,
					isLogin: true,
					isJoin: false,
					status: null,
					promotionType: type
				})
			).toBe(false);
		});
	});

	test("join & login", () => {
		Object.values(defPromotionType).forEach(type => {
			if (
				type !== defPromotionType.rebate &&
				type !== defPromotionType.cashback
			) {
				expect(
					isExpiry({
						periodTo: nextMonth.unix(),
						custExpiryTime: tomorrow,
						isLogin: true,
						isJoin: true,
						status: defPromoStatus.running,
						promotionType: type
					})
				).toBe(false);

				expect(
					isExpiry({
						periodTo: nextMonth.unix(),
						custExpiryTime: tomorrow,
						isLogin: true,
						isJoin: true,
						status: defPromoStatus.TransferOut,
						promotionType: type
					})
				).toBe(false);

				expect(
					isExpiry({
						periodTo: yesterday.unix(),
						custExpiryTime: tomorrow,
						isLogin: true,
						isJoin: true,
						status: defPromoStatus.running,
						promotionType: type
					})
				).toBe(false);

				expect(
					isExpiry({
						periodTo: yesterday.unix(),
						custExpiryTime: tomorrow,
						isLogin: true,
						isJoin: true,
						status: defPromoStatus.TransferOut,
						promotionType: type
					})
				).toBe(false);
			} else {
				expect(
					isExpiry({
						periodTo: nextMonth.unix(),
						custExpiryTime: tomorrow,
						isLogin: true,
						isJoin: true,
						status: null,
						promotionType: type
					})
				).toBe(false);

				expect(
					isExpiry({
						periodTo: yesterday.unix(),
						custExpiryTime: tomorrow,
						isLogin: true,
						isJoin: true,
						status: null,
						promotionType: type
					})
				).toBe(true);

				expect(
					isExpiry({
						periodTo: yesterday.unix(),
						custExpiryTime: null,
						isLogin: true,
						isJoin: true,
						status: null,
						promotionType: type
					})
				).toBe(true);
			}
		});
	});
});
