import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react";
import { createHistory, LocationProvider } from "@reach/router";
import axios from "axios";
import { Wrapper } from "../../../components/common/wrapper";
import Join from "../../../components/join/join.refactor";
import * as api from "../../../service/api/site";
import * as api_strictAcc from "../../../service/api/accountStrict";
import * as api_account from "../../../service/api/account";

jest.mock("axios", () => ({
	create: () => axios,
	defaults: {
		adapter: {}
	}
}));

describe("Join tests", () => {
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
		const mockGetCur = jest.spyOn(api, "api_GetSiteCurrencyList");

		mockGetCur.mockImplementation(() =>
			Promise.resolve({
				data: {
					data: [51],
					errorCode: 0,
					message: null,
					rawErrorCode: "",
					rawMessage: ""
				}
			})
		);
		await act(async () => {
			tree = render(
				<LocationProvider history={history}>
					<Wrapper {...wrapperFakeData}>
						<Join />
					</Wrapper>
				</LocationProvider>
			);
		});
	});

	it(`Join renders correctly`, () => {
		expect(tree).toMatchSnapshot();
	});

	it(`UserName Password invalid ( input string empty )`, async () => {
		const userNameInput = tree.getByTestId("Username_ipt");
		const passwordInput = tree.getByTestId("Password_ipt");

		await waitFor(() => {
			fireEvent.change(userNameInput, { target: { value: "" } });
			fireEvent.blur(userNameInput);
			fireEvent.change(passwordInput, { target: { value: "" } });
			fireEvent.blur(passwordInput);
		});

		const userNameError = tree.queryByTestId("Username_msg");
		const pwError = tree.queryByTestId("Password_msg");

		expect(userNameError.innerHTML).not.toEqual("");
		expect(pwError.innerHTML).not.toEqual("");
	});

	it(`UserName invalid ( input string too short )`, async () => {
		const input = tree.getByTestId("Username_ipt");

		await waitFor(() => {
			fireEvent.change(input, { target: { value: "Pet" } });
			fireEvent.blur(input);
		});
		const userNameError = tree.queryByTestId("Username_msg");
		expect(userNameError.innerHTML).not.toEqual("");
	});

	it(`UserName invalid ( input string too long )`, async () => {
		const input = tree.getByTestId("Username_ipt");

		await waitFor(() => {
			fireEvent.change(input, {
				target: { value: "fasgrg43gafdfdscdvdfdsfm" }
			});
			fireEvent.blur(input);
		});
		const userNameError = tree.queryByTestId("Username_msg");
		expect(userNameError.innerHTML).not.toEqual("");
	});

	it(`UserName already exists`, async () => {
		const input = tree.getByTestId("Username_ipt");

		const mockUserNameEx = jest.spyOn(api, "api_ExistsUserName");
		mockUserNameEx.mockImplementation(() =>
			Promise.resolve({
				data: {
					data: true,
					errorCode: 0,
					message: null,
					rawErrorCode: "",
					rawMessage: ""
				}
			})
		);

		await waitFor(() => {
			fireEvent.change(input, { target: { value: "sean11" } });
			fireEvent.blur(input);
			const userNameError = tree.queryByTestId("Username_msg");
			expect(userNameError.innerHTML).not.toEqual("");
		});
	});

	it(`PW invalid ( input string too short )`, async () => {
		const input = tree.getByTestId("Password_ipt");

		await waitFor(() => {
			fireEvent.change(input, { target: { value: "Pet" } });
			fireEvent.blur(input);
		});
		const userNameError = tree.queryByTestId("Password_msg");
		expect(userNameError.innerHTML).not.toEqual("");
	});

	it(`PW invalid ( input string too long )`, async () => {
		const input = tree.getByTestId("Password_ipt");

		await waitFor(() => {
			fireEvent.change(input, {
				target: { value: "vcxvcxvxvxzcvcxvxzvczvxcvxc" }
			});
			fireEvent.blur(input);
		});
		const userNameError = tree.queryByTestId("Password_msg");
		expect(userNameError.innerHTML).not.toEqual("");
	});

	it(`PW invalid ( input string includes invalid character )`, async () => {
		const input = tree.getByTestId("Password_ipt");

		await waitFor(() => {
			fireEvent.change(input, { target: { value: "|}{" } });
			fireEvent.blur(input);
		});
		const userNameError = tree.queryByTestId("Password_msg");
		expect(userNameError.innerHTML).not.toEqual("");
	});

	it(`PW invalid ( input string format is invalid )`, async () => {
		const input = tree.getByTestId("Password_ipt");

		await waitFor(() => {
			fireEvent.change(input, { target: { value: "fdsaf" } });
			fireEvent.blur(input);
		});
		const userNameError = tree.queryByTestId("Password_msg");
		expect(userNameError.innerHTML).not.toEqual("");
	});

	it(`Phone number invalid ( input string empty )`, async () => {
		const input = tree.getByTestId("Phone_ipt");
		const mockPhoneEx = jest.spyOn(api, "api_site_ExistsPhoneNo");
		mockPhoneEx.mockImplementation(() =>
			Promise.resolve({
				data: {
					data: false,
					errorCode: 0,
					message: null,
					rawErrorCode: "",
					rawMessage: ""
				}
			})
		);
		await waitFor(() => {
			fireEvent.change(input, { target: { value: "" } });
			fireEvent.blur(input);
			const msg = tree.queryByTestId("Phone_msg");
			expect(msg.innerHTML).not.toEqual("");
		});
	});

	it(`Phone number invalid ( input string wrong format )`, async () => {
		const input = tree.getByTestId("Phone_ipt");
		const mockPhoneEx = jest.spyOn(api, "api_site_ExistsPhoneNo");
		mockPhoneEx.mockImplementation(() =>
			Promise.resolve({
				data: {
					data: false,
					errorCode: 0,
					message: null,
					rawErrorCode: "",
					rawMessage: ""
				}
			})
		);

		await waitFor(() => {
			fireEvent.change(input, { target: { value: "fdsfs" } });
			fireEvent.blur(input);
			const msg = tree.queryByTestId("Phone_msg");
			expect(msg.innerHTML).not.toEqual("");
		});
	});

	it(`Phone number invalid ( number already exist )`, async () => {
		const input = tree.getByTestId("Phone_ipt");

		const mockPhoneEx = jest.spyOn(api, "api_site_ExistsPhoneNo");
		mockPhoneEx.mockImplementation(() =>
			Promise.resolve({
				data: {
					data: true,
					errorCode: 0,
					message: null,
					rawErrorCode: "",
					rawMessage: ""
				}
			})
		);

		await waitFor(() => {
			fireEvent.change(input, { target: { value: "" } });
			fireEvent.blur(input);

			const msg = tree.queryByTestId("Phone_msg");
			expect(msg.innerHTML).not.toEqual("");
		});
	});

	it(`Show tip button works fine`, async () => {
		const showTipBtn = tree.getAllByTestId("showTipBtn")[0];
		await waitFor(() => {
			fireEvent.click(showTipBtn);
		});
		const userNameTip = tree.queryByTestId("Username_msg");
		expect(userNameTip.innerHTML).not.toEqual("");
	});

	it(`Click display PW icon`, async () => {
		const input = tree.getByTestId("Password_ipt");
		const showPW = tree.getByTestId("showPsw");
		await waitFor(() => {
			fireEvent.click(showPW);
			expect(input.type).toEqual("text");
		});
	});

	it(`Successfully sign up`, async () => {
		const mockUserNameEx = jest.spyOn(api, "api_ExistsUserName");
		mockUserNameEx.mockImplementation(() =>
			Promise.resolve({
				data: {
					data: false,
					errorCode: 0,
					message: null,
					rawErrorCode: "",
					rawMessage: ""
				}
			})
		);
		const mockPhoneEx = jest.spyOn(api, "api_site_ExistsPhoneNo");
		mockPhoneEx.mockImplementation(() =>
			Promise.resolve({
				data: {
					data: false,
					errorCode: 0,
					message: null,
					rawErrorCode: "",
					rawMessage: ""
				}
			})
		);
		const mockSignUp = jest.spyOn(api, "api_site_Signup");
		mockSignUp.mockImplementation(() =>
			Promise.resolve({
				data: {
					errorCode: 0,
					message: null,
					rawErrorCode: "",
					rawMessage: ""
				}
			})
		);
		const mockGetCust = jest.spyOn(api_strictAcc, "api_GetCustProfile");
		mockGetCust.mockImplementation(() =>
			Promise.resolve({
				data: {
					data: {
						accountName: "tare",
						areaCode: "+66",
						country: null,
						currencyId: 51,
						email: "gewgew@g43.com",
						langId: "en",
						lastLogin: "2021-06-02T22:44:47-04:00",
						perCountry: "TH",
						phoneNo: "5756765",
						phoneVerified: false,
						regTime: "2021-06-02T22:44:47-04:00",
						userLevel: 1,
						userName: "ggregqf3q4"
					},
					errorCode: 0,
					message: null,
					rawErrorCode: "",
					rawMessage: ""
				}
			})
		);
		const mockMsgCount = jest.spyOn(api_account, "api_GetMsgCount");
		mockMsgCount.mockImplementation(() =>
			Promise.resolve({
				data: {
					data: 0,
					errorCode: 0,
					message: null,
					rawErrorCode: "",
					rawMessage: ""
				}
			})
		);

		const mockBalnace = jest.spyOn(api_account, "api_GetBalnace");
		mockBalnace.mockImplementation(() =>
			Promise.resolve({
				data: {
					data: 0,
					errorCode: 1,
					message: null,
					rawErrorCode: "",
					rawMessage: ""
				}
			})
		);

		const userNameInput = tree.getByTestId("Username_ipt");
		const passwordInput = tree.getByTestId("Password_ipt");
		const phoneInput = tree.getByTestId("Phone_ipt");
		const check1 = tree.getByTestId("iAgree1");
		const check2 = tree.getByTestId("iAgree2");

		await waitFor(() => {
			fireEvent.change(userNameInput, { target: { value: "fdgdgfcxz" } });
			fireEvent.blur(userNameInput);
			fireEvent.change(passwordInput, { target: { value: "fdsfdsf!!" } });
			fireEvent.blur(passwordInput);
			fireEvent.change(phoneInput, {
				target: { value: "4324543543" }
			});
			fireEvent.blur(phoneInput);
			fireEvent.click(check1);
			fireEvent.click(check2);

			const submitSignUp = tree.getByTestId("signUpBtn");
			fireEvent.click(submitSignUp);
			expect(mockSignUp).toHaveBeenNthCalledWith(
				1,
				{
					UserName: "fdgdgfcxz",
					Userpwd: "fdsfdsf!!",
					PhoneNo: "4324543543",
					CurrencyId: 51,
					UserLang: "vn",
					AreaCode: "+84",
					RefId: null,
					Aff: null,
					AffCode: "",
					PromoCode: undefined
				},
				"vn"
			);
		});
	});
});
