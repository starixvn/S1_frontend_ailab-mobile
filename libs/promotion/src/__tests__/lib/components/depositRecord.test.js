import React from "react";
import DepositRecord from "../../../lib/components/depositRecord";
import { defPromotionType } from "../../../lib/common/def";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("DepositRecord", () => {
	test("should render MultipleRecord, type is reDeposit", () => {
		const fakeData = {
			i18n: {
				lbl_ViewAll: "ViewAllButton"
			},
			promotionInfo: {
				canJoin: true,
				isJoin: false,
				promotionType: defPromotionType.reDeposit,
				depositAmount: 1234,
				currencyId: 4,
				refList: [
					{ depositId: "DD0001", amount: 200 },
					{ depositId: "DD0002", amount: 300 },
					{ depositId: "DD0003", amount: 1000 }
				]
			}
		};

		const { getByText } = render(<DepositRecord {...fakeData} />);
		expect(getByText(fakeData.i18n.lbl_ViewAll)).toBeInTheDocument();
	});

	test("should render singleRecord, type is firstDeposit", () => {
		const fakeData = {
			i18n: {
				lbl_ViewAll: "ViewAllButton"
			},
			promotionInfo: {
				canJoin: true,
				isJoin: false,
				promotionType: defPromotionType.firstDeposit,
				depositAmount: 1234,
				currencyId: 4,
				depositId: "DD1234"
			}
		};

		const { queryByText } = render(<DepositRecord {...fakeData} />);
		expect(queryByText(fakeData.i18n.lbl_ViewAll)).not.toBeInTheDocument();
	});

	test("should render nothing, canJoin=false, isJoin=false", () => {
		const fakeData = {
			promotionInfo: {
				i18n: {},
				canJoin: false,
				isJoin: false,
				promotionType: defPromotionType.firstDeposit,
				depositAmount: 1234,
				currencyId: 4,
				depositId: "DD1234"
			}
		};

		const { container } = render(<DepositRecord {...fakeData} />);

		expect(container.innerHTML).toBe("");
	});

	test("should render nothing, canJoin=false, isJoin=true", () => {
		const fakeData = {
			promotionInfo: {
				i18n: {},
				canJoin: false,
				isJoin: true,
				promotionType: defPromotionType.firstDeposit,
				depositAmount: 1234,
				currencyId: 4,
				depositId: "DD1234"
			}
		};

		const { container } = render(<DepositRecord {...fakeData} />);

		expect(container.innerHTML).toBe("");
	});
});
