import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import BonusWallet from "../profile.wallet.bonus";

describe("Bonus Wallet", () => {
	test("sholld show 100% progress bar when turnover > rollover", () => {
		const fakeData = {
			i18n: {
				lbl_BonusWallet_1: "Casino Bonus Wallet",
				Currency_51: "VND"
			},
			currencyId: 51,
			promoCategoryId: 1,
			bonus: 300,
			turnover: 10000,
			rollover: 100
		};
		const { container } = render(<BonusWallet {...fakeData} />);

		expect(container.querySelector(".percentage")).toHaveTextContent(
			"100%"
		);
		expect(container.querySelector(".progress")).toHaveStyle("width:100%");
		expect(container).toMatchSnapshot();
	});

	test("should show correct percentage when turnover < rollover", () => {
		const fakeData = {
			i18n: {
				lbl_BonusWallet_1: "Casino Bonus Wallet",
				Currency_51: "VND"
			},
			currencyId: 51,
			promoCategoryId: 1,
			bonus: 300,
			turnover: 100,
			rollover: 10000
		};
		const { container } = render(<BonusWallet {...fakeData} />);
		const percentage = (
			(fakeData.turnover / fakeData.rollover) *
			100
		).toFixed(2);

		expect(container.querySelector(".percentage")).toHaveTextContent(
			`${percentage}%`
		);
		expect(container.querySelector(".progress")).toHaveStyle(
			`width:${percentage}%`
		);
		expect(container).toMatchSnapshot();
	});
});
