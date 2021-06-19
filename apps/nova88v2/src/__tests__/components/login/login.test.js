import React from "react";
import { act } from "@testing-library/react-hooks";
import { render, fireEvent, waitFor } from "@testing-library/react";
import * as reach from "@reach/router";
import axios from "axios";
import api from "../../../service/api";
import { Wrapper } from "../../../components/common/wrapper";
import Login from "../../../components/login/login";
import path from "../../../path";
import config from "../../../config";

jest.spyOn(reach, "useLocation");
jest.spyOn(reach, "navigate");

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
	beforeEach(() => {
		reach.useLocation.mockImplementation(() => ({
			state: { fromHeader: false }
		}));
		act(() => {
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
		expect(tree).toMatchSnapshot();
	});
	it(`UserName invalid ( input string empty )`, async () => {
		const userNameInputContainer = tree.getAllByTestId("UserName")[0];
		const userNameInput = userNameInputContainer.querySelector("input");
		await waitFor(() => {
			fireEvent.change(userNameInput, { target: { value: "" } });
			fireEvent.blur(userNameInput);
		});

		const userNameErrorMsg = tree.getAllByTestId("UserName")[1];
		const userNameInputBox = userNameInputContainer.querySelector(".error");

		expect(userNameInputBox).not.toEqual(null);
		expect(userNameErrorMsg.innerHTML).not.toEqual("");
	});

	it(`UserName invalid ( input string too short )`, async () => {
		const inputContainer = tree.getAllByTestId("UserName")[0];
		const input = inputContainer.querySelector("input");

		await waitFor(() => {
			fireEvent.change(input, { target: { value: "Pet" } });
			fireEvent.blur(input);
		});
		const errorMsg = tree.getAllByTestId("UserName")[1];
		const inputBox = inputContainer.querySelector(".error");

		expect(inputBox).not.toEqual(null);
		expect(errorMsg.innerHTML).not.toEqual("");
	});

	it(`UserName invalid ( input string too long )`, async () => {
		const inputContainer = tree.getAllByTestId("UserName")[0];
		const input = inputContainer.querySelector("input");

		await waitFor(() => {
			fireEvent.change(input, {
				target: { value: "Petfdsfasdgfdgfdsdfgdgfvcx" }
			});
			fireEvent.blur(input);
		});
		const errorMsg = tree.getAllByTestId("UserName")[1];
		const inputBox = inputContainer.querySelector(".error");
		expect(inputBox).not.toEqual(null);
		expect(errorMsg.innerHTML).not.toEqual("");
	});

	it(`Password invalid ( input string empty )`, async () => {
		const passwordInputContainer = tree.getAllByTestId("Password")[0];
		const passwordInput = passwordInputContainer.querySelector("input");

		await waitFor(() => {
			fireEvent.change(passwordInput, { target: { value: "" } });
			fireEvent.blur(passwordInput);
		});
		const pwErrorMsg = tree.getAllByTestId("Password")[1];
		const pwInputBox = passwordInputContainer.querySelector(".error");

		expect(pwInputBox).not.toEqual(null);
		expect(pwErrorMsg.innerHTML).not.toEqual("");
	});

	// it(`Successfully logged in`, async () => {
	// 	const inputContainer = tree.getAllByTestId("UserName")[0];
	// 	const input = inputContainer.querySelector("input");
	// 	const pwInputContainer = tree.getAllByTestId("Password")[0];
	// 	const pwInput = pwInputContainer.querySelector("input");
	// 	const submit = tree.getAllByTestId("login_submit")[0];
	// 	const mockLogin = jest.spyOn(api.account, "UserLogin");
	// 	mockLogin.mockImplementation(() =>
	// 		Promise.resolve({
	// 			data: {
	// 				errorCode: 0,
	// 				message: null,
	// 				rawErrorCode: "",
	// 				rawMessage: ""
	// 			}
	// 		})
	// 	);

	// 	await waitFor(() => {
	// 		fireEvent.change(input, {
	// 			target: { value: "qatest01" }
	// 		});
	// 		fireEvent.blur(input);
	// 		fireEvent.change(pwInput, { target: { value: "1q2w3e4r" } });
	// 		fireEvent.blur(pwInput);
	// 		fireEvent.click(submit);
	// 		expect(1).toEqual(1);
	// 	});
	// });

	it("Change pw link works fine", () => {
		const tag = tree.getAllByTestId("forgetpw")[0];
		const anchor = tag.querySelector("a");
		expect(anchor.href).toBe(
			`${config.appURL}:3000/en/${path.forgetPassword.root}`
		);
	});
});
