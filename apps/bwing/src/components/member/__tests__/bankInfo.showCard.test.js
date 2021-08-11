import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import renderer from "react-test-renderer";
import { popBoxContext } from "../../common/context";
import ShowAccountPanel from "../bankInfo.showCard";

const popBox = { setPopBox: jest.fn() };
const fakeData = {
	i18n: {
		lbl_BankAccount: "Bank Account",
		lbl_NumberOfBankAccounts: "Number of bank account"
	},
	accountName: "qaq",
	reload: jest.fn()
};

describe("Show accout panel have no account", () => {
	let container;
	let showAccountPanel;

	beforeEach(() => {
		container = render(
			<ShowAccountPanel {...fakeData} custBankList={[]} />
		);
		[showAccountPanel] = container.getAllByTestId("showCardPanel");
	});

	test("should have correct title", () => {
		const [title] = showAccountPanel.getElementsByTagName("h1");
		expect(title).toHaveTextContent("Bank Account".toUpperCase());
	});

	test("should have 0 in number of bank account", () => {
		const [numberOfAccount] = showAccountPanel.getElementsByTagName("p");
		expect(numberOfAccount).toHaveTextContent(
			"Number of bank account: 0/3"
		);
	});

	test("renders correctly", () => {
		const tree = renderer
			.create(<ShowAccountPanel {...fakeData} custBankList={[]} />)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});

describe("Show accout panel have two accounts", () => {
	let container;
	let showAccountPanel;

	beforeEach(() => {
		container = render(
			<popBoxContext.Provider value={popBox}>
				<ShowAccountPanel
					{...fakeData}
					custBankList={[
						{
							bankName: "Sacom Bank",
							bankLogo: "SAC.png",
							bankSite:
								"https://www.sacombank.com.vn/Pages/default.aspx",
							sysId: 4,
							accountNo: "346457568"
						},
						{
							bankName: "Techcom Bank",
							bankLogo: "TCB.png",
							bankSite:
								"https://ib.techcombank.com.vn/servlet/BrowserServlet",
							sysId: 5,
							accountNo: "23543647"
						}
					]}
				/>
			</popBoxContext.Provider>
		);
		[showAccountPanel] = container.getAllByTestId("showCardPanel");
	});

	test("should have 2 in number of bank account", () => {
		const [numberOfAccount] = showAccountPanel.getElementsByTagName("p");
		expect(numberOfAccount).toHaveTextContent(
			"Number of bank account: 2/3"
		);
	});

	test("should show correct account list", () => {
		const [account1, account2] = container.getAllByTestId("account");

		expect(account1.querySelector("p")).toHaveTextContent("346457568");
		expect(account2.querySelector("p")).toHaveTextContent("23543647");
	});

	test("should open pop box after click delete button", () => {
		const [account] = container.getAllByTestId("account");
		const [deleteBtn] = account.getElementsByTagName("button");

		fireEvent.click(deleteBtn);
		expect(popBox.setPopBox).toHaveBeenCalled();
	});

	test("renders correctly", () => {
		const tree = renderer
			.create(
				<popBoxContext.Provider value={popBox}>
					<ShowAccountPanel
						{...fakeData}
						custBankList={[
							{
								bankName: "Sacom Bank",
								bankLogo: "SAC.png",
								bankSite:
									"https://www.sacombank.com.vn/Pages/default.aspx",
								sysId: 4,
								accountNo: "346457568"
							},
							{
								bankName: "Techcom Bank",
								bankLogo: "TCB.png",
								bankSite:
									"https://ib.techcombank.com.vn/servlet/BrowserServlet",
								sysId: 5,
								accountNo: "23543647"
							}
						]}
					/>
				</popBoxContext.Provider>
			)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
