import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react";
import * as reach from "@reach/router";
import * as api from "../../../service/api/site";
import * as account_api from "../../../service/api/account";
import { Wrapper } from "../../common/wrapper";
import ChangePWD from "../../member/changePwd";

jest.spyOn(reach, "useLocation");
jest.spyOn(reach, "useNavigate");
jest.spyOn(api, "api_CheckSignIn");
describe("ChangePWD tests", () => {
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
		config: {}
	};
	beforeEach(async () => {
		reach.useLocation.mockImplementation(() => ({
			state: { fromHeader: false }
		}));
		api.api_CheckSignIn.mockImplementation(() =>
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
						<ChangePWD />
					</Wrapper>
				</reach.LocationProvider>
			);
		});
	});
	it("ChangePWD renders correctly", () => {
		expect(tree).toMatchSnapshot();
	});
	it(`OldPWD invalid ( input string empty )`, async () => {
		const input = tree.getByTestId("OldPWD_ipt");
		fireEvent.change(input, { target: { value: "" } });
		fireEvent.blur(input);
		const errorMsg = tree.getByTestId("OldPWD_msg");
		expect(errorMsg.innerHTML).not.toEqual("");
	});

	it(`NewPWD invalid ( input string empty )`, async () => {
		const input = tree.getByTestId("NewPWD_ipt");
		fireEvent.change(input, { target: { value: "" } });
		fireEvent.blur(input);
		const errorMsg = tree.getByTestId("NewPWD_msg");
		expect(errorMsg.innerHTML).not.toEqual("");
	});

	it(`Show tip button works fine`, async () => {
		const btn = tree.getAllByTestId("showTipBtn")[0];
		fireEvent.click(btn);
		const tip = tree.getByTestId("OldPWD_msg");
		expect(tip.innerHTML).not.toEqual("");
	});

	it(`Show password button works fine`, async () => {
		const btn = tree.getByTestId("OldPWD_show");
		const input = tree.getByTestId("OldPWD_ipt");
		fireEvent.click(btn);
		expect(input.type).toEqual("text");
	});

	it(`Submit change successfully`, async () => {
		const mock = jest.spyOn(account_api, "api_ChangePassword");
		mock.mockImplementation(() =>
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

		const oldPW = tree.getByTestId("OldPWD_ipt");
		const newPW = tree.getByTestId("NewPWD_ipt");
		await waitFor(() => {
			fireEvent.change(oldPW, {
				target: { value: "645645fds!" }
			});
			fireEvent.change(newPW, {
				target: { value: "6dfs645fds!!" }
			});
			fireEvent.blur(oldPW);
			fireEvent.blur(newPW);
			const btn = tree.getByTestId("submit_changePWD_btn");
			fireEvent.click(btn);
			expect(mock).toBeCalledWith({
				OldPassword: "645645fds!",
				NewPassword: "6dfs645fds!!"
			});
		});
	});
});
