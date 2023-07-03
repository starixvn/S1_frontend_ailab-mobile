import React from "react";
import { render, fireEvent } from "@testing-library/react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom";
import Dropdown from "../dropdown.profile";
import { monthOptions } from "../profile.detail.def";

const fakeData = {
	colName: "bday_month",
	onSelectItem: jest.fn(),
	selectedIdx: 0,
	mainKey: "profile-month",
	i18n: {
		lbl_Month1: "JAN",
		lbl_Month2: "FEB",
		lbl_Month3: "MAR",
		lbl_Month4: "APR",
		lbl_Month5: "MAY",
		lbl_Month6: "JUN",
		lbl_Month7: "JUL",
		lbl_Month8: "AUG",
		lbl_Month9: "SEP",
		lbl_Month10: "OCT",
		lbl_Month11: "NOV",
		lbl_Month12: "DEC"
	},
	options: monthOptions,
	hideInfo: true,
	birthDayIcon: true,
	hideTip: true,
	testAttr: "test"
};

describe("Month dropdown", () => {
	let container;
	let dropdown;

	beforeEach(() => {
		container = render(<Dropdown {...fakeData} />);
		[dropdown] = container.getAllByTestId("test_dropdown");
	});

	test("should have birth icon", () => {
		const birthIcon = dropdown.querySelector(".icon-cake");
		expect(birthIcon).toBeVisible();
	});

	test("should have correct init value", () => {
		const [selectedVal] = dropdown.getElementsByTagName("span");
		expect(selectedVal).toHaveTextContent("JAN");
	});

	test("should show dropdown list when click dropdown", () => {
		const button = dropdown.querySelector(".dropdown");
		const dropdownContainer = dropdown.querySelector(".dropdown-container");

		fireEvent.click(button);
		expect(dropdownContainer).toHaveClass("active");

		fireEvent.click(button);
		expect(dropdownContainer).not.toHaveClass("active");
	});

	test("should call onSelectItem function when click option", () => {
		const button = dropdown.querySelector(".dropdown");
		const [option] = dropdown.querySelectorAll(".dropdown-item");

		fireEvent.click(button);
		fireEvent.click(option);
		expect(fakeData.onSelectItem).toHaveBeenCalled();
	});

	test("renders correctly", () => {
		const tree = renderer.create(<Dropdown {...fakeData} />).toJSON();
		expect(tree).toMatchSnapshot();
	});
});
