import React from "react";
import renderer, { act } from "react-test-renderer";
import { cleanup, render, fireEvent } from "@testing-library/react";
import { createHistory, LocationProvider } from "@reach/router";
import moxios from "moxios";
import axios from "axios";
import { Wrapper } from "../../common/wrapper";
import Join from "../join";

describe("Join tests", () => {
	const history = createHistory(window);

	afterEach(cleanup);
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
		testApiData: {},
		config: {
			apiURL: "http://www.n88dev.com"
		}
	};

	it(`Join renders correctly`, () => {
		let tree;
		act(() => {
			tree = renderer.create(
				<LocationProvider history={history}>
					<Wrapper {...wrapperFakeData}>
						<Join />
					</Wrapper>
				</LocationProvider>
			);
		});

		expect(tree.toJSON()).toMatchSnapshot();
	});

	it(`UserName Email Phone Password invalid ( input string empty )`, async () => {
		let tree;
		const fakeCurrencyList = [
			{
				id: 2,
				displayKey: `Currency_2`
			}
		];
		act(() => {
			tree = render(
				<LocationProvider history={history}>
					<Wrapper {...wrapperFakeData}>
						<Join fakeCurrencyList={fakeCurrencyList} />
					</Wrapper>
				</LocationProvider>
			);
		});
		const currencyContainer = tree.getAllByTestId("Currency")[0];

		await act(async () => {
			const dropDown = currencyContainer.querySelector(".dropdown-item");
			fireEvent.click(dropDown);
		});

		const userNameInputContainer = tree.getAllByTestId("UserName")[0];
		const phoneInputContainer = tree.getAllByTestId("Phone")[0];
		const emailInputContainer = tree.getAllByTestId("Email")[0];
		const passwordInputContainer = tree.getAllByTestId("Password")[0];

		const userNameInput = userNameInputContainer.querySelector("input");
		const phoneInput = phoneInputContainer.querySelector("input");
		const emailInput = emailInputContainer.querySelector("input");
		const passwordInput = passwordInputContainer.querySelector("input");

		await act(async () => {
			fireEvent.change(userNameInput, { target: { value: "" } });
			fireEvent.blur(userNameInput);
			fireEvent.change(phoneInput, { target: { value: "" } });
			fireEvent.blur(phoneInput);
			fireEvent.change(emailInput, { target: { value: "" } });
			fireEvent.blur(emailInput);
			fireEvent.change(passwordInput, { target: { value: "" } });
			fireEvent.blur(passwordInput);
		});
		const userNameErrorMsg = tree.getAllByTestId("UserName")[1];
		const phoneErrorMsg = tree.getAllByTestId("Phone")[1];
		const emailErrorMsg = tree.getAllByTestId("Email")[1];
		const pwErrorMsg = tree.getAllByTestId("Password")[1];

		const userNameInputBox = userNameInputContainer.querySelector(".error");
		const phoneInputBox = phoneInputContainer.querySelector(".error");
		const emailInputBox = emailInputContainer.querySelector(".error");
		const pwInputBox = passwordInputContainer.querySelector(".error");

		expect(userNameInputBox).not.toEqual(null);
		expect(userNameErrorMsg.innerHTML).not.toEqual("");

		expect(phoneInputBox).not.toEqual(null);
		expect(phoneErrorMsg.innerHTML).not.toEqual("");

		expect(emailInputBox).not.toEqual(null);
		expect(emailErrorMsg.innerHTML).not.toEqual("");

		expect(pwInputBox).not.toEqual(null);
		expect(pwErrorMsg.innerHTML).not.toEqual("");
	});

	it(`UserName invalid ( input string too short )`, async () => {
		let tree;
		act(() => {
			tree = render(
				<LocationProvider history={history}>
					<Wrapper {...wrapperFakeData}>
						<Join />
					</Wrapper>
				</LocationProvider>
			);
		});
		const inputContainer = tree.getAllByTestId("UserName")[0];
		const input = inputContainer.querySelector("input");

		await act(async () => {
			fireEvent.change(input, { target: { value: "Pet" } });
			fireEvent.blur(input);
		});
		const errorMsg = tree.getAllByTestId("UserName")[1];
		const inputBox = inputContainer.querySelector(".error");

		expect(inputBox).not.toEqual(null);
		expect(errorMsg.innerHTML).not.toEqual("");
	});

	it(`UserName invalid ( input string too long )`, async () => {
		let tree;
		act(() => {
			tree = render(
				<LocationProvider history={history}>
					<Wrapper {...wrapperFakeData}>
						<Join />
					</Wrapper>
				</LocationProvider>
			);
		});
		const inputContainer = tree.getAllByTestId("UserName")[0];
		const input = inputContainer.querySelector("input");

		await act(async () => {
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

	it(`UserName already exists`, async () => {
		let tree;
		const testApiData = {
			data: true
		};
		act(() => {
			tree = render(
				<LocationProvider history={history}>
					<Wrapper {...wrapperFakeData}>
						<Join testApiData={testApiData} />
					</Wrapper>
				</LocationProvider>
			);
		});
		const inputContainer = tree.getAllByTestId("UserName")[0];
		const input = inputContainer.querySelector("input");

		await act(async () => {
			fireEvent.change(input, { target: { value: "sean11" } });
			fireEvent.blur(input);
			// props沒有成功傳入
			// blur後沒有正確動作
		});

		const errorMsg = tree.getAllByTestId("UserName")[1];
		const inputBox = inputContainer.querySelector(".error");

		expect(inputBox).not.toEqual(null);
		expect(errorMsg.innerHTML).not.toEqual("");
	});
});

// 情境:
// 正確渲染Join snapshot
// 除了Currency之外的欄位:
//     點選info
//         自己的inputInfo-active
//     再次點選
//         自己的inputInfo
// UserNameInput:

// Email:

// Password:
//     點選 icon-eye
//         icon-eye-blocked
//     再次點選
//         icon-eye
// Affiliate:

// Currency:
//     點選dropdown btn
//         dropdown-container-active
//     再次點選
//         dropdown-container
//     選擇不同貨幣
//          電話號碼跟著變動
//
// Checkbox:
//     點選icon-radio-checked
//         icon-radio-checked-active
//     再次點選
//         icon-radio-checked

// btn-group:
//     點選發request
//     _usernameCheck
// _passwordCheck
// _phoneCheck
// _emailCheck
// _currencyCheck
// _checkboxCheck
// 以上任何一個的.checked回傳false時
// 對應的inputBox-error
// 對應的inputBox裡出現errormark
// 對應的tip-active
// 以上任何一個的.checked回傳true時
//     對應的inputBox移除error
//     對應的inputBox裡出現checkmark
//     對應的tip移除active
//
// switch button :
//     點選登入
//         switchLogin-active
//         渲染Login-active
//     點選加入
//         switchJoin-active
//         switchBg-right
