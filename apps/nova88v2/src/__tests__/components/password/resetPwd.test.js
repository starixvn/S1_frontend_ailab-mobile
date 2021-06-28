import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react";
import * as reach from "@reach/router";
import api from "../../../service/api";
import { Wrapper } from "../../../components/common/wrapper";
import ResetPWD from "../../../components/login/resetPwd";
import * as common from "../../../components/common/common";
import * as ct from "../../../components/common/context";

jest.spyOn(reach, "useLocation");
jest.spyOn(common, "getUrlParameter");
describe("ResetPWD tests", () => {
	let tree;
	const history = reach.createHistory(window);
	let gettoken;
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
		common.getUrlParameter.mockImplementation(() => "qatest01");
		gettoken = jest.spyOn(api.site, "CheckResetPwdToken");

		act(() => {
			tree = render(
				<reach.LocationProvider history={history}>
					<Wrapper {...wrapperFakeData}>
						<ct.userInfoContext.Provider
							value={{
								userInfo: {
									langId: "en",
									isLogin: false
								},
								setUserInfo: () => null
							}}>
							<ResetPWD />
						</ct.userInfoContext.Provider>
					</Wrapper>
				</reach.LocationProvider>
			);
		});
	});
	it("ResetPWD renders correctly", () => {
		expect(tree).toMatchSnapshot();
	});
	it(`Password invalid ( input string empty )`, () => {
		const input = tree.getByTestId("Password_ipt");
		fireEvent.change(input, { target: { value: "" } });
		fireEvent.blur(input);
		const errorMsg = tree.getByTestId("Password_msg");
		expect(errorMsg.innerHTML).not.toEqual("");
	});

	it(`Password invalid ( input string format wrong )`, () => {
		const input = tree.getByTestId("Password_ipt");
		fireEvent.change(input, { target: { value: "/][" } });
		fireEvent.blur(input);
		const errorMsg = tree.getByTestId("Password_msg");
		expect(errorMsg.innerHTML).not.toEqual("");
	});

	it(`Submit resetPWD successfully`, async () => {
		const mockSubmit = jest
			.spyOn(api.accountStrict, "ResetPassword")
			.mockImplementation(() =>
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
		const input = tree.getByTestId("Password_ipt");
		fireEvent.change(input, {
			target: { value: "1q2w3e4r!!" }
		});
		fireEvent.blur(input);
		const btn = tree.getByTestId("submit_resetPwd_btn");
		await waitFor(() => {
			fireEvent.click(btn);
			expect(mockSubmit).toBeCalledWith({ NewPassword: "1q2w3e4r!!" });
		});
	});

	it("PwdToken checked", async () => {
		expect(gettoken).toBeCalled();
	});
});
