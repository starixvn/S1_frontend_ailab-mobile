import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { LocationProvider, createHistory } from "@reach/router";
import { userInfoContext, i18nContext } from "../../common/context";
import ProfileWallet from "../profile.wallet";
import api from "../../../service/api";

const history = createHistory(window);

const i18n = {
	lbl_MainWallet: "Main Wallet",
	Currency_2: "MYR",
	lbl_TpWallet_1: "Sportsbook Wallet"
};

describe("Wallet panel have main wallet", () => {
	let mockGetBalanceApi;
	let mockGetTpWalletListApi;
	let mockGetTpWalletBalanceApi;
	let mockGetCustBonusWalletApi;

	let container;
	let mainWallet;

	beforeEach(async () => {
		mockGetBalanceApi = jest.spyOn(api.account, "GetBalnace");
		mockGetBalanceApi.mockImplementation(() =>
			Promise.resolve({
				data: {
					data: 100,
					errorCode: 0,
					message: null,
					rawErrorCode: "",
					rawMessage: ""
				}
			})
		);

		mockGetTpWalletListApi = jest.spyOn(api.account, "GetTpWalletList");
		mockGetTpWalletListApi.mockImplementation(() =>
			Promise.resolve({
				data: {
					data: [],
					errorCode: 0,
					message: null,
					rawErrorCode: "",
					rawMessage: ""
				}
			})
		);

		mockGetTpWalletBalanceApi = jest.spyOn(
			api.account,
			"GetTpWalletBalance"
		);
		mockGetTpWalletBalanceApi.mockImplementation(() =>
			Promise.resolve({
				data: {
					data: {},
					errorCode: 0,
					message: null,
					rawErrorCode: "",
					rawMessage: ""
				}
			})
		);

		mockGetCustBonusWalletApi = jest.spyOn(
			api.account,
			"GetCustBonusWallet"
		);
		mockGetCustBonusWalletApi.mockImplementation(() =>
			Promise.resolve({
				data: {
					data: [],
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
								userInfo: { isLogin: true, currencyId: 2 }
							}}>
							<ProfileWallet />
						</userInfoContext.Provider>
					</i18nContext.Provider>
				</LocationProvider>
			);
		});
		[mainWallet] = container.getAllByTestId("mainWallet");
	});

	test("should show main wallet title", () => {
		const [title] = mainWallet.getElementsByTagName("span");
		expect(title).toHaveTextContent("Main Wallet");
	});

	test("should have correct currency & amount", () => {
		const currency = mainWallet.querySelector(".text-org");
		const [amount] = mainWallet
			.querySelector(".info")
			.getElementsByTagName("div");

		expect(currency).toHaveTextContent("MYR");
		expect(amount).toHaveTextContent("100");
	});

	test("click reload spin", async () => {
		const reloadSpin = mainWallet.getElementsByTagName("button")[0];
		await waitFor(() => {
			fireEvent.click(reloadSpin);

			expect(reloadSpin).toHaveClass("active");
			expect(mockGetBalanceApi).toHaveBeenCalled();
		});
	});
});

describe("Wallet panel have main wallet & 1 tp wallet", () => {
	let mockGetBalanceApi;
	let mockGetTpWalletListApi;
	let mockGetTpWalletBalanceApi;
	let mockGetCustBonusWalletApi;

	let container;
	let tpWallet;

	beforeEach(async () => {
		mockGetBalanceApi = jest.spyOn(api.account, "GetBalnace");
		mockGetBalanceApi.mockImplementation(() =>
			Promise.resolve({
				data: {
					data: 100,
					errorCode: 0,
					message: null,
					rawErrorCode: "",
					rawMessage: ""
				}
			})
		);

		mockGetTpWalletListApi = jest.spyOn(api.account, "GetTpWalletList");
		mockGetTpWalletListApi.mockImplementation(() =>
			Promise.resolve({
				data: {
					data: [
						{
							tpId: 1,
							tpName: "Sportsbook Wallet",
							displayKey: "lbl_Wallet_Saba",
							description:
								"Include OneRNG, PP and Platinum Suite(AB)"
						}
					],
					errorCode: 0,
					message: null,
					rawErrorCode: "",
					rawMessage: ""
				}
			})
		);

		mockGetTpWalletBalanceApi = jest.spyOn(
			api.account,
			"GetTpWalletBalance"
		);
		mockGetTpWalletBalanceApi.mockImplementation(() =>
			Promise.resolve({
				data: {
					data: {
						tpId: 1,
						balance: 201.6,
						bonus: 0,
						walletStatus: 1
					},
					errorCode: 0,
					message: null,
					rawErrorCode: "",
					rawMessage: ""
				}
			})
		);

		mockGetCustBonusWalletApi = jest.spyOn(
			api.account,
			"GetCustBonusWallet"
		);
		mockGetCustBonusWalletApi.mockImplementation(() =>
			Promise.resolve({
				data: {
					data: [],
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
								userInfo: { isLogin: true, currencyId: 2 }
							}}>
							<ProfileWallet />
						</userInfoContext.Provider>
					</i18nContext.Provider>
				</LocationProvider>
			);
		});
		[tpWallet] = container.getAllByTestId("lbl_TpWallet_1");
	});

	test("should show tp wallet title", () => {
		const [title] = tpWallet.getElementsByTagName("span");
		expect(title).toHaveTextContent("Sportsbook Wallet");
	});

	test("should have correct currency & amount", () => {
		const currency = tpWallet.querySelector(".text-org");
		const [amount] = tpWallet
			.querySelector(".info")
			.getElementsByTagName("div");

		expect(currency).toHaveTextContent("MYR");
		expect(amount).toHaveTextContent("201.6");
	});

	test("click reload spin", async () => {
		const reloadSpin = tpWallet.getElementsByTagName("button")[0];
		await waitFor(() => {
			fireEvent.click(reloadSpin);

			expect(reloadSpin).toHaveClass("active");
			expect(mockGetTpWalletBalanceApi).toHaveBeenCalled();
		});
	});
});
