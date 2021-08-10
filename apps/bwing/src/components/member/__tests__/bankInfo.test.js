import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent, waitFor, act } from "@testing-library/react";
import { createHistory, LocationProvider } from "@reach/router";
import {
	i18nContext,
	userInfoContext,
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
	lbl_AddBankAccount: "Add New Bank Account",
	lbl_BankAccountName: "Account Name",
	lbl_BankAccount: "Bank Account",
	lbl_Step_SelectBank: "Select Bank",
	lbl_BankNumber: "Account Number",
	lbl_NumberOfBankAccounts: "Number of bank account",
	lbl_Bank_Step_1: "Add New Account",
	lbl_BankInfo_Hint:
		"Please update your bank account details before making a withdrawal. Your account and profile name should be your real name as in ID."
};

describe("Bank info never updated before", () => {
	let mockGetCustBankInfoApi;
	let container;
	let bankInfo;

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
							<BankInfo />
						</userInfoContext.Provider>
					</i18nContext.Provider>
				</LocationProvider>
			);
		});
		[bankInfo] = container.getAllByTestId("bankInfo");
	});

	test("should have add account button", () => {
		const [addAccountBtn] = bankInfo
			.querySelector(".btn-group")
			.getElementsByTagName("button");

		expect(addAccountBtn).toBeVisible();
		expect(addAccountBtn).toHaveTextContent("Add New Bank Account");
	});

	test("should be empty in account list", () => {
		const [showCardPanel] = container.getAllByTestId("showCardPanel");

		expect(showCardPanel.getElementsByTagName("p")[0]).toHaveTextContent(
			"Number of bank account: 0/3"
		);
	});

	test("should be in step 1", () => {
		const step = bankInfo.querySelector(".processArea");

		expect(step.querySelector(".process")).toHaveClass("active");
		expect(step.getElementsByTagName("span")[0]).toHaveTextContent(
			"Add New Account"
		);
	});

	test("click add account button should show select bank list panel", async () => {
		const [addAccountBtn] = bankInfo
			.querySelector(".btn-group")
			.getElementsByTagName("button");
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
			fireEvent.click(addAccountBtn);

			expect(addAccountBtn).not.toBeVisible();
			expect(bankInfo.querySelector(".depositImgArea")).toBeVisible();
			expect(
				bankInfo
					.querySelector(".depositTitle")
					.getElementsByTagName("h1")[0]
			).toHaveTextContent("Select Bank".toUpperCase());
		});
	});
});

describe("Bank info has bank account & has account name in user info", () => {
	let mockGetCustBankInfoApi;
	let container;
	let bankInfo;

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
							<popBoxContext.Provider value={popBox}>
								<BankInfo />
							</popBoxContext.Provider>
						</userInfoContext.Provider>
					</i18nContext.Provider>
				</LocationProvider>
			);
		});
		[bankInfo] = container.getAllByTestId("bankInfo");
	});

	test("should show account name & hint", () => {
		const [accountNameTitle, accountNameCol] = bankInfo
			.querySelector(".textArea")
			.getElementsByTagName("p");
		const accountNameHint = bankInfo.getElementsByTagName("p")[0];

		expect(accountNameTitle).toBeVisible();
		expect(accountNameTitle).toHaveTextContent("Account Name");
		expect(accountNameCol).toHaveTextContent("qaq");
		expect(accountNameHint).toHaveTextContent(
			"Please update your bank account details before making a withdrawal. Your account and profile name should be your real name as in ID."
		);
	});

	test("should show info when click account name info button", () => {
		const infoBtn = bankInfo.querySelector(".icon-information-solid");

		fireEvent.click(infoBtn);
		expect(container.getAllByTestId("accountNameTip")[0]).toHaveTextContent(
			"For any request of modification, please contact CSD."
		);
	});

	test("should not be empty in account list", () => {
		const [showCardPanel] = container.getAllByTestId("showCardPanel");
		const [account] = container.getAllByTestId("account");

		expect(showCardPanel.getElementsByTagName("p")[0]).toHaveTextContent(
			"Number of bank account: 1/3"
		);
		expect(bankInfo).toContainElement(account);
	});
});
