import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom";
import AddBankPanel from "../bankInfo.add";
import api from "../../../service/api";

const i18n = {
	msg_EnterRealName: "Please enter your real name.",
	msg_ConfirmRealNameAlert:
		"To ensure all transations correct, please make sure your real name is same with your bank account name",
	msg_NeedAccountNo: "Need Account Number"
};

describe("Add Bank Panel", () => {
	const fakeData = {
		setCurrentPanel: jest.fn(),
		i18n,
		setPopBox: jest.fn(),
		GetCustBankInfo: jest.fn(),
		setLoading: jest.fn()
	};
	let mockGetBankInfoSysListApi;
	let container;

	beforeEach(async () => {
		mockGetBankInfoSysListApi = jest.spyOn(
			api.payment,
			"GetBankInfoSysList"
		);
		mockGetBankInfoSysListApi.mockImplementation(() =>
			Promise.resolve({
				data: {
					data: [
						{
							sysId: 35,
							bankCode: "HLB",
							bankName: "Hong Leong Bank Berhad",
							bankLogo: "HLB.png",
							bankSite:
								"https://s.hongleongconnect.my/rib/app/fo/login",
							minAmount: 100,
							maxAmount: 100000,
							status: 1
						},
						{
							sysId: 34,
							bankCode: "RHB",
							bankName: "RHB Banking Group",
							bankLogo: "RHB.png",
							bankSite:
								"https://logon.rhb.com.my/lgn_default.aspx?usercontrol=Login/lgn_first_time_enrol_card_sel",
							minAmount: 100,
							maxAmount: 1000,
							status: 1
						}
					],
					errorCode: 0,
					message: null,
					rawErrorCode: "",
					rawMessage: ""
				}
			})
		);

		await act(async () => {
			container = render(<AddBankPanel {...fakeData} />);
		});
	});

	test("should have RealName input if not accepting account name from props", () => {
		const [inputBox] = container.getAllByTestId("RealName_ipt");
		expect(inputBox).toBeVisible();
	});

	test("click BankList dropdown", () => {
		const [dropdown] = container.getAllByTestId("bankList");
		const button = dropdown.querySelector(".dropdown");
		const dropdownContainer = dropdown.querySelector(".dropdown-container");

		fireEvent.click(button);
		expect(button).toHaveClass("dropdownbank");
		expect(dropdownContainer).toHaveClass("active");

		fireEvent.click(button);
		expect(button).not.toHaveClass("dropdownbank");
		expect(dropdownContainer).not.toHaveClass("active");
	});

	test("edit RealName input", () => {
		const input = container.getByTestId("RealName_ipt");
		const tip = container.getByTestId("RealName_msg");

		fireEvent.focus(input);
		fireEvent.blur(input);
		expect(input).toHaveValue("");
		expect(input.parentNode.querySelector(".icon-errormark")).toBeVisible();
		expect(tip).toHaveTextContent("Please enter your real name.");

		fireEvent.change(input, { target: { value: "qatest" } });
		fireEvent.blur(input);
		expect(input).toHaveValue("qatest");
		expect(input.parentNode.querySelector(".icon-checkmark")).toBeVisible();
		expect(tip).toBeEmptyDOMElement();
	});

	test("click RealName input info", () => {
		const [infoBtn] = container.getAllByTestId("showTipBtn");
		const [inputInfo] = container.getAllByTestId("inputInfo");

		expect(inputInfo).toHaveTextContent(
			"To ensure all transations correct, please make sure your real name is same with your bank account name"
		);

		fireEvent.click(infoBtn);
		expect(inputInfo).toHaveClass("active");

		fireEvent.click(infoBtn);
		expect(inputInfo).not.toHaveClass("active");
	});

	test("edit BankAccount input", () => {
		const input = container.getByTestId("BankAccount_ipt");
		const tip = container.getByTestId("BankAccount_msg");

		fireEvent.focus(input);
		fireEvent.blur(input);
		expect(input).toHaveValue("");
		expect(input.parentNode.querySelector(".icon-errormark")).toBeVisible();
		expect(tip).toHaveTextContent("Need Account Number");

		fireEvent.change(input, { target: { value: 65412356431 } });
		fireEvent.blur(input);
		expect(input).toHaveValue("65412356431");
		expect(input.parentNode.querySelector(".icon-checkmark")).toBeVisible();
		expect(tip).toBeEmptyDOMElement();
	});

	test("click BankAccount input info", () => {
		const [, infoBtn] = container.getAllByTestId("showTipBtn");
		const [, inputInfo] = container.getAllByTestId("inputInfo");

		expect(inputInfo).toHaveTextContent("Need Account Number");

		fireEvent.click(infoBtn);
		expect(inputInfo).toHaveClass("active");

		fireEvent.click(infoBtn);
		expect(inputInfo).not.toHaveClass("active");
	});

	test("click cancel button", () => {
		const cancelBtn = container
			.getAllByTestId("btnGroup")[0]
			.querySelector(".white");

		fireEvent.click(cancelBtn);
		expect(fakeData.setCurrentPanel).toHaveBeenCalled();
	});

	test("click submit button", async () => {
		const submitBtn = container
			.getAllByTestId("btnGroup")[0]
			.querySelector(".orange");
		const realNameInput = container.getByTestId("RealName_ipt");
		const realNameTip = container.getByTestId("RealName_msg");
		const bankAccountInput = container.getByTestId("BankAccount_ipt");
		const bankAccountTip = container.getByTestId("BankAccount_msg");

		fireEvent.click(submitBtn);
		expect(
			realNameInput.parentNode.querySelector(".icon-errormark")
		).toBeVisible();
		expect(realNameInput.parentNode).toHaveClass("error");
		expect(realNameTip).toHaveTextContent("Please enter your real name.");

		fireEvent.change(realNameInput, { target: { value: "qatest" } });
		fireEvent.click(submitBtn);
		expect(
			realNameInput.parentNode.querySelector(".icon-checkmark")
		).toBeVisible();
		expect(realNameTip).toBeEmptyDOMElement();
		expect(
			bankAccountInput.parentNode.querySelector(".icon-errormark")
		).toBeVisible();
		expect(bankAccountInput.parentNode).toHaveClass("error");
		expect(bankAccountTip).toHaveTextContent("Need Account Number");

		fireEvent.change(bankAccountInput, { target: { value: 654213546 } });
		fireEvent.click(submitBtn);
		expect(
			bankAccountInput.parentNode.querySelector(".icon-checkmark")
		).toBeVisible();
		expect(bankAccountTip).toBeEmptyDOMElement();
		expect(fakeData.setPopBox).toHaveBeenCalled();
	});
});

describe("Add Bank Panel With RealName Input", () => {
	test("renders correctly", async () => {
		let tree;
		const mockGetBankInfoSysListApi = jest.spyOn(
			api.payment,
			"GetBankInfoSysList"
		);
		mockGetBankInfoSysListApi.mockImplementation(() =>
			Promise.resolve({
				data: {
					data: [
						{
							sysId: 35,
							bankCode: "HLB",
							bankName: "Hong Leong Bank Berhad",
							bankLogo: "HLB.png",
							bankSite:
								"https://s.hongleongconnect.my/rib/app/fo/login",
							minAmount: 100,
							maxAmount: 100000,
							status: 1
						},
						{
							sysId: 34,
							bankCode: "RHB",
							bankName: "RHB Banking Group",
							bankLogo: "RHB.png",
							bankSite:
								"https://logon.rhb.com.my/lgn_default.aspx?usercontrol=Login/lgn_first_time_enrol_card_sel",
							minAmount: 100,
							maxAmount: 1000,
							status: 1
						}
					],
					errorCode: 0,
					message: null,
					rawErrorCode: "",
					rawMessage: ""
				}
			})
		);

		await renderer.act(async () => {
			tree = renderer.create(
				<AddBankPanel
					setCurrentPanel={jest.fn()}
					i18n={i18n}
					setPopBox={jest.fn()}
					GetCustBankInfo={jest.fn()}
					setLoading={jest.fn()}
				/>
			);
		});

		expect(tree.toJSON()).toMatchSnapshot();
	});
});

describe("Add Bank Panel With RealName Input", () => {
	test("renders correctly", async () => {
		let tree;
		const mockGetBankInfoSysListApi = jest.spyOn(
			api.payment,
			"GetBankInfoSysList"
		);
		mockGetBankInfoSysListApi.mockImplementation(() =>
			Promise.resolve({
				data: {
					data: [
						{
							sysId: 35,
							bankCode: "HLB",
							bankName: "Hong Leong Bank Berhad",
							bankLogo: "HLB.png",
							bankSite:
								"https://s.hongleongconnect.my/rib/app/fo/login",
							minAmount: 100,
							maxAmount: 100000,
							status: 1
						},
						{
							sysId: 34,
							bankCode: "RHB",
							bankName: "RHB Banking Group",
							bankLogo: "RHB.png",
							bankSite:
								"https://logon.rhb.com.my/lgn_default.aspx?usercontrol=Login/lgn_first_time_enrol_card_sel",
							minAmount: 100,
							maxAmount: 1000,
							status: 1
						}
					],
					errorCode: 0,
					message: null,
					rawErrorCode: "",
					rawMessage: ""
				}
			})
		);

		await renderer.act(async () => {
			tree = renderer.create(
				<AddBankPanel
					accountName="qaq"
					setCurrentPanel={jest.fn()}
					i18n={i18n}
					setPopBox={jest.fn()}
					GetCustBankInfo={jest.fn()}
					setLoading={jest.fn()}
				/>
			);
		});

		expect(tree.toJSON()).toMatchSnapshot();
	});
});
