import React from "react";
import { act } from "@testing-library/react-hooks";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { createHistory, LocationProvider } from "@reach/router";
import axios from "axios";
import { Wrapper } from "../../../components/common/wrapper";
import JoinAll from "../../../components/join/join.step.all";
import api from "../../../service/api";
import * as Iov_GetBlackBox from "../../../components/common/iovation";

jest.mock("axios", () => ({
	create: () => axios,
	defaults: {
		adapter: {}
	}
}));

jest.mock("../../../components/common/iovation", () => {
	const Iov = {
		Iov_GetBlackBox: jest.fn()
	};
	return Iov;
});

describe("Join step1", () => {
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
			apiURL: "http://stag.ivorysport.com"
		}
	};
	let tree;
	beforeEach(() => {
		act(() => {
			tree = render(
				<LocationProvider history={history}>
					<Wrapper {...wrapperFakeData}>
						<JoinAll />
					</Wrapper>
				</LocationProvider>
			);
		});
	});

	it(`JoinAll renders correctly`, () => {
		expect(tree).toMatchSnapshot();
	});

	it(`UserName Password invalid ( input string empty )`, async () => {
		const userNameInputContainer = tree.getAllByTestId("UserName")[0];
		const passwordInputContainer = tree.getAllByTestId("Password")[0];

		const userNameInput = userNameInputContainer.querySelector("input");
		const passwordInput = passwordInputContainer.querySelector("input");

		await waitFor(() => {
			fireEvent.change(userNameInput, { target: { value: "" } });
			fireEvent.blur(userNameInput);
			fireEvent.change(passwordInput, { target: { value: "" } });
			fireEvent.blur(passwordInput);
		});

		const userNameErrorMsg = tree.getAllByTestId("UserName")[1];
		const pwErrorMsg = tree.getAllByTestId("Password")[1];

		const userNameInputBox = userNameInputContainer.querySelector(".error");
		const pwInputBox = passwordInputContainer.querySelector(".error");

		expect(userNameInputBox).not.toEqual(null);
		expect(userNameErrorMsg.innerHTML).not.toEqual("");
		expect(pwInputBox).not.toEqual(null);
		expect(pwErrorMsg.innerHTML).not.toEqual("");
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

	it(`UserName already exists`, async () => {
		const userNameContainer = tree.getAllByTestId("UserName")[0];
		const input1 = userNameContainer.querySelector("input");

		const mockUserNameEx = jest.spyOn(api.site, "ExistsUserName");
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
			fireEvent.change(input1, { target: { value: "sean11" } });
			fireEvent.blur(input1);
			const errorMsg = tree.getAllByTestId("UserName")[1];
			const inputBox = userNameContainer.querySelector(".error");
			expect(inputBox).not.toEqual(null);
			expect(errorMsg.innerHTML).not.toEqual("");
		});
	});

	it(`PW invalid ( input string too short )`, async () => {
		const inputContainer = tree.getAllByTestId("Password")[0];
		const input = inputContainer.querySelector("input");

		await waitFor(() => {
			fireEvent.change(input, { target: { value: "Pet" } });
			fireEvent.blur(input);
		});
		const errorMsg = tree.getAllByTestId("Password")[1];
		const inputBox = inputContainer.querySelector(".error");
		expect(inputBox).not.toEqual(null);
		expect(errorMsg.innerHTML).not.toEqual("");
	});

	it(`PW invalid ( input string too long )`, async () => {
		const inputContainer = tree.getAllByTestId("Password")[0];
		const input = inputContainer.querySelector("input");

		await waitFor(() => {
			fireEvent.change(input, {
				target: { value: "Petfdsfasdgfdgfdsdfgdgfvcx" }
			});
			fireEvent.blur(input);
		});
		const errorMsg = tree.getAllByTestId("Password")[1];
		const inputBox = inputContainer.querySelector(".error");
		expect(inputBox).not.toEqual(null);
		expect(errorMsg.innerHTML).not.toEqual("");
	});

	it(`PW invalid ( input string includes invalid character )`, async () => {
		const inputContainer = tree.getAllByTestId("Password")[0];
		const input = inputContainer.querySelector("input");

		await waitFor(() => {
			fireEvent.change(input, {
				target: { value: "hwthrhtr?>" }
			});
			fireEvent.blur(input);
		});
		const errorMsg = tree.getAllByTestId("Password")[1];
		const inputBox = inputContainer.querySelector(".error");
		expect(inputBox).not.toEqual(null);
		expect(errorMsg.innerHTML).not.toEqual("");
	});

	it(`PW invalid ( input string format is invalid )`, async () => {
		const inputContainer = tree.getAllByTestId("Password")[0];
		const input = inputContainer.querySelector("input");

		await waitFor(() => {
			fireEvent.change(input, {
				target: { value: "hwthrhtr" }
			});
			fireEvent.blur(input);
		});
		const errorMsg = tree.getAllByTestId("Password")[1];
		const inputBox = inputContainer.querySelector(".error");
		expect(inputBox).not.toEqual(null);
		expect(errorMsg.innerHTML).not.toEqual("");
	});

	// it(`Show tip button works fine`, async () => {
	// 	const showTipBtn = tree.getAllByTestId("showTipBtn")[0];
	// 	const info = tree.getAllByTestId("inputInfo")[0];
	// 	await waitFor(() => {
	// 		fireEvent.click(showTipBtn);
	// 	});
	// 	expect(1).toEqual(1);
	// });

	// it(`Click display PW icon`, async () => {
	// 	const inputContainer = tree.getAllByTestId("Password")[0];
	// 	const input = inputContainer.querySelector("input");
	// 	const showPW = tree.getAllByTestId("showPsw")[0];
	// 	await waitFor(() => {
	// 		fireEvent.click(showPW);
	// 		expect(input.type).toEqual("text");
	// 	});
	// });
});

describe("Join step2", () => {
	let tree;
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
			apiURL: "http://stag.ivorysport.com"
		}
	};
	beforeEach(async () => {
		act(() => {
			tree = render(
				<LocationProvider history={history}>
					<Wrapper {...wrapperFakeData}>
						<JoinAll />
					</Wrapper>
				</LocationProvider>
			);
		});
		const userNameContainer = tree.getAllByTestId("UserName")[0];
		const input1 = userNameContainer.querySelector("input");

		const pwContainer = tree.getAllByTestId("Password")[0];
		const input2 = pwContainer.querySelector("input");
		const mockUserNameEx = jest.spyOn(api.site, "ExistsUserName");
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
		const mockGetCur = jest.spyOn(api.site, "GetSiteCurrencyList");

		mockGetCur.mockImplementationOnce(() =>
			Promise.resolve({
				data: {
					data: [2, 4, 13, 15, 96, 61],
					errorCode: 0,
					message: null,
					rawErrorCode: "",
					rawMessage: ""
				}
			})
		);
		await waitFor(() => {
			fireEvent.change(input1, { target: { value: "ggregqf3q4" } });
			fireEvent.blur(input1);
			fireEvent.change(input2, { target: { value: "T$Yfawff4%" } });
			fireEvent.blur(input2);
		});
	});

	it(`Display step2 & Currency dropdown works fine`, async () => {
		const btn = tree.getAllByTestId("next")[0];

		await waitFor(() => {
			fireEvent.click(btn);
			const dropDownItem = tree.getAllByTestId("dropdown-item")[1];
			fireEvent.click(dropDownItem);
			const dropDownText = tree.getAllByTestId(
				"Currency_dropdown-text"
			)[0].textContent;
			const itemText = dropDownItem.querySelector("span").textContent;
			expect(tree).toMatchSnapshot();
			expect(dropDownText).toEqual(itemText);
		});
	});

	it(`Email invalid ( input string empty )`, async () => {
		const btn = tree.getAllByTestId("next")[0];

		await waitFor(() => {
			fireEvent.click(btn);
			const email_container = tree.getAllByTestId("Email")[0];
			const email_input = email_container.querySelector("input");
			fireEvent.change(email_input, { target: { value: "" } });
			fireEvent.blur(email_input);
			const errorMsg = tree.getAllByTestId("Email")[1];
			const inputBox = email_container.querySelector(".error");
			expect(inputBox).not.toEqual(null);
			expect(errorMsg.innerHTML).not.toEqual("");
		});
	});

	it(`Email invalid ( input string wrong format )`, async () => {
		const btn = tree.getAllByTestId("next")[0];

		await waitFor(() => {
			fireEvent.click(btn);
			const email_container = tree.getAllByTestId("Email")[0];
			const email_input = email_container.querySelector("input");
			fireEvent.change(email_input, { target: { value: "gfdgd" } });
			fireEvent.blur(email_input);
			const errorMsg = tree.getAllByTestId("Email")[1];
			const inputBox = email_container.querySelector(".error");
			expect(inputBox).not.toEqual(null);
			expect(errorMsg.innerHTML).not.toEqual("");
		});
	});

	it(`Email already exists`, async () => {
		const btn = tree.getAllByTestId("next")[0];
		const mockEmailEx = jest.spyOn(api.site, "ExistsEmail");
		mockEmailEx.mockImplementation(() =>
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
			fireEvent.click(btn);
			const email_container = tree.getAllByTestId("Email")[0];
			const email_input = email_container.querySelector("input");
			fireEvent.change(email_input, {
				target: { value: "scott.wang@yahoo.com" }
			});
			fireEvent.blur(email_input);
			const errorMsg = tree.getAllByTestId("Email")[1];
			const inputBox = email_container.querySelector(".error");
			expect(inputBox).not.toEqual(null);
			expect(errorMsg.innerHTML).not.toEqual("");
		});
	});

	it(`Phone number invalid ( input string empty )`, async () => {
		const btn = tree.getAllByTestId("next")[0];
		await waitFor(() => {
			fireEvent.click(btn);
			const phone_container = tree.getAllByTestId("Phone")[0];
			const phone_input = phone_container.querySelector("input");
			fireEvent.change(phone_input, { target: { value: "" } });
			fireEvent.blur(phone_input);

			const errorMsg = tree.getAllByTestId("Phone")[1];
			const inputBox = phone_container.querySelector(".error");
			expect(inputBox).not.toEqual(null);
			expect(errorMsg.innerHTML).not.toEqual("");
		});
	});

	it(`Phone number invalid ( input string wrong format )`, async () => {
		const btn = tree.getAllByTestId("next")[0];
		await waitFor(() => {
			fireEvent.click(btn);
			const phone_container = tree.getAllByTestId("Phone")[0];
			const phone_input = phone_container.querySelector("input");
			fireEvent.change(phone_input, { target: { value: "gfdgfdg" } });
			fireEvent.blur(phone_input);
			const errorMsg = tree.getAllByTestId("Phone")[1];
			const inputBox = phone_container.querySelector(".error");
			expect(inputBox).not.toEqual(null);
			expect(errorMsg.innerHTML).not.toEqual("");
		});
	});

	it(`Phone number already exists`, async () => {
		const btn = tree.getAllByTestId("next")[0];
		const mockPhoneEx = jest.spyOn(api.site, "ExistsPhoneNo");
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
			fireEvent.click(btn);
			const ph_container = tree.getAllByTestId("Phone")[0];
			const ph_input = ph_container.querySelector("input");
			fireEvent.change(ph_input, {
				target: { value: "543534" }
			});
			fireEvent.blur(ph_input);
			const errorMsg = tree.getAllByTestId("Phone")[1];
			const inputBox = ph_container.querySelector(".error");
			expect(inputBox).not.toEqual(null);
			expect(errorMsg.innerHTML).not.toEqual("");
		});
	});

	it(`RealName invalid ( input string empty )`, async () => {
		const btn = tree.getAllByTestId("next")[0];

		await waitFor(() => {
			fireEvent.click(btn);
			const realName_container = tree.getAllByTestId("RealName")[0];
			const realName_input = realName_container.querySelector("input");
			fireEvent.change(realName_input, { target: { value: "" } });
			fireEvent.blur(realName_input);

			const errorMsg = tree.getAllByTestId("RealName")[1];
			const inputBox = realName_container.querySelector(".error");
			expect(inputBox).not.toEqual(null);
			expect(errorMsg.innerHTML).not.toEqual("");
		});
	});

	it(`Birthday select works fine`, async () => {
		const btn = tree.getAllByTestId("next")[0];

		await waitFor(() => {
			fireEvent.click(btn);
			const item = tree.getAllByTestId("BirthDay_d_item")[14];
			fireEvent.click(item);
			const itemText = item.innerHTML;
			const displayText = tree.getAllByTestId("BirthDay_d_displayText")[0]
				.textContent;

			expect(itemText).toEqual(displayText);
		});
	});

	it(`Not selecting any currency`, async () => {
		const btn = tree.getAllByTestId("next")[0];

		await waitFor(() => {
			fireEvent.click(btn);
			const cur_container = tree.getAllByTestId("Currency")[0];
			const currency_btn = cur_container.querySelector("button");
			fireEvent.blur(currency_btn);
			const errorMsg = tree.getAllByTestId("Currency")[1];
			const inputBox = cur_container.querySelector(".error");
			expect(inputBox).not.toEqual(null);
			expect(errorMsg.innerHTML).not.toEqual("");
		});
	});

	// it(`Sign up fail because bonus code error`, async () => {
	// 	const mockPhoneEx = jest.spyOn(api.site, "ExistsPhoneNo");
	// 	mockPhoneEx.mockImplementation(() =>
	// 		Promise.resolve({
	// 			data: {
	// 				data: false,
	// 				errorCode: 0,
	// 				message: null,
	// 				rawErrorCode: "",
	// 				rawMessage: ""
	// 			}
	// 		})
	// 	);
	// 	const mockEmailEx = jest.spyOn(api.site, "ExistsEmail");
	// 	mockEmailEx.mockImplementation(() =>
	// 		Promise.resolve({
	// 			data: {
	// 				data: false,
	// 				errorCode: 0,
	// 				message: null,
	// 				rawErrorCode: "",
	// 				rawMessage: ""
	// 			}
	// 		})
	// 	);
	// 	const mockSignUp = jest.spyOn(api.site, "Signup");
	// 	mockSignUp.mockImplementation(() =>
	// 		Promise.resolve({
	// 			data: {
	// 				errorCode: -7,
	// 				message: "Bonus code error",
	// 				rawErrorCode: "",
	// 				rawMessage: ""
	// 			}
	// 		})
	// 	);

	// 	Iov_GetBlackBox.Iov_GetBlackBox.mockImplementation(() =>
	// 		Promise.resolve("213")
	// 	);

	// 	const btn = tree.getAllByTestId("next")[0];

	// 	await waitFor(() => {
	// 		fireEvent.click(btn);
	// 		const dropDownItem = tree.getAllByTestId("dropdown-item")[1];
	// 		fireEvent.click(dropDownItem);
	// 		fireEvent.blur(dropDownItem);

	// 		const realName_container = tree.getAllByTestId("RealName")[0];
	// 		const realName_input = realName_container.querySelector("input");
	// 		fireEvent.change(realName_input, { target: { value: "tare" } });
	// 		fireEvent.blur(realName_input);

	// 		const email_container = tree.getAllByTestId("Email")[0];
	// 		const email_input = email_container.querySelector("input");
	// 		fireEvent.change(email_input, {
	// 			target: { value: "gewgew@g43.com" }
	// 		});
	// 		fireEvent.blur(email_input);

	// 		const ph_container = tree.getAllByTestId("Phone")[0];
	// 		const ph_input = ph_container.querySelector("input");
	// 		fireEvent.change(ph_input, {
	// 			target: { value: "5756765" }
	// 		});
	// 		fireEvent.blur(ph_input);

	// 		const item_d = tree.getAllByTestId("BirthDay_d_item")[0];
	// 		fireEvent.click(item_d);
	// 		fireEvent.blur(item_d);

	// 		const item_m = tree.getAllByTestId("BirthDay_m_item")[0];
	// 		fireEvent.click(item_m);
	// 		fireEvent.blur(item_m);

	// 		const item_y = tree.getAllByTestId("BirthDay_y_item")[0];
	// 		fireEvent.click(item_y);
	// 		fireEvent.blur(item_y);

	// 		const submitSignUp = tree.getAllByTestId("signUpBtn")[0];
	// 		fireEvent.click(submitSignUp);

	// 		expect(1).toEqual(1);
	// 	});
	// });

	// it(`Successfully sign up`, async () => {
	// 	const mockPhoneEx = jest.spyOn(api.site, "ExistsPhoneNo");
	// 	mockPhoneEx.mockImplementation(() =>
	// 		Promise.resolve({
	// 			data: {
	// 				data: false,
	// 				errorCode: 0,
	// 				message: null,
	// 				rawErrorCode: "",
	// 				rawMessage: ""
	// 			}
	// 		})
	// 	);
	// 	const mockEmailEx = jest.spyOn(api.site, "ExistsEmail");
	// 	mockEmailEx.mockImplementation(() =>
	// 		Promise.resolve({
	// 			data: {
	// 				data: false,
	// 				errorCode: 0,
	// 				message: null,
	// 				rawErrorCode: "",
	// 				rawMessage: ""
	// 			}
	// 		})
	// 	);
	// 	const mockSignUp = jest.spyOn(api.site, "Signup");
	// 	mockSignUp.mockImplementation(() =>
	// 		Promise.resolve({
	// 			data: {
	// 				errorCode: 0,
	// 				message: null,
	// 				rawErrorCode: "",
	// 				rawMessage: ""
	// 			}
	// 		})
	// 	);

	// 	Iov_GetBlackBox.Iov_GetBlackBox.mockImplementation(() =>
	// 		Promise.resolve("213")
	// 	);

	// 	const mockGetCust = jest.spyOn(api.accountStrict, "GetCustProfile");
	// 	mockGetCust.mockImplementation(() =>
	// 		Promise.resolve({
	// 			data: {
	// 				data: {
	// 					accountName: "tare",
	// 					areaCode: "+66",
	// 					birth_d: "1",
	// 					birth_m: "1",
	// 					birth_y: "2000",
	// 					country: null,
	// 					currencyId: 4,
	// 					email: "gewgew@g43.com",
	// 					langId: "en",
	// 					lastLogin: "2021-06-02T22:44:47-04:00",
	// 					perCountry: "TH",
	// 					phoneNo: "5756765",
	// 					phoneVerified: false,
	// 					regTime: "2021-06-02T22:44:47-04:00",
	// 					userLevel: 1,
	// 					userName: "ggregqf3q4"
	// 				},
	// 				errorCode: 0,
	// 				message: null,
	// 				rawErrorCode: "",
	// 				rawMessage: ""
	// 			}
	// 		})
	// 	);

	// 	const mockMsgCount = jest.spyOn(api.account, "GetMsgCount");
	// 	mockMsgCount.mockImplementation(() =>
	// 		Promise.resolve({
	// 			data: {
	// 				data: 0,
	// 				errorCode: 0,
	// 				message: null,
	// 				rawErrorCode: "",
	// 				rawMessage: ""
	// 			}
	// 		})
	// 	);

	// 	const mockBalnace = jest.spyOn(api.account, "GetBalnace");
	// 	mockBalnace.mockImplementation(() =>
	// 		Promise.resolve({
	// 			data: {
	// 				data: 0,
	// 				errorCode: 1,
	// 				message: null,
	// 				rawErrorCode: "",
	// 				rawMessage: ""
	// 			}
	// 		})
	// 	);

	// 	const btn = tree.getAllByTestId("next")[0];

	// 	await waitFor(() => {
	// 		fireEvent.click(btn);
	// 		const dropDownItem = tree.getAllByTestId("dropdown-item")[1];
	// 		fireEvent.click(dropDownItem);
	// 		fireEvent.blur(dropDownItem);

	// 		const realName_container = tree.getAllByTestId("RealName")[0];
	// 		const realName_input = realName_container.querySelector("input");
	// 		fireEvent.change(realName_input, { target: { value: "tare" } });
	// 		fireEvent.blur(realName_input);

	// 		const email_container = tree.getAllByTestId("Email")[0];
	// 		const email_input = email_container.querySelector("input");
	// 		fireEvent.change(email_input, {
	// 			target: { value: "gewgew@g43.com" }
	// 		});
	// 		fireEvent.blur(email_input);

	// 		const ph_container = tree.getAllByTestId("Phone")[0];
	// 		const ph_input = ph_container.querySelector("input");
	// 		fireEvent.change(ph_input, {
	// 			target: { value: "5756765" }
	// 		});
	// 		fireEvent.blur(ph_input);

	// 		const item_d = tree.getAllByTestId("BirthDay_d_item")[0];
	// 		fireEvent.click(item_d);
	// 		fireEvent.blur(item_d);

	// 		const item_m = tree.getAllByTestId("BirthDay_m_item")[0];
	// 		fireEvent.click(item_m);
	// 		fireEvent.blur(item_m);

	// 		const item_y = tree.getAllByTestId("BirthDay_y_item")[0];
	// 		fireEvent.click(item_y);
	// 		fireEvent.blur(item_y);

	// 		const submitSignUp = tree.getAllByTestId("signUpBtn")[0];
	// 		fireEvent.click(submitSignUp);
	// 		expect(mockSignUp).toHaveBeenCalledWith({
	// 			UserName: "ggregqf3q4",
	// 			Userpwd: "T$Yfawff4%",
	// 			Email: "gewgew@g43.com",
	// 			PhoneNo: "5756765",
	// 			CurrencyId: 4,
	// 			UserLang: "en",
	// 			AreaCode: "+66",
	// 			PromoCode: "",
	// 			Birth_d: 1,
	// 			Birth_m: 1,
	// 			Birth_y: 2000,
	// 			RealName: "tare",
	// 			RefId: "",
	// 			Aff: "",
	// 			AffCode: "",
	// 			blackbox: "213"
	// 		});
	// 	});
	// });
});
