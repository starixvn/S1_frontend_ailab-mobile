import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent, waitFor, act } from "@testing-library/react";
import renderer from "react-test-renderer";
import { LocationProvider, createHistory } from "@reach/router";
import {
	i18nContext,
	userInfoContext,
	loadingContext,
	popBoxContext
} from "../../common/context";
import BankInfo from "../bankInfo";
import api from "../../../service/api";

const history = createHistory(window);
const userInfo = { isLogin: true, langId: "en", currencyId: 2 };
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
		mockGetCustBankInfoApi = jest.spyOn(api.account, "GetCustBankInfo");
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

	test("should have add account button", () => {
		const [addAccountBtn] = container.getAllByTestId("addAccountBtn");
		expect(addAccountBtn).toBeVisible();
	});

	test("click add account button should show bank list dropdown & account input", async () => {
		const [addAccountBtn] = container.getAllByTestId("addAccountBtn");
		const mockGetBankInfoSysList = jest.spyOn(
			api.payment,
			"GetBankInfoSysList"
		);
		mockGetBankInfoSysList.mockImplementation(() =>
			Promise.resolve({
				data: {
					data: [
						{
							sysId: 31,
							currencyId: 2,
							bankCode: "MBB",
							bankName: "Maybank Berhad",
							bankLogo: "MBB.png",
							bankSite:
								"https://www.maybank2u.com.my/home/m2u/common/login.do"
						},
						{
							sysId: 32,
							currencyId: 2,
							bankCode: "PBB",
							bankName: "Public Bank Berhad",
							bankLogo: "PBB.png",
							bankSite:
								"https://www2.pbebank.com/myIBK/apppbb/servlet/"
						}
					],
					errorCode: 0
				}
			})
		);

		await waitFor(() => {
			fireEvent.click(addAccountBtn);

			expect(addAccountBtn).not.toBeVisible();
			expect(container.getAllByTestId("bankList")[0]).toBeVisible();
			expect(container.getAllByTestId("RealName_ipt")[0]).toBeVisible();
			expect(
				container.getAllByTestId("BankAccount_ipt")[0]
			).toBeVisible();
			expect(container.getAllByTestId("btnGroup")[0]).toBeVisible();
		});
	});
});

describe("Bank info has 1 bank account & has account name in user info", () => {
	let mockGetCustBankInfoApi;
	let container;

	beforeEach(async () => {
		mockGetCustBankInfoApi = jest.spyOn(api.account, "GetCustBankInfo");
		mockGetCustBankInfoApi.mockImplementation(() =>
			Promise.resolve({
				data: {
					data: {
						accountName: "qqq",
						defAccountNo: null,
						bankInfoDetail: [
							{
								bankName: "Maybank Berhad",
								bankLogo: "MBB.png",
								bankSite:
									"https://www.maybank2u.com.my/home/m2u/common/login.do",
								sysId: 31,
								accountNo: "234236546"
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
		const accountNameTip = accountNameCol.parentNode.querySelector(
			".text-center"
		);

		expect(accountNameCol).toBeVisible();
		expect(accountNameCol).toHaveTextContent("qaq");
		expect(accountNameTip).toBeVisible();
		expect(accountNameTip).toHaveTextContent(
			"For any request of modification, please contact CSD."
		);
	});

	test("should show account list small title", () => {
		const [accountList] = container.getAllByTestId("accountList");
		const bankListTitle = accountList.parentNode.querySelector(
			".icon-library"
		);

		expect(bankListTitle).toBeVisible();
	});

	test("should not have empty account list", () => {
		const [accountList] = container.getAllByTestId("accountList");
		expect(accountList).not.toBeEmptyDOMElement();
	});

	test("should have right data in account", () => {
		const [accountList] = container.getAllByTestId("accountList");
		const account = accountList.querySelector(".account");

		expect(account.querySelector(".title")).toHaveTextContent(
			"Maybank Berhad"
		);
		expect(account.getElementsByTagName("span")[1]).toHaveTextContent(
			"234236546"
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
		mockGetCustBankInfoApi = jest.spyOn(api.account, "GetCustBankInfo");
		mockGetCustBankInfoApi.mockImplementation(() =>
			Promise.resolve({
				data: {
					data: {
						accountName: "qqq",
						defAccountNo: null,
						bankInfoDetail: [
							{
								bankName: "Maybank Berhad",
								bankLogo: "MBB.png",
								bankSite:
									"https://www.maybank2u.com.my/home/m2u/common/login.do",
								sysId: 31,
								accountNo: "234236546"
							},
							{
								bankName: "Hong Leong Bank Berhad",
								bankLogo: "HLB.png",
								bankSite:
									"https://s.hongleongconnect.my/rib/app/fo/login",
								sysId: 35,
								accountNo: "2353674746"
							},
							{
								bankName: "STANDARD CHARTERED BANK",
								bankLogo: "SDCB.png",
								bankSite:
									"https://ibank.standardchartered.com.my/nfs/login.htm",
								sysId: 77,
								accountNo: "67696943534"
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
		const [accountList] = container.getAllByTestId("accountList");
		const [account1, account2, account3] = accountList.querySelectorAll(
			".account"
		);

		expect(account1.querySelector(".title")).toHaveTextContent(
			"Maybank Berhad"
		);
		expect(account1.getElementsByTagName("span")[1]).toHaveTextContent(
			"234236546"
		);
		expect(account2.querySelector(".title")).toHaveTextContent(
			"Hong Leong Bank Berhad"
		);
		expect(account2.getElementsByTagName("span")[1]).toHaveTextContent(
			"2353674746"
		);
		expect(account3.querySelector(".title")).toHaveTextContent(
			"STANDARD CHARTERED BANK"
		);
		expect(account3.getElementsByTagName("span")[1]).toHaveTextContent(
			"67696943534"
		);
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
	test("renders component has account name", () => {
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
