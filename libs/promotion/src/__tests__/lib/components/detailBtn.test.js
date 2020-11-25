import React from "react";
import Wrapper from "../../../lib/common/wrapper";
import DetailBtn from "../../../lib/components/detailBtn";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("DetailBtn", () => {
	test("render correctly", () => {
		const fakeData = {
			path: { promotionInfo: { root: "promotionInfo" } },
			bonusCode: "TestBonusCode",
			DisplayText: "DisplayText"
		};
		const { container, getByText } = render(
			<Wrapper path={fakeData.path}>
				<DetailBtn
					bonusCode={fakeData.bonusCode}
					displayText_Detail={fakeData.DisplayText}
				/>
			</Wrapper>
		);

		expect(container.firstChild).toHaveAttribute(
			"href",
			`/${fakeData.path.promotionInfo.root}?BonusCode=${fakeData.bonusCode}`
		);
		expect(getByText(fakeData.DisplayText)).toBeInTheDocument();
	});
});
