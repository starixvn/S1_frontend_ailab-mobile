import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { createHistory, LocationProvider } from "@reach/router";
import Announcement from "../announcement";
import { Wrapper } from "../../common/wrapper";
import * as api_account from "../../../service/api/account";
import * as api_message from "../../../service/api/message";
import * as api_site from "../../../service/api/site";
import * as api_accountStrict from "../../../service/api/accountStrict";

jest.spyOn(api_site, "api_CheckSignIn");
jest.spyOn(api_account, "api_GetMsgCount");
jest.spyOn(api_account, "api_GetBalnace");
jest.spyOn(api_message, "api_GetAnnouncement");
jest.spyOn(api_accountStrict, "api_GetCustProfile");

describe("Announcement tests", () => {
	const history = createHistory(window);

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
		api_message.api_GetAnnouncement.mockImplementation(() =>
			Promise.resolve({
				data: {
					data: [
						{
							id: 128,
							subject:
								"IMPORTANT!!! Local Transfer Bank Account Replacement Reminder",
							content:
								"Dear Valued Customer,\n\nKindly be informed the Local Transfer option will be replaced to a NEW account intermittently. Therefore, we would like to bring it to all player's attention on any transaction to our OLD account will NOT be accepted. Player who prefer to transfer through Local Bank option, kindly login to our Member Site check out the NEW account before proceed to any transaction! Should you have any inquiries, please do not hesitate to contact our Online Customer Service. Thank you!",
							startTime: "2021-03-03T13:00:00-04:00"
						},
						{
							id: 1,
							subject:
								"We are pleased to announce that our Company have Official Facebook, Instagram and Twitter account - nova88official!",
							content:
								"To our valued Members: \n\nWe are pleased to announce that our Company have Official Facebook, Instagram and Twitter account - nova88official! \nKindly be reminded that our Company only have three official social accounts, while other accounts appeared in any social platform IS NOT our company's official accounts. \nTherefore, we would like to bring it to your attention on any fraudulent social account. \nShould you have any inquiries, please do not hesitate to contact Nova88’s Customer Service.\n\nNova88’s Customer Service",
							startTime: "2020-04-14T12:00:00-04:00"
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
						<Announcement />
					</Wrapper>
				</LocationProvider>
			);
		});
	});

	it(`Announcement renders correctly`, () => {
		expect(tree).toMatchSnapshot();
	});

	it(`Display detail button works fine`, async () => {
		const btn = tree.getAllByTestId("displayBtn")[0];
		await waitFor(() => {
			fireEvent.click(btn);
		});
		expect(btn.classList.contains("open")).toEqual(true);
		await waitFor(() => {
			fireEvent.click(btn);
		});
		expect(btn.classList.contains("open")).toEqual(false);
	});
});
