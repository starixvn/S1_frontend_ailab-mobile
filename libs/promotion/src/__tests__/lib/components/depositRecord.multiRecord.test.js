import React from "react";
import MultiRecord, {
	Content,
	Record
} from "../../../lib/components/depositRecord.multiRecord";
import renderer from "react-test-renderer";
import { render, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("MultiRecord", () => {
	afterEach(cleanup);

	test(`renders correctly`, () => {
		const fakeData = {
			refList: [
				{ depositId: "DD0001", amount: 200 },
				{ depositId: "DD0002", amount: 300 },
				{ depositId: "DD0003", amount: 1000 }
			],
			depositAmount: 1500,
			i18n: {}
		};

		const tree = renderer.create(<MultiRecord {...fakeData} />).toJSON();
		expect(tree).toMatchSnapshot();
	});

	test("have refList", () => {
		const fakeData = {
			refList: [
				{ depositId: "DD0001", amount: 200 },
				{ depositId: "DD0002", amount: 300 },
				{ depositId: "DD0003", amount: 1000 }
			],
			depositAmount: 1500,
			i18n: {}
		};

		const { container } = render(<MultiRecord {...fakeData} />);
		expect(container.innerHTML).not.toBe("");
	});

	test("no refList, refList is null", () => {
		const fakeData = {
			refList: null,
			depositAmount: 0,
			i18n: {}
		};

		const { container } = render(<MultiRecord {...fakeData} />);
		expect(container.innerHTML).toBe("");
	});

	test("no refList, refList is empty array", () => {
		const fakeData = {
			refList: [],
			depositAmount: 0,
			i18n: {}
		};

		const { container } = render(<MultiRecord {...fakeData} />);
		expect(container.innerHTML).toBe("");
	});
});

describe("MultiRecord > Content", () => {
	afterEach(cleanup);
	test("Click View All", () => {
		const mockClickOpen = jest.fn(isOpen => isOpen);
		const fakeData = {
			refList: [],
			depositAmount: 0,
			i18n: { lbl_ViewAll: "ViewAllButton" },
			handleOpen: mockClickOpen,
			isOpen: true
		};
		const { getByText } = render(<Content {...fakeData}></Content>);

		let viewAllBtn = getByText(fakeData.i18n.lbl_ViewAll);
		fireEvent.click(viewAllBtn);
		expect(mockClickOpen.mock.calls[0][0]).toBe(!fakeData.isOpen);
		expect(viewAllBtn.firstElementChild).toHaveClass("open");
	});
});

describe("MultiRecord > Record", () => {
	const fakeData = {
		depositId: "DD0001",
		amount: "12345"
	};

	test("when click view all", () => {
		const fakeData = {
			depositId: "DD0001",
			amount: "12345"
		};
		const { container, getByText } = render(
			<Record isOpen={true} {...fakeData} />
		);

		expect(getByText(fakeData.depositId)).toBeInTheDocument();
		expect(container.firstChild).toHaveClass("open");
	});

	test("when not click view all", () => {
		const { container, getByText } = render(
			<Record isOpen={false} {...fakeData} />
		);

		expect(getByText(fakeData.depositId)).toBeInTheDocument();
		expect(container.firstChild).not.toHaveClass("open");
	});

	test(`when click view all, renders correctly`, () => {
		const tree = renderer
			.create(<Record isOpen={true} {...fakeData} />)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});

	test(`when not click view all, renders correctly`, () => {
		const tree = renderer
			.create(<Record isOpen={false} {...fakeData} />)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
