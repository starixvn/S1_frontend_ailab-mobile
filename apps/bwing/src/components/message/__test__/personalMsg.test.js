import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { createHistory, LocationProvider } from "@reach/router";
import Content from "../personalMsg";
import { Wrapper } from "../../common/wrapper";
import * as api_account from "../../../service/api/account";
import * as api_message from "../../../service/api/message";
import * as api_site from "../../../service/api/site";
import * as api_accountStrict from "../../../service/api/accountStrict";
import * as ct from "../../common/context";

jest.spyOn(api_site, "api_CheckSignIn");
jest.spyOn(api_account, "api_GetMsgCount");
jest.spyOn(api_account, "api_GetBalnace");
const GetMsgList = jest.spyOn(api_account, "api_GetMsgList");
jest.spyOn(api_account, "api_GetMsgContent");
jest.spyOn(api_message, "api_GetAnnouncement");
jest.spyOn(api_accountStrict, "api_GetCustProfile");

describe("Announcement tests", () => {
	const history = createHistory(window);
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
			isLogin: false
		},
		setPopBox: () => ({}),
		i18n: {},
		config: {
			apiURL: "http://www.n88dev.com"
		}
	};
	let tree;
	beforeEach(async () => {
		api_site.api_CheckSignIn.mockImplementation(() =>
			Promise.resolve({
				data: {
					errorCode: 0,
					message: null,
					rawErrorCode: "",
					rawMessage: ""
				}
			})
		);
		api_account.api_GetMsgCount.mockImplementation(() =>
			Promise.resolve({
				data: {
					errorCode: -1,
					message: null,
					rawErrorCode: "",
					rawMessage: ""
				}
			})
		);
		api_account.api_GetBalnace.mockImplementation(() =>
			Promise.resolve({
				data: {
					errorCode: -1,
					message: null,
					rawErrorCode: "",
					rawMessage: ""
				}
			})
		);
		api_accountStrict.api_GetCustProfile.mockImplementation(() =>
			Promise.resolve({
				data: {
					errorCode: -1,
					message: null,
					rawErrorCode: "",
					rawMessage: ""
				}
			})
		);
		api_account.api_GetMsgList.mockImplementation(() =>
			Promise.resolve({
				data: {
					data: [
						{
							id: 445022,
							type: 99,
							senderCustId: 1,
							sender: "System",
							title: "Your withdrawal WP88345 has been rejected!",
							createTime: "2021-07-02T20:24:56-04:00",
							flag: true
						},
						{
							id: 437910,
							type: 99,
							senderCustId: 1,
							sender: "System",
							title: "VIP Membership Notice",
							createTime: "2021-06-30T16:54:40-04:00",
							flag: false
						}
					],
					errorCode: 0,
					message: null,
					rawErrorCode: "",
					rawMessage: ""
				}
			})
		);

		await waitFor(() => {
			tree = render(
				<LocationProvider history={history}>
					<Wrapper {...wrapperFakeData}>
						<ct.popBoxContext.Provider
							value={{
								setPopBox
							}}>
							<Content />
						</ct.popBoxContext.Provider>
					</Wrapper>
				</LocationProvider>
			);
		});
	});

	it(`PersonalMsg renders correctly`, () => {
		expect(tree).toMatchSnapshot();
	});

	it(`Open msg button works fine`, async () => {
		api_account.api_GetMsgContent.mockImplementation(() =>
			Promise.resolve({
				data: {
					data: {
						content:
							"Sorry to inform that your withdrawal WP88345 has been rejected. Should you have further query, kindly contact CSD for more details."
					},
					errorCode: 0,
					message: null,
					rawErrorCode: "",
					rawMessage: ""
				}
			})
		);
		const btn = tree.getAllByTestId("openBtn")[0];
		const card = tree.getAllByTestId("msgCard")[0];
		const isRead = tree.getAllByTestId("isRead")[0];
		await waitFor(() => {
			fireEvent.click(btn);
		});
		expect(card.classList.contains("open")).toEqual(true);
		expect(isRead.classList.contains("isRead")).toEqual(false);
		await waitFor(() => {
			fireEvent.click(btn);
		});
		expect(card.classList.contains("open")).toEqual(false);
	});

	it(`SelectAll button works fine`, async () => {
		const btn = tree.getByTestId("selectAll");
		const icon1 = tree.getAllByTestId("checkIcon")[0];
		const icon2 = tree.getAllByTestId("checkIcon")[1];
		await waitFor(() => {
			fireEvent.click(btn);
		});
		expect(icon1.classList.contains("open")).toEqual(true);
		expect(icon2.classList.contains("open")).toEqual(true);
	});

	it(`Delete msg button works fine`, async () => {
		const btn = tree.getByTestId("deleteMsg");
		const check1 = tree.getAllByTestId("msgChkbox")[0];
		const check2 = tree.getAllByTestId("msgChkbox")[1];

		await waitFor(() => {
			fireEvent.click(check1);
			fireEvent.click(check2);
		});
		fireEvent.click(btn);
		expect(setPopBox).toBeCalled();
	});

	it(`Refresh button works fine`, async () => {
		const btn = tree.getByTestId("refeshBtn");
		await waitFor(() => {
			fireEvent.click(btn);
		});
		expect(GetMsgList).toBeCalled();
	});
});
