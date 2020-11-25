import remainTime from "../../../lib/common/remainTime";
import { defPromoStatus, defPromotionType } from "../../../lib/common/def";
import moment from "moment";

describe("remainTime", () => {
	const moreThan30DaysFormat = moment()
		.add(50, "days")
		.add(-1, "hours")
		.unix();
	const moreThan30Days = moment().add(50, "days").add(-1, "hours");
	const i18n = {
		lbl_Days: "Days",
		lbl_Hours: "Hours"
	};

	test("not join && not expired: 49 days 22 hour", () => {
		const promotionInfo = {
			isJoin: false,
			status: null,
			custExpiryTime: null,
			periodTo: moreThan30DaysFormat,
			promotionType: defPromotionType.firstDeposit
		};

		expect(remainTime({ promotionInfo, i18n, isLogin: false })).toBe(
			`49 ${i18n.lbl_Days} 22 ${i18n.lbl_Hours}`
		);
	});

	test("join && not expired: 49 days 22 hour", () => {
		const promotionInfo = {
			isJoin: true,
			status: defPromoStatus.running,
			custExpiryTime: moreThan30Days,
			periodTo: moreThan30DaysFormat,
			promotionType: defPromotionType.firstDeposit
		};

		expect(remainTime({ promotionInfo, i18n, isLogin: true })).toBe(
			`49 ${i18n.lbl_Days} 22 ${i18n.lbl_Hours}`
		);
	});

	const yesterdayFormat = moment().add(-1, "days").unix();
	const yesterday = moment().add(-1, "days");
	test("join && expired: -", () => {
		const promotionInfo = {
			periodTo: yesterdayFormat,
			custExpiryTime: yesterday,
			isJoin: true,
			status: defPromoStatus.TransferOut,
			promotionType: defPromotionType.cashback
		};

		expect(remainTime({ promotionInfo, i18n, isLogin: true })).toBe(`-`);
	});

	test("not join && expired: -", () => {
		const promotionInfo = {
			isJoin: false,
			status: null,
			custExpiryTime: yesterday,
			periodTo: yesterdayFormat,
			promotionType: defPromotionType.firstDeposit
		};

		expect(remainTime({ promotionInfo, i18n, isLogin: false })).toBe(`-`);
	});
});
