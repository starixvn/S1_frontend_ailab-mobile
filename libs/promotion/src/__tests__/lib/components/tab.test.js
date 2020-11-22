import React from "react";
import renderer from "react-test-renderer";
import { render, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import Tab, { TabBtn } from "../../../lib/components/tab";
import { defTabs } from "../../../lib/common/def";

describe("tab", () => {
	afterEach(cleanup);
	let i18n = {};
	Object.values(defTabs).forEach(v => {
		i18n[v.displayKey] = v.displayKey;
	});

	Object.values(defTabs).forEach(v => {
		let key = v.key;

		const mockOnClickTab = jest.fn(key => key);
		test(`renders correctly`, () => {
			const tree = renderer
				.create(
					<Tab i18n={i18n} tab={key} onClickTab={mockOnClickTab} />
				)
				.toJSON();
			expect(tree).toMatchSnapshot();
		});

		test(`click tab: ${key}`, () => {
			const { getByText } = render(
				<Tab i18n={i18n} tab={key} onClickTab={mockOnClickTab} />
			);
			let displayKey = v.displayKey;
			let getTab = getByText(displayKey);
			fireEvent.click(getTab);
			expect(mockOnClickTab.mock.calls[0][0]).toBe(key);
		});
	});
});

describe("tab > tabBtn", () => {
	test("selected button display correctly", () => {
		let displayText = "displayText";

		const { container, getByText } = render(
			<TabBtn
				onClickTab={key => key}
				isOpen={true}
				displayText="displayText"
			/>
		);

		expect(getByText(displayText)).toBeInTheDocument();
		expect(container.firstChild).toHaveClass("open");
	});

	test("unselected button display correctly", () => {
		let displayText = "displayText";

		const { container, getByText } = render(
			<TabBtn
				onClickTab={key => key}
				isOpen={false}
				displayText="displayText"
			/>
		);

		expect(getByText(displayText)).toBeInTheDocument();
		expect(container.firstChild).not.toHaveClass("open");
	});
});
