import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react";
import * as reach from "@reach/router";
import moment from "moment";
import api from "../../../service/api";
import { Wrapper } from "../../common/wrapper";
import WithdrawalHistory from "../../../pages/withdrawalHistory";
import * as ct from "../../common/context";

jest.spyOn(reach, "useLocation");
jest.spyOn(reach, "useNavigate");
jest.spyOn(api.site, "CheckSignIn");
jest.spyOn(api.payment, "GetWithdrawalInfoHistory");
jest.spyOn(api.account, "GetTpWalletBalance");
jest.spyOn(api.account, "GetTpWalletList");
jest.spyOn(api.account, "GetMsgCount");
jest.spyOn(api.account, "GetBalnace");
jest.spyOn(api.accountStrict, "GetCustProfile");
describe("Withdrawal history tests", () => {
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
			apiURL: "http://stag.ivorysport.com"
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
								<WithdrawalHistory />
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
	});
	it("Renders withdrawal history correctly", async () => {
		await defaultRender({ currencyId: 2 });
		expect(tree).toMatchSnapshot();
	});

	it("Submit filter today", async () => {
		api.payment.GetWithdrawalInfoHistory.mockImplementation(() =>
			Promise.resolve({
				data: {
					data: [
						{
							createTime: "2021-06-28T14:26:40-04:00",
							transId: "WP88345",
							amount: 100.0,
							chargeFee: 0.0,
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
		await defaultRender({ currencyId: 2 });
		const startDate = tree.getAllByTestId("dateIpt")[0];
		const submit = tree.getByTestId("submit-history-filter");
		const today = moment().format("YYYY-MM-DD");
		await waitFor(() => {
			fireEvent.click(submit);
		});
		const transId = tree.getByTestId("transId");
		expect(startDate.value).toEqual(today);
		expect(transId.textContent).toEqual("WP88345");
	});
	it("Submit filter yesterday", async () => {
		api.payment.GetWithdrawalInfoHistory.mockImplementation(() =>
			Promise.resolve({
				data: {
					data: [
						{
							createTime: "2021-06-28T14:26:40-04:00",
							transId: "WP88345",
							amount: 100.0,
							chargeFee: 0.0,
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
		await defaultRender({ currencyId: 2 });
		const startDate = tree.getAllByTestId("dateIpt")[0];
		const submit = tree.getByTestId("submit-history-filter");
		const yesterToday = moment().subtract(1, "days").format("YYYY-MM-DD");
		const btn = tree.getByTestId("quick_btn_lbl_YesterDay");
		await waitFor(() => {
			fireEvent.click(btn);
			fireEvent.click(submit);
		});
		const transId = tree.getByTestId("transId");
		expect(startDate.value).toEqual(yesterToday);
		expect(transId.textContent).toEqual("WP88345");
	});
	it("Submit filter this week", async () => {
		api.payment.GetWithdrawalInfoHistory.mockImplementation(() =>
			Promise.resolve({
				data: {
					data: [
						{
							createTime: "2021-06-28T14:26:40-04:00",
							transId: "WP88345",
							amount: 100.0,
							chargeFee: 0.0,
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
		await defaultRender({ currencyId: 2 });
		const startDate = tree.getAllByTestId("dateIpt")[0];
		const submit = tree.getByTestId("submit-history-filter");
		const thisWeek = moment().startOf("week").format("YYYY-MM-DD");
		const btn = tree.getByTestId("quick_btn_lbl_ThisWeek");
		await waitFor(() => {
			fireEvent.click(btn);
			fireEvent.click(submit);
		});
		const transId = tree.getByTestId("transId");
		expect(startDate.value).toEqual(thisWeek);
		expect(transId.textContent).toEqual("WP88345");
	});
	it("Submit filter last week", async () => {
		api.payment.GetWithdrawalInfoHistory.mockImplementation(() =>
			Promise.resolve({
				data: {
					data: [
						{
							createTime: "2021-06-28T14:26:40-04:00",
							transId: "WP88345",
							amount: 100.0,
							chargeFee: 0.0,
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
		await defaultRender({ currencyId: 2 });
		const startDate = tree.getAllByTestId("dateIpt")[0];
		const submit = tree.getByTestId("submit-history-filter");
		const lastWeek = moment()
			.subtract(1, "weeks")
			.startOf("week")
			.format("YYYY-MM-DD");
		const btn = tree.getByTestId("quick_btn_lbl_LastWeek");
		await waitFor(() => {
			fireEvent.click(btn);
			fireEvent.click(submit);
		});
		const transId = tree.getByTestId("transId");
		expect(startDate.value).toEqual(lastWeek);
		expect(transId.textContent).toEqual("WP88345");
	});
	it("Submit filter this month", async () => {
		api.payment.GetWithdrawalInfoHistory.mockImplementation(() =>
			Promise.resolve({
				data: {
					data: [
						{
							createTime: "2021-06-28T14:26:40-04:00",
							transId: "WP88345",
							amount: 100.0,
							chargeFee: 0.0,
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
		await defaultRender({ currencyId: 2 });
		const startDate = tree.getAllByTestId("dateIpt")[0];
		const submit = tree.getByTestId("submit-history-filter");
		const thisMonth = moment().startOf("month").format("YYYY-MM-DD");
		const btn = tree.getByTestId("quick_btn_lbl_ThisMonth");
		await waitFor(() => {
			fireEvent.click(btn);
			fireEvent.click(submit);
		});
		const transId = tree.getByTestId("transId");
		expect(startDate.value).toEqual(thisMonth);
		expect(transId.textContent).toEqual("WP88345");
	});
	it("Submit filter last month", async () => {
		api.payment.GetWithdrawalInfoHistory.mockImplementation(() =>
			Promise.resolve({
				data: {
					data: [
						{
							createTime: "2021-06-28T14:26:40-04:00",
							transId: "WP88345",
							amount: 100.0,
							chargeFee: 0.0,
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
		await defaultRender({ currencyId: 2 });
		const startDate = tree.getAllByTestId("dateIpt")[0];
		const submit = tree.getByTestId("submit-history-filter");
		const lastMonth = moment()
			.subtract(1, "months")
			.startOf("month")
			.format("YYYY-MM-DD");
		const btn = tree.getByTestId("quick_btn_lbl_LastMonth");
		await waitFor(() => {
			fireEvent.click(btn);
			fireEvent.click(submit);
		});
		const transId = tree.getByTestId("transId");
		expect(startDate.value).toEqual(lastMonth);
		expect(transId.textContent).toEqual("WP88345");
	});
	it("Click cancel process", async () => {
		api.payment.GetWithdrawalInfoHistory.mockImplementation(() =>
			Promise.resolve({
				data: {
					data: [
						{
							createTime: "2021-06-28T14:26:40-04:00",
							transId: "WP88345",
							amount: 100.0,
							chargeFee: 0.0,
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
		await defaultRender({ currencyId: 2 });
		const submit = tree.getByTestId("submit-history-filter");
		await waitFor(() => {
			fireEvent.click(submit);
		});
		const cancel = tree.getByTestId("history-cancel-btn");
		await waitFor(() => {
			fireEvent.click(cancel);
		});
		expect(setPopBox).toBeCalled();
	});
});
