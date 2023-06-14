import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react";
import * as reach from "@reach/router";
import api from "../../../service/api";
import { Wrapper } from "../../common/wrapper";
import Withdrawal from "../withdrawal";
import * as ct from "../../common/context";

jest.spyOn(reach, "useLocation");
jest.spyOn(reach, "useNavigate");
jest.spyOn(api.account, "GetCustBankInfo");
jest.spyOn(api.account, "GetTpWalletList");
jest.spyOn(api.account, "GetMsgCount");
jest.spyOn(api.account, "GetBalnace");
jest.spyOn(api.account, "GetWithdrawalAvailableBalance");
jest.spyOn(api.account, "GetTpWalletBalance");
jest.spyOn(api.accountStrict, "GetCustProfile");
jest.spyOn(api.site, "CheckSignIn");
jest.spyOn(api.payment, "GetWithdrawalLimit");
jest.spyOn(api.payment, "GetWithdrawalInfoRecent");
jest.spyOn(api.payment, "KycCheck");
jest.spyOn(api.payment, "WithdrawalReq");
jest.spyOn(api.tp, "Transfer");

describe("Withdrawal tests", () => {
	let tree;
	const history = reach.createHistory(window);
	const setPopBox = jest.fn();
	const wrapperFakeData = {
		path: {
			member: {
				root: "member"
			},
			promotionInfo: {
				root: "promotionInfo"
			},
			deposit: {
				root: "deposit"
			},
			login: {
				root: "login"
			}
		},
		userInfo: {
			langId: "en",
			isLogin: true
		},
		i18n: {},
		config: {
			apiURL: "http://www.n88dev.com"
		}
	};
	const defaultRender = async ({ currencyId }) => {
		await act(async () => {
			tree = render(
				<reach.LocationProvider history={history}>
					<Wrapper {...wrapperFakeData}>
						<ct.popBoxContext.Provider
							value={{
								setPopBox
							}}>
							<ct.userInfoContext.Provider
								value={{
									userInfo: {
										langId: "en",
										isLogin: true,
										currencyId,
										accountName: "qatest01",
										phoneNo: 657324366
									},
									setUserInfo: jest.fn()
								}}>
								<Withdrawal />
							</ct.userInfoContext.Provider>
						</ct.popBoxContext.Provider>
					</Wrapper>
				</reach.LocationProvider>
			);
		});
	};
	// {"tpId":27,"balance":0,"bonus":0,"walletStatus":3}
	beforeEach(async () => {
		api.site.CheckSignIn.mockImplementation(() =>
			Promise.resolve({
				data: {
					errorCode: 0,
					message: null,
					rawErrorCode: "",
					rawMessage: ""
				}
			})
		);
		api.payment.KycCheck.mockImplementation(() =>
			Promise.resolve({
				data: {
					errorCode: 0,
					message: null,
					rawErrorCode: "",
					rawMessage: ""
				}
			})
		);
		api.account.GetMsgCount.mockImplementation(() =>
			Promise.resolve({
				data: {
					errorCode: -1,
					message: null,
					rawErrorCode: "",
					rawMessage: ""
				}
			})
		);
		api.account.GetBalnace.mockImplementation(() =>
			Promise.resolve({
				data: {
					errorCode: -1,
					message: null,
					rawErrorCode: "",
					rawMessage: ""
				}
			})
		);
		api.account.GetWithdrawalAvailableBalance.mockImplementation(() =>
			Promise.resolve({
				data: {
					data: {
						balance: 1057726610.0,
						deduction: 0,
						availableBalance: 1057726610.0
					},
					errorCode: 0,
					message: "",
					rawErrorCode: "",
					rawMessage: ""
				}
			})
		);
		api.account.GetTpWalletBalance.mockImplementation(() =>
			Promise.resolve({
				data: {
					data: { tpId: 27, balance: 0, bonus: 0, walletStatus: 3 },
					errorCode: 0,
					message: "",
					rawErrorCode: "",
					rawMessage: ""
				}
			})
		);
		api.account.GetTpWalletList.mockImplementation(() =>
			Promise.resolve({
				data: {
					data: [
						{
							tpId: 1,
							tpName: "Sportsbook Wallet",
							displayKey: "lbl_Wallet_Saba",
							description:
								"Include OneRNG, PP and Platinum Suite(AB)"
						},
						{
							tpId: 27,
							tpName: "PT Wallet",
							displayKey: "lbl_Wallet_PT",
							description: "PT Wallet"
						}
					],
					errorCode: 0,
					message: "",
					rawErrorCode: "",
					rawMessage: ""
				}
			})
		);
		api.accountStrict.GetCustProfile.mockImplementation(() =>
			Promise.resolve({
				data: {
					errorCode: -1,
					message: null,
					rawErrorCode: "",
					rawMessage: ""
				}
			})
		);
		api.payment.GetWithdrawalLimit.mockImplementation(() =>
			Promise.resolve({
				data: {
					data: {
						withdrawalMin: 100.0,
						unlimited: false,
						withdrawalAvailableAmount: 600.0
					},
					errorCode: 0,
					message: "",
					rawErrorCode: "",
					rawMessage: ""
				}
			})
		);
		api.payment.GetWithdrawalInfoRecent.mockImplementation(() =>
			Promise.resolve({
				data: {
					data: [
						{
							createTime: "2021-06-28T14:26:40-04:00",
							transId: "WP88345",
							amount: 100.0,
							chargeFee: 0.0,
							status: 1
						},
						{
							createTime: "2021-06-21T07:00:47-04:00",
							transId: "WP83261",
							amount: 50.0,
							chargeFee: 0.0,
							status: 7
						},
						{
							createTime: "2021-06-21T07:00:15-04:00",
							transId: "WP83260",
							amount: 100.0,
							chargeFee: 0.0,
							status: 7
						},
						{
							createTime: "2021-06-19T10:46:53-04:00",
							transId: "WP81941",
							amount: 100.0,
							chargeFee: 0.0,
							status: 5
						},
						{
							createTime: "2021-05-24T06:33:55-04:00",
							transId: "WP67989",
							amount: 150.0,
							chargeFee: 0.0,
							status: 7
						}
					],
					errorCode: 0,
					message: "",
					rawErrorCode: "",
					rawMessage: ""
				}
			})
		);
	});
	it("Renders bankInfo correctly", async () => {
		api.account.GetCustBankInfo.mockImplementation(() =>
			Promise.resolve({
				data: {
					data: {
						accountName: "qatest01",
						bankInfoDetail: [
							{
								bankName: "Asia Commercial Bank",
								bankLogo: "ACB.png",
								bankSite: "https://online.acb.com.vn/acbib",
								sysId: 1,
								accountNo: "151511111"
							}
						],
						defAccountNo: null,
						uSDTDetail: null
					},
					errorCode: 0,
					message: null,
					rawErrorCode: "",
					rawMessage: ""
				}
			})
		);
		await defaultRender({ currencyId: 2 });
		expect(tree).toMatchSnapshot();
	});

	it("Renders USDT info correctly", async () => {
		api.account.GetCustBankInfo.mockImplementation(() =>
			Promise.resolve({
				data: {
					data: {
						accountName: "davidusdt",
						bankInfoDetail: null,
						defAccountNo: null,
						uSDTDetail: [
							{
								nickName: "dd01",
								usdtAddress:
									"KzPkBcF6BHR1pM2oAjCDR4wUAUtxbHcVVjN9R162w1asuhzcCSwY"
							},
							{
								nickName: "dd02",
								usdtAddress:
									"KzPkBcF6BHR1pM2oAjCDR4wUAUtxbHcVVjN9R162w1asuhzcCSwY1"
							}
						]
					},
					errorCode: 0,
					message: null,
					rawErrorCode: "",
					rawMessage: ""
				}
			})
		);
		await defaultRender({ currencyId: 96 });
		expect(tree).toMatchSnapshot();
	});

	it("No bankinfo and show pop box correctly", async () => {
		api.account.GetCustBankInfo.mockImplementation(() =>
			Promise.resolve({
				data: {
					data: {
						accountName: "qatest01",
						bankInfoDetail: null,
						defAccountNo: null,
						uSDTDetail: null
					},
					errorCode: 0,
					message: null,
					rawErrorCode: "",
					rawMessage: ""
				}
			})
		);
		await defaultRender({ currencyId: 2 });
		expect(setPopBox).toBeCalled();
	});

	it("Show USDT pop box correctly", async () => {
		api.account.GetCustBankInfo.mockImplementation(() =>
			Promise.resolve({
				data: {
					data: {
						accountName: "davidusdt",
						bankInfoDetail: null,
						defAccountNo: null,
						uSDTDetail: null
					},
					errorCode: 0,
					message: null,
					rawErrorCode: "",
					rawMessage: ""
				}
			})
		);
		await defaultRender({ currencyId: 96 });
		expect(setPopBox).toBeCalled();
	});

	it("KYC check errorCode 1", async () => {
		api.account.GetCustBankInfo.mockImplementation(() =>
			Promise.resolve({
				data: {
					data: {
						accountName: "qatest01",
						bankInfoDetail: [
							{
								bankName: "Asia Commercial Bank",
								bankLogo: "ACB.png",
								bankSite: "https://online.acb.com.vn/acbib",
								sysId: 1,
								accountNo: "151511111"
							}
						],
						defAccountNo: null,
						uSDTDetail: null
					},
					errorCode: 0,
					message: null,
					rawErrorCode: "",
					rawMessage: ""
				}
			})
		);

		api.payment.KycCheck.mockImplementation(() =>
			Promise.resolve({
				data: {
					errorCode: 1,
					message: null,
					rawErrorCode: "",
					rawMessage: ""
				}
			})
		);
		const fn = jest.fn();
		reach.useNavigate.mockImplementation(() => fn);
		await defaultRender({ currencyId: 2 });
		expect(fn).toBeCalled();
	});

	it("KYC check errorCode 2", async () => {
		api.account.GetCustBankInfo.mockImplementation(() =>
			Promise.resolve({
				data: {
					data: {
						accountName: "qatest01",
						bankInfoDetail: [
							{
								bankName: "Asia Commercial Bank",
								bankLogo: "ACB.png",
								bankSite: "https://online.acb.com.vn/acbib",
								sysId: 1,
								accountNo: "151511111"
							}
						],
						defAccountNo: null,
						uSDTDetail: null
					},
					errorCode: 0,
					message: null,
					rawErrorCode: "",
					rawMessage: ""
				}
			})
		);

		api.payment.KycCheck.mockImplementation(() =>
			Promise.resolve({
				data: {
					errorCode: 1,
					message: null,
					rawErrorCode: "",
					rawMessage: ""
				}
			})
		);
		const fn = jest.fn();
		reach.useNavigate.mockImplementation(() => fn);
		await defaultRender({ currencyId: 2 });
		expect(fn).toBeCalled();
	});

	it("Select bank works fine", async () => {
		api.account.GetCustBankInfo.mockImplementation(() =>
			Promise.resolve({
				data: {
					data: {
						accountName: "qatest01",
						bankInfoDetail: [
							{
								bankName: "Asia Commercial Bank",
								bankLogo: "ACB.png",
								bankSite: "https://online.acb.com.vn/acbib",
								sysId: 1,
								accountNo: "151511111"
							},
							{
								accountNo: "5345353553523525",
								bankLogo: "MBB.png",
								bankName: "Maybank Berhad",
								bankSite:
									"https://www.maybank2u.com.my/home/m2u/common/login.do",
								sysId: 31
							}
						],
						defAccountNo: null,
						uSDTDetail: null
					},
					errorCode: 0,
					message: null,
					rawErrorCode: "",
					rawMessage: ""
				}
			})
		);

		await defaultRender({ currencyId: 2 });
		const icon = tree.getAllByTestId("bank-icon")[1];

		await waitFor(async () => {
			fireEvent.click(icon);
			expect(icon.classList.contains("active")).toEqual(true);
		});
	});

	it("Select crypto address works fine", async () => {
		api.account.GetCustBankInfo.mockImplementation(() =>
			Promise.resolve({
				data: {
					data: {
						accountName: "qatest01",
						bankInfoDetail: null,
						defAccountNo: null,
						uSDTDetail: [
							{
								nickName: "dd01",
								usdtAddress:
									"KzPkBcF6BHR1pM2oAjCDR4wUAUtxbHcVVjN9R162w1asuhzcCSwY"
							},
							{
								nickName: "dd02",
								usdtAddress:
									"KzPkBcF6BHR1pM2oAjCDR4wUAUtxbHcVVjN9R162w1asuhzcCSwY1"
							}
						]
					},
					errorCode: 0,
					message: null,
					rawErrorCode: "",
					rawMessage: ""
				}
			})
		);

		await defaultRender({ currencyId: 96 });
		const icon = tree.getAllByTestId("crypto-address-icon")[1];

		await waitFor(async () => {
			fireEvent.click(icon);
			expect(icon.classList.contains("active")).toEqual(true);
		});
	});

	it("Get balance works fine( ReloadSpin )", async () => {
		api.account.GetCustBankInfo.mockImplementation(() =>
			Promise.resolve({
				data: {
					data: {
						accountName: "qatest01",
						bankInfoDetail: [
							{
								bankName: "Asia Commercial Bank",
								bankLogo: "ACB.png",
								bankSite: "https://online.acb.com.vn/acbib",
								sysId: 1,
								accountNo: "151511111"
							}
						],
						defAccountNo: null,
						uSDTDetail: null
					},
					errorCode: 0,
					message: null,
					rawErrorCode: "",
					rawMessage: ""
				}
			})
		);
		api.account.GetWithdrawalAvailableBalance.mockImplementation(() =>
			Promise.resolve({
				data: {
					data: {
						balance: 7777.0,
						deduction: 0,
						availableBalance: 7777.0
					},
					errorCode: 0,
					message: "",
					rawErrorCode: "",
					rawMessage: ""
				}
			})
		);
		await defaultRender({ currencyId: 2 });
		const reloadSpin = tree.getByTestId("reloadSpin");

		await act(async () => {
			fireEvent.click(reloadSpin);
		});

		expect(reloadSpin.textContent).toEqual("MYR 7,777.00");
	});

	it("Restore all works fine", async () => {
		api.account.GetCustBankInfo.mockImplementation(() =>
			Promise.resolve({
				data: {
					data: {
						accountName: "qatest01",
						bankInfoDetail: [
							{
								bankName: "Asia Commercial Bank",
								bankLogo: "ACB.png",
								bankSite: "https://online.acb.com.vn/acbib",
								sysId: 1,
								accountNo: "151511111"
							}
						],
						defAccountNo: null,
						uSDTDetail: null
					},
					errorCode: 0,
					message: null,
					rawErrorCode: "",
					rawMessage: ""
				}
			})
		);
		api.tp.Transfer.mockImplementation(() =>
			Promise.resolve({
				data: {
					errorCode: 0,
					message: "",
					rawErrorCode: "",
					rawMessage: ""
				}
			})
		);
		api.account.GetWithdrawalAvailableBalance.mockImplementation(() =>
			Promise.resolve({
				data: {
					data: {
						balance: 6969.0,
						deduction: 0,
						availableBalance: 6969.0
					},
					errorCode: 0,
					message: "",
					rawErrorCode: "",
					rawMessage: ""
				}
			})
		);
		await defaultRender({ currencyId: 2 });
		const restoreAll = tree.getByTestId("restoreAll");
		const reloadSpin = tree.getByTestId("reloadSpin");

		await act(async () => {
			fireEvent.click(restoreAll);
		});

		expect(reloadSpin.textContent).toEqual("MYR 6,969.00");
	});

	it("Invalid withdrawal amount ( lower than min amount )", async () => {
		api.account.GetCustBankInfo.mockImplementation(() =>
			Promise.resolve({
				data: {
					data: {
						accountName: "qatest01",
						bankInfoDetail: [
							{
								bankName: "Asia Commercial Bank",
								bankLogo: "ACB.png",
								bankSite: "https://online.acb.com.vn/acbib",
								sysId: 1,
								accountNo: "151511111"
							}
						],
						defAccountNo: null,
						uSDTDetail: null
					},
					errorCode: 0,
					message: null,
					rawErrorCode: "",
					rawMessage: ""
				}
			})
		);
		api.account.GetWithdrawalAvailableBalance.mockImplementation(() =>
			Promise.resolve({
				data: {
					data: {
						balance: 6969.0,
						deduction: 0,
						availableBalance: 6969.0
					},
					errorCode: 0,
					message: "",
					rawErrorCode: "",
					rawMessage: ""
				}
			})
		);
		await defaultRender({ currencyId: 2 });
		const ipt = tree.getByTestId("withdrawal_amount_ipt");
		const msg = tree.getByTestId("withdrawal_amount_msg");
		await waitFor(async () => {
			fireEvent.change(ipt, { target: { value: 10 } });
			expect(msg.textContent).not.toEqual("");
		});
	});

	it("Invalid withdrawal amount ( invalid format )", async () => {
		api.account.GetCustBankInfo.mockImplementation(() =>
			Promise.resolve({
				data: {
					data: {
						accountName: "qatest01",
						bankInfoDetail: [
							{
								bankName: "Asia Commercial Bank",
								bankLogo: "ACB.png",
								bankSite: "https://online.acb.com.vn/acbib",
								sysId: 1,
								accountNo: "151511111"
							}
						],
						defAccountNo: null,
						uSDTDetail: null
					},
					errorCode: 0,
					message: null,
					rawErrorCode: "",
					rawMessage: ""
				}
			})
		);
		api.account.GetWithdrawalAvailableBalance.mockImplementation(() =>
			Promise.resolve({
				data: {
					data: {
						balance: 6969.0,
						deduction: 0,
						availableBalance: 6969.0
					},
					errorCode: 0,
					message: "",
					rawErrorCode: "",
					rawMessage: ""
				}
			})
		);
		await defaultRender({ currencyId: 2 });
		const ipt = tree.getByTestId("withdrawal_amount_ipt");
		const msg = tree.getByTestId("withdrawal_amount_msg");
		await waitFor(async () => {
			fireEvent.change(ipt, { target: { value: "fdsfdsfd" } });
			expect(msg.textContent).not.toEqual("");
		});
	});

	it("Invalid withdrawal amount ( bigger than daily limit )", async () => {
		api.account.GetCustBankInfo.mockImplementation(() =>
			Promise.resolve({
				data: {
					data: {
						accountName: "qatest01",
						bankInfoDetail: [
							{
								bankName: "Asia Commercial Bank",
								bankLogo: "ACB.png",
								bankSite: "https://online.acb.com.vn/acbib",
								sysId: 1,
								accountNo: "151511111"
							}
						],
						defAccountNo: null,
						uSDTDetail: null
					},
					errorCode: 0,
					message: null,
					rawErrorCode: "",
					rawMessage: ""
				}
			})
		);
		api.account.GetWithdrawalAvailableBalance.mockImplementation(() =>
			Promise.resolve({
				data: {
					data: {
						balance: 6969.0,
						deduction: 0,
						availableBalance: 6969.0
					},
					errorCode: 0,
					message: "",
					rawErrorCode: "",
					rawMessage: ""
				}
			})
		);
		await defaultRender({ currencyId: 2 });
		const ipt = tree.getByTestId("withdrawal_amount_ipt");
		const msg = tree.getByTestId("withdrawal_amount_msg");
		await waitFor(async () => {
			fireEvent.change(ipt, { target: { value: 999999999999999999999 } });
			expect(msg.textContent).not.toEqual("");
		});
	});

	it("Invalid withdrawal amount ( insufficient balance )", async () => {
		api.account.GetCustBankInfo.mockImplementation(() =>
			Promise.resolve({
				data: {
					data: {
						accountName: "qatest01",
						bankInfoDetail: [
							{
								bankName: "Asia Commercial Bank",
								bankLogo: "ACB.png",
								bankSite: "https://online.acb.com.vn/acbib",
								sysId: 1,
								accountNo: "151511111"
							}
						],
						defAccountNo: null,
						uSDTDetail: null
					},
					errorCode: 0,
					message: null,
					rawErrorCode: "",
					rawMessage: ""
				}
			})
		);
		api.account.GetWithdrawalAvailableBalance.mockImplementation(() =>
			Promise.resolve({
				data: {
					data: {
						balance: 6969.0,
						deduction: 0,
						availableBalance: 6969.0
					},
					errorCode: 0,
					message: "",
					rawErrorCode: "",
					rawMessage: ""
				}
			})
		);
		await defaultRender({ currencyId: 2 });
		const ipt = tree.getByTestId("withdrawal_amount_ipt");
		const msg = tree.getByTestId("withdrawal_amount_msg");
		await waitFor(async () => {
			fireEvent.change(ipt, { target: { value: 7000 } });
			expect(msg.textContent).not.toEqual("");
		});
	});

	it("Submit withdrawal", async () => {
		api.account.GetCustBankInfo.mockImplementation(() =>
			Promise.resolve({
				data: {
					data: {
						accountName: "qatest01",
						bankInfoDetail: [
							{
								bankName: "Asia Commercial Bank",
								bankLogo: "ACB.png",
								bankSite: "https://online.acb.com.vn/acbib",
								sysId: 1,
								accountNo: "151511111"
							}
						],
						defAccountNo: null,
						uSDTDetail: null
					},
					errorCode: 0,
					message: null,
					rawErrorCode: "",
					rawMessage: ""
				}
			})
		);
		api.account.GetWithdrawalAvailableBalance.mockImplementation(() =>
			Promise.resolve({
				data: {
					data: {
						balance: 6969.0,
						deduction: 0,
						availableBalance: 6969.0
					},
					errorCode: 0,
					message: "",
					rawErrorCode: "",
					rawMessage: ""
				}
			})
		);
		await defaultRender({ currencyId: 2 });
		const submit = tree.getByTestId("submit_withdrawal");
		const ipt = tree.getByTestId("withdrawal_amount_ipt");

		await waitFor(async () => {
			fireEvent.change(ipt, { target: { value: 1000 } });
			fireEvent.click(submit);
			expect(setPopBox).toBeCalled();
		});
	});

	it("Click cancel on proccessing withdrawal transaction", async () => {
		api.account.GetCustBankInfo.mockImplementation(() =>
			Promise.resolve({
				data: {
					data: {
						accountName: "qatest01",
						bankInfoDetail: [
							{
								bankName: "Asia Commercial Bank",
								bankLogo: "ACB.png",
								bankSite: "https://online.acb.com.vn/acbib",
								sysId: 1,
								accountNo: "151511111"
							}
						],
						defAccountNo: null,
						uSDTDetail: null
					},
					errorCode: 0,
					message: null,
					rawErrorCode: "",
					rawMessage: ""
				}
			})
		);

		await defaultRender({ currencyId: 2 });
		const cancel = tree.getAllByTestId("history-cancel-btn")[0];
		await waitFor(async () => {
			fireEvent.click(cancel);
			expect(setPopBox).toBeCalled();
		});
	});

	it(`Show tip button works fine`, async () => {
		api.account.GetCustBankInfo.mockImplementation(() =>
			Promise.resolve({
				data: {
					data: {
						accountName: "qatest01",
						bankInfoDetail: [
							{
								bankName: "Asia Commercial Bank",
								bankLogo: "ACB.png",
								bankSite: "https://online.acb.com.vn/acbib",
								sysId: 1,
								accountNo: "151511111"
							}
						],
						defAccountNo: null,
						uSDTDetail: null
					},
					errorCode: 0,
					message: null,
					rawErrorCode: "",
					rawMessage: ""
				}
			})
		);
		api.account.GetWithdrawalAvailableBalance.mockImplementation(() =>
			Promise.resolve({
				data: {
					data: {
						balance: 6969.0,
						deduction: 0,
						availableBalance: 6969.0
					},
					errorCode: 0,
					message: "",
					rawErrorCode: "",
					rawMessage: ""
				}
			})
		);
		await defaultRender({ currencyId: 2 });
		const showTipBtn = tree.getByTestId("showTipBtn");
		const info = tree.getByTestId("inputInfo");
		await waitFor(() => {
			fireEvent.click(showTipBtn);
		});
		expect(info.textContent).not.toEqual("");
	});
});
