import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent, waitFor } from "@testing-library/react";
import renderer from "react-test-renderer";
import AddCardPanel from "../bankInfo.addCard";
import { defStep } from "../bankInfo.step";
import * as api_accountStrict from "../../../service/api/accountStrict";

const fakeData = {
	i18n: {
		lbl_Step_SelectBank: "Select Bank",
		lbl_AddBankAccount: "Add New Bank Account",
		lbl_EnterAccountNumber: "Enter Account Number",
		msg_EnterRealName: "Please enter your real name.",
		lbl_BankNumber: "Account Number",
		msg_NeedAccountNo: "Need Account Number",
		lbl_add_bank_submit: "Submit",
		lbl_Please_input_your_real_name_as_in_your_ID:
			"Please input your real name as in your ID. Your account name should be the same with your profile name."
	},
	setStep: jest.fn(),
	siteBankList: [
		{
			sysId: 1,
			currencyId: 51,
			bankCode: "ACB",
			bankName: "Asia Commercial Bank",
			bankLogo: "ACB.png",
			bankSite: "https://online.acb.com.vn/acbib"
		},
		{
			sysId: 2,
			currencyId: 51,
			bankCode: "BIDV",
			bankName: "BIDV",
			bankLogo: "BIDV.png",
			bankSite: "https://www.bidv.com.vn/"
		}
	],
	bankSelectedIdx: 0,
	setBankSelectedIdx: jest.fn(),
	GetCustBankInfo: jest.fn(),
	GetBankInfoSysList: jest.fn()
};

describe("Init panel", () => {
	let container;

	beforeEach(() => {
		container = render(
			<AddCardPanel {...fakeData} step={defStep.initPanel} />
		);
	});

	test("should have add account button", () => {
		const [addAccountBtn] = container.getAllByTestId("addAccountBtn");

		expect(
			addAccountBtn.getElementsByTagName("button")[0]
		).toHaveTextContent("Add New Bank Account");
	});

	test("should call GetBankInfoSysList after click add account button", () => {
		const [addAccountBtn] = container.getAllByTestId("addAccountBtn");

		fireEvent.click(addAccountBtn.getElementsByTagName("button")[0]);
		expect(fakeData.GetBankInfoSysList).toHaveBeenCalled();
	});

	test("renders correctly", () => {
		const tree = renderer
			.create(<AddCardPanel {...fakeData} step={defStep.initPanel} />)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});

describe("Select bank panel", () => {
	let container;
	let bankPanel;
	let bankList;

	beforeEach(() => {
		container = render(
			<AddCardPanel {...fakeData} step={defStep.bankPanel} />
		);
		[bankPanel] = container.getAllByTestId("bankPanel");
		bankList = bankPanel.querySelector(".depositImgArea");
	});

	test("should have correct title", () => {
		expect(bankPanel.getElementsByTagName("h1")[0]).toHaveTextContent(
			"Select Bank".toUpperCase()
		);
	});

	test("should show right bank list", () => {
		const [bank1Img, bank2Img] = bankList.getElementsByTagName("img");

		expect(bankList).not.toBeEmptyDOMElement();
		expect(bank1Img).toHaveAttribute("alt", "Asia Commercial Bank");
		expect(bank2Img).toHaveAttribute("alt", "BIDV");
	});

	test("should set step & step bank selected idx after click bank img", () => {
		const [bankImg] = bankList.getElementsByTagName("img");

		fireEvent.click(bankImg);
		expect(fakeData.setBankSelectedIdx).toHaveBeenCalled();
		expect(fakeData.setStep).toHaveBeenCalled();
	});

	test("should call setStep after click back button", () => {
		const [backBtn] = container.getAllByTestId("backBtn");

		fireEvent.click(backBtn.getElementsByTagName("button")[0]);
		expect(fakeData.setStep).toHaveBeenCalled();
	});

	test("renders correctly", () => {
		const tree = renderer
			.create(<AddCardPanel {...fakeData} step={defStep.bankPanel} />)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});

describe("Add account panel", () => {
	let container;
	let accountPanel;

	beforeEach(() => {
		container = render(
			<AddCardPanel {...fakeData} step={defStep.accountPanel} />
		);
		[accountPanel] = container.getAllByTestId("accountPanel");
	});

	test("should have account name input & account input & submit button", () => {
		expect(container.getAllByTestId("accountName_ipt")[0]).toBeVisible();
		expect(container.getAllByTestId("bankAccount_ipt")[0]).toBeVisible();
		expect(
			accountPanel.getElementsByTagName("button")[0]
		).toHaveTextContent("Submit".toUpperCase());
	});

	test("edit account name input", () => {
		const [input] = container.getAllByTestId("accountName_ipt");

		fireEvent.focus(input);
		fireEvent.blur(input);
		expect(input).toHaveValue("");
		expect(input.parentNode.querySelector(".icon-cross")).toBeVisible();
		expect(container.getAllByTestId("accountName_msg")[0]).toBeVisible();
		expect(
			container.getAllByTestId("accountName_msg")[0]
		).toHaveTextContent("Please enter your real name.");

		fireEvent.change(input, { target: { value: "qatest" } });
		fireEvent.blur(input);
		expect(input).toHaveValue("qatest");
		expect(input.parentNode.querySelector(".icon-checkmark")).toBeVisible();
	});

	test("click account name input info", () => {
		const [infoBtn] = container.getAllByTestId("showTipBtn");

		fireEvent.click(infoBtn);
		expect(
			container.getAllByTestId("accountName_msg")[0]
		).toHaveTextContent(
			"Please input your real name as in your ID. Your account name should be the same with your profile name."
		);
	});

	test("edit bank account input", () => {
		const [input] = container.getAllByTestId("bankAccount_ipt");

		fireEvent.focus(input);
		fireEvent.blur(input);
		expect(input).toHaveValue("");
		expect(input.parentNode.querySelector(".icon-cross")).toBeVisible();
		expect(container.getAllByTestId("bankAccount_msg")[0]).toBeVisible();
		expect(
			container.getAllByTestId("bankAccount_msg")[0]
		).toHaveTextContent("Need Account Number");

		fireEvent.change(input, { target: { value: 65412356431 } });
		fireEvent.blur(input);
		expect(input).toHaveValue("65412356431");
		expect(input.parentNode.querySelector(".icon-checkmark")).toBeVisible();
	});

	test("click bank account input info", () => {
		const [, infoBtn] = container.getAllByTestId("showTipBtn");

		fireEvent.click(infoBtn);
		expect(
			container.getAllByTestId("bankAccount_msg")[0]
		).toHaveTextContent("Enter Account Number");
	});

	test("should call setStep after click back button", () => {
		const [backBtn] = container.getAllByTestId("backBtn");

		fireEvent.click(backBtn.getElementsByTagName("button")[0]);
		expect(fakeData.setStep).toHaveBeenCalled();
	});

	test("click submit button should call GetCustBankInfo & setStep", async () => {
		const [submitBtn] = accountPanel.getElementsByTagName("button");
		const [accountNameInput] = container.getAllByTestId("accountName_ipt");
		const [accountInput] = container.getAllByTestId("bankAccount_ipt");
		const mockSetCustBankInfoApi = jest.spyOn(
			api_accountStrict,
			"api_SetCustBankInfo"
		);
		mockSetCustBankInfoApi.mockImplementation(() =>
			Promise.resolve({
				data: {
					errorCode: 0
				}
			})
		);
		await waitFor(() => {
			fireEvent.click(submitBtn);
			expect(
				accountNameInput.parentNode.querySelector(".icon-cross")
			).toBeVisible();
			expect(
				container.getAllByTestId("accountName_msg")[0]
			).toHaveTextContent("Please enter your real name.");
			expect(
				accountInput.parentNode.querySelector(".icon-cross")
			).toBeVisible();
			expect(
				container.getAllByTestId("bankAccount_msg")[0]
			).toHaveTextContent("Need Account Number");
			fireEvent.change(accountNameInput, { target: { value: "qatest" } });
			fireEvent.change(accountInput, { target: { value: 654213546 } });
			fireEvent.click(submitBtn);

			expect(fakeData.GetCustBankInfo).toHaveBeenCalled();
			expect(fakeData.setStep).toHaveBeenCalled();
		});
	});

	test("renders correctly", () => {
		const tree = renderer
			.create(<AddCardPanel {...fakeData} step={defStep.accountPanel} />)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
