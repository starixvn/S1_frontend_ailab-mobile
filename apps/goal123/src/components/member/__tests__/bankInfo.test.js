import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent, waitFor, act } from "@testing-library/react";
import { createHistory, LocationProvider } from "@reach/router";
import renderer from "react-test-renderer";
import {
	i18nContext,
	userInfoContext,
	loadingContext,
	popBoxContext
} from "../../common/context";
import BankInfo from "../bankInfo";
import * as api_account from "../../../service/api/account";
import * as api_payment from "../../../service/api/payment";

const history = createHistory(window);
const userInfo = { isLogin: true, langId: "en" };
const popBox = { setPopBox: jest.fn() };
const i18n = {
	lbl_ContactCSD: "For any request of modification, please contact CSD.",
	lbl_AddNewAccount: "Add New Account",
	lbl_BankAccount: "Bank Account",
	lbl_RealName: "Real Name",
	msg_ConfirmRealNameAlert:
		"To ensure all transations correct, please make sure your real name is same with your bank account name",
	msg_EnterRealName: "Please enter your real name.",
	msg_NeedAccountNo: "Need Account Number",
	lbl_EnterAccountNumber: "Enter Account Number"
};

describe("Bank info never updated before", () => {
	let mockGetCustBankInfoApi;
	let container;

	beforeEach(async () => {
		mockGetCustBankInfoApi = jest.spyOn(api_account, "api_GetCustBankInfo");
		mockGetCustBankInfoApi.mockImplementation(() =>
			Promise.resolve({
				data: {
					data: null,
					errorCode: 0,
					message: null,
					rawErrorCode: "",
					rawMessage: ""
				}
			})
		);

		await act(async () => {
			container = render(
				<LocationProvider history={history}>
					<i18nContext.Provider value={{ i18n }}>
						<userInfoContext.Provider value={{ userInfo }}>
							<loadingContext.Provider
								value={{ setLoading: jest.fn() }}>
								<BankInfo />
							</loadingContext.Provider>
						</userInfoContext.Provider>
					</i18nContext.Provider>
				</LocationProvider>
			);
		});
	});

	test("should have add account button", () => {
		const [addAccountBtn] = container.getAllByTestId("addAccountBtn");
		expect(addAccountBtn).toBeVisible();
	});

	test("should not have account name column", () => {
		const [accountNameCol] = container.getAllByTestId("accountName");
		expect(accountNameCol).toBeEmptyDOMElement();
	});

	test("should have no data in account list", () => {
		const [accountList] = container.getAllByTestId("accountList");
		expect(accountList).toBeEmptyDOMElement();
	});

	test("click add account button should show bank list dropdown & account input", async () => {
		const [addAccountBtn] = container.getAllByTestId("addAccountBtn");
		const mockGetBankInfoSysList = jest.spyOn(
			api_payment,
			"api_GetBankInfoSysList"
		);
		mockGetBankInfoSysList.mockImplementation(() =>
			Promise.resolve({
				data: {
					data: [
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
					errorCode: 0
				}
			})
		);

		await waitFor(() => {
			fireEvent.click(addAccountBtn.querySelector(".orange"));

			expect(addAccountBtn).not.toBeVisible();
			expect(container.getAllByTestId("bankList")[0]).toBeVisible();
			expect(container.getAllByTestId("account_ipt")[0]).toBeVisible();
			expect(container.getAllByTestId("addPanelBtn")[0]).toBeVisible();
		});
	});
});

describe("Bank info has 1 bank account & has account name in user info", () => {
	let mockGetCustBankInfoApi;
	let container;

	beforeEach(async () => {
		mockGetCustBankInfoApi = jest.spyOn(api_account, "api_GetCustBankInfo");
		mockGetCustBankInfoApi.mockImplementation(() =>
			Promise.resolve({
				data: {
					data: {
						accountName: "qqq",
						defAccountNo: null,
						bankInfoDetail: [
							{
								bankName: "Dai A",
								bankLogo: "GAB.png",
								bankSite: null,
								sysId: 115,
								accountNo: "54313215648643"
							}
						],
						uSDTDetail: null
					},
					errorCode: 0,
					message: null,
					rawErrorCode: "",
					rawMessage: ""
				}
			})
		);

		await act(async () => {
			container = render(
				<LocationProvider history={history}>
					<i18nContext.Provider value={{ i18n }}>
						<userInfoContext.Provider
							value={{
								userInfo: { ...userInfo, accountName: "qaq" }
							}}>
							<loadingContext.Provider
								value={{ setLoading: jest.fn() }}>
								<popBoxContext.Provider value={popBox}>
									<BankInfo />
								</popBoxContext.Provider>
							</loadingContext.Provider>
						</userInfoContext.Provider>
					</i18nContext.Provider>
				</LocationProvider>
			);
		});
	});

	test("should show account name & tip", () => {
		const [accountNameCol] = container.getAllByTestId("accountName");
		const [accountNameTip] = container.getAllByTestId("accountNameTip");

		expect(accountNameCol).toBeVisible();
		expect(accountNameCol).toHaveTextContent("qaq");
		expect(accountNameTip).toBeVisible();
		expect(accountNameTip).toHaveTextContent(
			"For any request of modification, please contact CSD."
		);
	});

	test("should show account list small title", () => {
		const [smallTitle] = container.getAllByTestId("accountName");
		expect(smallTitle).toBeVisible();
	});

	test("should not have empty account list", () => {
		const [accountList] = container.getAllByTestId("accountList");
		expect(accountList).not.toBeEmptyDOMElement();
	});

	test("should have right data in account", () => {
		const [account] = container.getAllByTestId("account");

		expect(account.querySelector(".title")).toHaveTextContent("Dai A");
		expect(account.getElementsByTagName("span")[1]).toHaveTextContent(
			"54313215648643"
		);
	});

	test("click delete button should open pop box", async () => {
		const [accountList] = container.getAllByTestId("accountList");

		await waitFor(() => {
			fireEvent.click(accountList.querySelector(".icon-bin"));
			expect(popBox.setPopBox).toHaveBeenCalled();
		});
	});
});

describe("Bank info has 3 bank accounts", () => {
	let mockGetCustBankInfoApi;
	let container;

	beforeEach(async () => {
		mockGetCustBankInfoApi = jest.spyOn(api_account, "api_GetCustBankInfo");
		mockGetCustBankInfoApi.mockImplementation(() =>
			Promise.resolve({
				data: {
					data: {
						accountName: "qqq",
						defAccountNo: null,
						bankInfoDetail: [
							{
								bankName: "Asia Commercial Bank",
								bankLogo: "ACB.png",
								bankSite: "https://online.acb.com.vn/acbib",
								sysId: 1,
								accountNo: "564312687981"
							},
							{
								bankName:
									"Vietnam Prosperity Joint-Stock Commercial Bank",
								bankLogo: "VPB.png",
								bankSite: "https://www.vpbank.com.vn/",
								sysId: 47,
								accountNo: "1231843154984"
							},
							{
								bankName: "Dai A",
								bankLogo: "GAB.png",
								bankSite: null,
								sysId: 115,
								accountNo: "54313215648643"
							}
						],
						uSDTDetail: null
					},
					errorCode: 0,
					message: null,
					rawErrorCode: "",
					rawMessage: ""
				}
			})
		);

		await act(async () => {
			container = render(
				<LocationProvider history={history}>
					<i18nContext.Provider value={{ i18n }}>
						<userInfoContext.Provider
							value={{
								userInfo: { ...userInfo, accountName: "qaq" }
							}}>
							<loadingContext.Provider
								value={{ setLoading: jest.fn() }}>
								<BankInfo />
							</loadingContext.Provider>
						</userInfoContext.Provider>
					</i18nContext.Provider>
				</LocationProvider>
			);
		});
	});

	test("should not have empty account list", () => {
		const [accountList] = container.getAllByTestId("accountList");
		expect(accountList).not.toBeEmptyDOMElement();
	});

	test("should have right data in each account", () => {
		const [account1, account2, account3] = container.getAllByTestId(
			"account"
		);

		expect(account1.querySelector(".title")).toHaveTextContent(
			"Asia Commercial Bank"
		);
		expect(account1.getElementsByTagName("span")[1]).toHaveTextContent(
			"564312687981"
		);
		expect(account2.querySelector(".title")).toHaveTextContent(
			"Vietnam Prosperity Joint-Stock Commercial Bank"
		);
		expect(account2.getElementsByTagName("span")[1]).toHaveTextContent(
			"1231843154984"
		);
		expect(account3.querySelector(".title")).toHaveTextContent("Dai A");
		expect(account3.getElementsByTagName("span")[1]).toHaveTextContent(
			"54313215648643"
		);
	});
});

describe("Add account panel", () => {
	let mockGetCustBankInfoApi;
	let mockGetBankInfoSysList;
	let container;
	let addAccountBtn;

	beforeEach(async () => {
		mockGetCustBankInfoApi = jest.spyOn(api_account, "api_GetCustBankInfo");
		mockGetCustBankInfoApi.mockImplementation(() =>
			Promise.resolve({
				data: {
					data: null,
					errorCode: 0,
					message: null,
					rawErrorCode: "",
					rawMessage: ""
				}
			})
		);
		mockGetBankInfoSysList = jest.spyOn(
			api_payment,
			"api_GetBankInfoSysList"
		);
		mockGetBankInfoSysList.mockImplementation(() =>
			Promise.resolve({
				data: {
					data: [
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
					errorCode: 0
				}
			})
		);

		await act(async () => {
			container = render(
				<LocationProvider history={history}>
					<i18nContext.Provider value={{ i18n }}>
						<userInfoContext.Provider value={{ userInfo }}>
							<loadingContext.Provider
								value={{ setLoading: jest.fn() }}>
								<popBoxContext.Provider value={popBox}>
									<BankInfo />
								</popBoxContext.Provider>
							</loadingContext.Provider>
						</userInfoContext.Provider>
					</i18nContext.Provider>
				</LocationProvider>
			);
		});

		[addAccountBtn] = container.getAllByTestId("addAccountBtn");
		await waitFor(() => {
			fireEvent.click(addAccountBtn.querySelector(".orange"));
		});
	});

	test("should have bank list dropdown & account name input & account input", () => {
		expect(addAccountBtn).not.toBeVisible();
		expect(container.getAllByTestId("bankList")[0]).toBeVisible();
		expect(container.getAllByTestId("account_ipt")[0]).toBeVisible();
		expect(container.getAllByTestId("addPanelBtn")[0]).toBeVisible();
	});

	test("click bank list dropdown", () => {
		const [dropdown] = container.getAllByTestId("bankList");
		const dropdownContainer = dropdown.querySelector(".dropdown-container");

		fireEvent.click(dropdown);
		expect(dropdown).toHaveClass("open");
		expect(dropdownContainer).toHaveClass("open");

		fireEvent.click(dropdown);
		expect(dropdown).not.toHaveClass("open");
		expect(dropdownContainer).not.toHaveClass("open");
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
			"To ensure all transations correct, please make sure your real name is same with your bank account name"
		);
	});

	test("edit bank account input", () => {
		const [input] = container.getAllByTestId("account_ipt");

		fireEvent.focus(input);
		fireEvent.blur(input);
		expect(input).toHaveValue("");
		expect(input.parentNode.querySelector(".icon-cross")).toBeVisible();
		expect(container.getAllByTestId("account_msg")[0]).toBeVisible();
		expect(container.getAllByTestId("account_msg")[0]).toHaveTextContent(
			"Need Account Number"
		);

		fireEvent.change(input, { target: { value: 65412356431 } });
		fireEvent.blur(input);
		expect(input).toHaveValue("65412356431");
		expect(input.parentNode.querySelector(".icon-checkmark")).toBeVisible();
	});

	test("click bank account input info", () => {
		const [, infoBtn] = container.getAllByTestId("showTipBtn");

		fireEvent.click(infoBtn);
		expect(container.getAllByTestId("account_msg")[0]).toHaveTextContent(
			"Enter Account Number"
		);
	});

	test("click cancel button should show add account button", () => {
		const cancelBtn = container
			.getAllByTestId("addPanelBtn")[0]
			.querySelector(".darkGray");

		fireEvent.click(cancelBtn);
		expect(container.getAllByTestId("addAccountBtn")[0]).toBeVisible();
	});

	test("click submit button should back show account panel", async () => {
		const submitBtn = container
			.getAllByTestId("addPanelBtn")[0]
			.querySelector(".lightBlue");
		const [accountNameInput] = container.getAllByTestId("accountName_ipt");
		const [accountInput] = container.getAllByTestId("account_ipt");

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
		expect(container.getAllByTestId("account_msg")[0]).toHaveTextContent(
			"Need Account Number"
		);

		fireEvent.change(accountNameInput, { target: { value: "qatest" } });
		fireEvent.change(accountInput, { target: { value: 654213546 } });
		fireEvent.click(submitBtn);

		expect(popBox.setPopBox).toHaveBeenCalled();
	});
});

describe("Bank info init status", () => {
	test("renders correctly", () => {
		let tree;
		renderer.act(() => {
			tree = renderer.create(
				<LocationProvider history={history}>
					<i18nContext.Provider value={{ i18n }}>
						<userInfoContext.Provider value={{ userInfo }}>
							<loadingContext.Provider
								value={{ setLoading: jest.fn() }}>
								<BankInfo />
							</loadingContext.Provider>
						</userInfoContext.Provider>
					</i18nContext.Provider>
				</LocationProvider>
			);
		});
		expect(tree.toJSON()).toMatchSnapshot();
	});
});

describe("Bank info has account name", () => {
	test("renders correctly", () => {
		let tree;
		renderer.act(() => {
			tree = renderer.create(
				<LocationProvider history={history}>
					<i18nContext.Provider value={{ i18n }}>
						<userInfoContext.Provider
							value={{
								userInfo: { ...userInfo, accountName: "qaq" }
							}}>
							<loadingContext.Provider
								value={{ setLoading: jest.fn() }}>
								<BankInfo />
							</loadingContext.Provider>
						</userInfoContext.Provider>
					</i18nContext.Provider>
				</LocationProvider>
			);
		});
		expect(tree.toJSON()).toMatchSnapshot();
	});
});
