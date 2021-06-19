import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react";
import * as reach from "@reach/router";
import * as account_api from "../../../service/api/account";
import * as site_api from "../../../service/api/site";
import { Wrapper } from "../../../components/common/wrapper";
import Login from "../../../components/login/login";
import path from "../../../path";

jest.spyOn(reach, "useLocation");
jest.spyOn(reach, "navigate");
jest.spyOn(site_api, "api_CheckSignIn");

describe("Login tests", () => {
	let tree;
	const history = reach.createHistory(window);

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
	beforeEach(async () => {
		reach.useLocation.mockImplementation(() => ({
			state: { fromHeader: false }
		}));
		site_api.api_CheckSignIn.mockImplementation(() =>
			Promise.resolve({
				data: {
					errorCode: -1,
					message: null,
					rawErrorCode: "",
					rawMessage: ""
				}
			})
		);
		await act(async () => {
			tree = render(
				<reach.LocationProvider history={history}>
					<Wrapper {...wrapperFakeData}>
						<Login />
					</Wrapper>
				</reach.LocationProvider>
			);
		});
	});

	it("Login renders correctly", () => {
		const tag = tree.getByTestId("forgetpw");
		expect(tag.href).toBe(`http://localhost/${path.forgetPassword.root}`);
		expect(tree).toMatchSnapshot();
	});
	it(`UserName invalid ( input string empty )`, async () => {
		const input = tree.getByTestId("Username_ipt");
		await waitFor(() => {
			fireEvent.change(input, { target: { value: "" } });
			fireEvent.blur(input);
		});

		const msg = tree.getByTestId("Username_tip");

		expect(msg.innerHTML).not.toEqual("");
	});

	it(`UserName invalid ( input string too short )`, async () => {
		const input = tree.getByTestId("Username_ipt");
		await waitFor(() => {
			fireEvent.change(input, { target: { value: "fsdf" } });
			fireEvent.blur(input);
		});

		const msg = tree.getByTestId("Username_tip");

		expect(msg.innerHTML).not.toEqual("");
	});

	it(`UserName invalid ( input string too long )`, async () => {
		const input = tree.getByTestId("Username_ipt");
		await waitFor(() => {
			fireEvent.change(input, {
				target: { value: "fsdffdgfdgfdvfdvdzvdfds" }
			});
			fireEvent.blur(input);
		});

		const msg = tree.getByTestId("Username_tip");

		expect(msg.innerHTML).not.toEqual("");
	});

	it(`Password invalid ( input string empty )`, async () => {
		const input = tree.getByTestId("Password_ipt");
		await waitFor(() => {
			fireEvent.change(input, { target: { value: "" } });
			fireEvent.blur(input);
		});

		const msg = tree.getByTestId("Password_tip");

		expect(msg.innerHTML).not.toEqual("");
	});

	it(`Successfully logged in`, async () => {
		const input = tree.getByTestId("Username_ipt");
		const pwInput = tree.getByTestId("Password_ipt");
		const submit = tree.getByTestId("login_submit");
		const mockLogin = jest.spyOn(account_api, "api_UserLogin");
		mockLogin.mockImplementation(() =>
			Promise.resolve({
				data: {
					errorCode: 0,
					message: "/",
					rawErrorCode: "",
					rawMessage: ""
				}
			})
		);

		await waitFor(() => {
			fireEvent.change(input, {
				target: { value: "qatest01" }
			});
			fireEvent.blur(input);
			fireEvent.change(pwInput, { target: { value: "1q2w3e4r" } });
			fireEvent.blur(pwInput);
			fireEvent.click(submit);
			expect(mockLogin).toBeCalled();
		});
	});

	// it("Change pw link works fine", () => {

	// });
});
