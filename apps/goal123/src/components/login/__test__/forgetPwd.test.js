import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react";
import * as reach from "@reach/router";
import * as api from "../../../service/api/site";
import { Wrapper } from "../../common/wrapper";
import ForgetPWD from "../forgetPwd";

jest.spyOn(reach, "useLocation");
jest.spyOn(reach, "useNavigate");
jest.spyOn(api, "api_CheckSignIn");
global.window = { location: { pathname: null } };
describe("ForgetPWD tests", () => {
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
						<ForgetPWD />
					</Wrapper>
				</reach.LocationProvider>
			);
		});
	});
	it("ForgetPWD renders correctly", () => {
		expect(tree).toMatchSnapshot();
	});
	it(`Email invalid ( input string empty )`, async () => {
		const input = tree.getByTestId("Email_ipt");
		fireEvent.change(input, { target: { value: "" } });
		fireEvent.blur(input);
		const errorMsg = tree.getByTestId("Email_msg");
		expect(errorMsg.innerHTML).not.toEqual("");
	});

	it(`Email invalid ( input string format wrong )`, async () => {
		const input = tree.getByTestId("Email_ipt");
		fireEvent.change(input, { target: { value: "fdsfds" } });
		fireEvent.blur(input);
		const errorMsg = tree.getByTestId("Email_msg");
		expect(errorMsg.innerHTML).not.toEqual("");
	});

	it(`Submit forgetPWD successfully`, async () => {
		const mock = jest.spyOn(api, "api_ForgetPwd");
		mock.mockImplementation(() =>
			Promise.resolve({
				data: {
					data: "ResetPWD email has been sent.",
					errorCode: 0,
					message: null,
					rawErrorCode: "",
					rawMessage: ""
				}
			})
		);

		const input = tree.getByTestId("Email_ipt");
		await waitFor(() => {
			fireEvent.change(input, {
				target: { value: "gfdfdgfd@g443.com" }
			});
			fireEvent.blur(input);
			const btn = tree.getByTestId("submit_forgetPWD_btn");
			fireEvent.click(btn);
			expect(mock).toHaveBeenNthCalledWith(1, {
				langId: "vn",
				Email: "gfdfdgfd@g443.com"
			});
		});
	});

	it(`click back button`, async () => {
		const btn = tree.getByTestId("forgetPWD_clickback_btn");
		await waitFor(() => {
			fireEvent.click(btn);
			expect(global.window.location.pathname).toEqual("/login");
		});
	});

	it(`Show tip button works fine`, async () => {
		const btn = tree.getByTestId("showTipBtn");
		fireEvent.click(btn);
		const errorMsg = tree.getByTestId("Email_msg");
		expect(errorMsg.innerHTML).not.toEqual("");
	});

	// it("click back button")
});
