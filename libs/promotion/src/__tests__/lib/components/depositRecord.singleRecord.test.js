import React from "react";
import SingleRecord from "../../../lib/components/depositRecord.singleRecord";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { defPromotionType } from "../../../lib/common/def";

describe("SingleRecord", () => {
	const fakeData = {
		depositId: "DD1234",
		depositAmount: 1234,
		currencyId: 4
	};

	const i18n = {
		lbl_ID: "ID",
		lbl_DepositAmount: "DepositAmount",
		[`lbl_Currency_${fakeData.currencyId}`]: "MYR"
	};

	Object.keys(defPromotionType).forEach(key => {
		let type = defPromotionType[key];

		test(`type=${key}, can not join & not join yet`, () => {
			const { container } = render(
				<SingleRecord
					{...fakeData}
					i18n={i18n}
					canJoin={false}
					isJoin={false}
					promotionType={type}
				/>
			);
			expect(container.innerHTML).toBe("");
		});

		test(`type=${key}, canJoin & not join yet`, () => {
			const { container, getByText } = render(
				<SingleRecord
					{...fakeData}
					i18n={i18n}
					canJoin={true}
					isJoin={false}
					promotionType={type}
				/>
			);

			if (
				type === defPromotionType.reDeposit ||
				type === defPromotionType.firstDeposit
			) {
				expect(container.innerHTML).not.toBe("");
				expect(getByText(fakeData.depositId)).toBeInTheDocument();
			} else {
				expect(container.innerHTML).toBe("");
			}
		});

		test(`type=${key}, canJoin & join`, () => {
			const { container } = render(
				<SingleRecord
					{...fakeData}
					i18n={i18n}
					canJoin={true}
					isJoin={true}
					promotionType={type}
				/>
			);

			expect(container.innerHTML).toBe("");
		});
	});
});
