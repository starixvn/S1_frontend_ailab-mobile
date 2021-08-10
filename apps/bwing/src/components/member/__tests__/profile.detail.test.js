import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import renderer from "react-test-renderer";
import { createHistory, LocationProvider } from "@reach/router";
import ProfileDetail from "../profile.detail";
import { i18nContext, userInfoContext } from "../../common/context";
import * as api_account from "../../../service/api/account";
import * as api_site from "../../../service/api/site";

const history = createHistory(window);

const i18n = {
	lbl_RealName: "Real Name",
	lbl_Phone: "Phone Number",
	msg_EnterPhoneNumber: "Please enter phone number.",
	lbl_Submit: "Submit",
	lbl_Unverified: "lbl_Unverified",
	lbl_Birthday: "Birthday",
	lbl_Username: "Username",
	lbl_Country: "Country",
	lbl_CountryVN: "Vietnam",
	lbl_Email: "Email",
	msg_EnterRealName: "Please enter your real name.",
	lbl_PhoneRequired: "Please fill in the phone field",
	msg_PhoneExisted: "Phone number already exists.",
	msg_ConfirmRealNameAlert:
		"To ensure all transations correct, please make sure your real name is same with your bank account name",
	lbl_EmailToolTip: "Email cannot be changed after submission.",
	lbl_EmailRequired: "Please fill in the email field.",
	msg_MailExisted: "Mail already exists.",
	msg_SelectBirthDay: "Please select your birthday.",
	lbl_RemindForName:
		"*FULL NAME must match name in your bank account for Instant deposit & withdrawal.",
	lbl_ChangePassword: "Change Password",
	msg_MailWrongFormat: "Mail Format is wrong.",
	lbl_PhoneTooltip:
		"Please enter your valid phone number, it can not be changed once saved!"
};

describe("Profile Detail", () => {
	test("renders correctly when user haven't update profile", () => {
		const tree = renderer
			.create(
				<LocationProvider history={history}>
					<i18nContext.Provider value={{ i18n }}>
						<userInfoContext.Provider
							value={{
								userInfo: {
									country: null,
									langId: "en",
									currencyId: 51,
									userName: "qatest22"
								},
								setUserInfo: jest.fn()
							}}>
							<ProfileDetail />
						</userInfoContext.Provider>
					</i18nContext.Provider>
				</LocationProvider>
			)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});

	test("render correctly when user already filled all information(phone verified)", () => {
		const fakeUserInfo = {
			country: "VN",
			langId: "en",
			accountName: "test22",
			birth_d: "2",
			birth_m: "2",
			birth_y: "1999",
			currencyId: 51,
			phoneNo: "456987",
			areaCode: "+84",
			email: "qatest22@abc.com",
			userName: "qatest22",
			phoneVerified: true
		};

		const tree = renderer
			.create(
				<LocationProvider history={history}>
					<i18nContext.Provider value={{ i18n }}>
						<userInfoContext.Provider
							value={{
								userInfo: fakeUserInfo,
								setUserInfo: jest.fn()
							}}>
							<ProfileDetail />
						</userInfoContext.Provider>
					</i18nContext.Provider>
				</LocationProvider>
			)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});

	test("render correctly when user already filled all information(phone not verified)", () => {
		const fakeUserInfo = {
			country: "VN",
			langId: "en",
			accountName: "test22",
			birth_d: "2",
			birth_m: "2",
			birth_y: "1999",
			currencyId: 51,
			phoneNo: "456987",
			areaCode: "+84",
			email: "qatest22@abc.com",
			userName: "qatest22",
			phoneVerified: false
		};

		const tree = renderer
			.create(
				<LocationProvider history={history}>
					<i18nContext.Provider value={{ i18n }}>
						<userInfoContext.Provider
							value={{
								userInfo: fakeUserInfo,
								setUserInfo: jest.fn()
							}}>
							<ProfileDetail />
						</userInfoContext.Provider>
					</i18nContext.Provider>
				</LocationProvider>
			)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});

	test("should render accountName input when user didn't have accountName", () => {
		const fakeUserInfo = {
			country: "VN",
			langId: "en",
			birth_d: "2",
			birth_m: "2",
			birth_y: "1999",
			currencyId: 51,
			phoneNo: "456987",
			areaCode: "+84",
			email: "qatest22@abc.com",
			userName: "qatest22",
			phoneVerified: false
		};

		const tree = renderer
			.create(
				<LocationProvider history={history}>
					<i18nContext.Provider value={{ i18n }}>
						<userInfoContext.Provider
							value={{
								userInfo: fakeUserInfo,
								setUserInfo: jest.fn()
							}}>
							<ProfileDetail />
						</userInfoContext.Provider>
					</i18nContext.Provider>
				</LocationProvider>
			)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});

	test("should render phone input when user didn't have phone number", () => {
		const fakeUserInfo = {
			country: "VN",
			langId: "en",
			accountName: "test22",
			birth_d: "2",
			birth_m: "2",
			birth_y: "1999",
			currencyId: 51,
			email: "qatest22@abc.com",
			userName: "qatest22",
			phoneVerified: false
		};

		const tree = renderer
			.create(
				<LocationProvider history={history}>
					<i18nContext.Provider value={{ i18n }}>
						<userInfoContext.Provider
							value={{
								userInfo: fakeUserInfo,
								setUserInfo: jest.fn()
							}}>
							<ProfileDetail />
						</userInfoContext.Provider>
					</i18nContext.Provider>
				</LocationProvider>
			)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});

	test("should render birth dropdown when user didn't have birth", () => {
		const fakeUserInfo = {
			country: "VN",
			langId: "en",
			accountName: "test22",
			currencyId: 51,
			phoneNo: "456987",
			areaCode: "+84",
			email: "qatest22@abc.com",
			userName: "qatest22",
			phoneVerified: false
		};

		const tree = renderer
			.create(
				<LocationProvider history={history}>
					<i18nContext.Provider value={{ i18n }}>
						<userInfoContext.Provider
							value={{
								userInfo: fakeUserInfo,
								setUserInfo: jest.fn()
							}}>
							<ProfileDetail />
						</userInfoContext.Provider>
					</i18nContext.Provider>
				</LocationProvider>
			)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});

	test("should render email input when user didn't have email", () => {
		const fakeUserInfo = {
			country: "VN",
			langId: "en",
			accountName: "test22",
			currencyId: 51,
			phoneNo: "9875464651318",
			areaCode: "+84",
			userName: "qatest22",
			phoneVerified: false
		};

		const tree = renderer
			.create(
				<LocationProvider history={history}>
					<i18nContext.Provider value={{ i18n }}>
						<userInfoContext.Provider
							value={{
								userInfo: fakeUserInfo,
								setUserInfo: jest.fn()
							}}>
							<ProfileDetail />
						</userInfoContext.Provider>
					</i18nContext.Provider>
				</LocationProvider>
			)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});

describe("AccountName Input", () => {
	let inputBox;
	let input;
	let infoBtn;

	beforeEach(() => {
		render(
			<LocationProvider history={history}>
				<i18nContext.Provider value={{ i18n }}>
					<userInfoContext.Provider
						value={{
							userInfo: { country: null, langId: "en" },
							setUserInfo: jest.fn()
						}}>
						<ProfileDetail />
					</userInfoContext.Provider>
				</i18nContext.Provider>
			</LocationProvider>
		);
		[inputBox] = screen.getAllByTestId("accountName_inputBox");
		[input] = screen.getAllByTestId("accountName_ipt");
		[infoBtn] = screen.getAllByTestId("showTipBtn");
	});

	test("click info button showing info", () => {
		expect(inputBox).not.toHaveClass("tip");
		fireEvent.click(infoBtn);

		expect(inputBox.querySelector(".tip")).toBeInTheDocument();
		expect(inputBox.querySelector(".tip")).toHaveTextContent(
			"*FULL NAME must match name in your bank account for Instant deposit & withdrawal."
		);
		fireEvent.click(infoBtn);
		expect(inputBox).not.toHaveClass("tip");
	});

	test("enter empty string should show error tip & error icon", () => {
		fireEvent.change(input, { target: { value: "" } });
		fireEvent.blur(input);

		expect(input).toHaveValue("");
		expect(inputBox.querySelector(".tip")).toHaveClass("tip open");
		expect(inputBox.querySelector(".tip")).toHaveTextContent(
			"Please enter your real name."
		);
		expect(inputBox.querySelector(".icon-cross")).toBeVisible();
	});

	test("enter qualified accountName should reder correctly & show check mark", () => {
		fireEvent.change(input, { target: { value: "Jasmine" } });
		fireEvent.blur(input);

		expect(input).toHaveValue("Jasmine");
		expect(inputBox.querySelector(".tip")).not.toBeInTheDocument();
		expect(inputBox.querySelector(".icon-checkmark")).toBeVisible();
	});
});

describe("Email Input", () => {
	let inputBox;
	let input;
	let infoBtn;

	beforeEach(() => {
		render(
			<LocationProvider history={history}>
				<i18nContext.Provider value={{ i18n }}>
					<userInfoContext.Provider
						value={{
							userInfo: {
								perCountry: "",
								langId: "en",
								currencyId: 51
							},
							setUserInfo: jest.fn()
						}}>
						<ProfileDetail />
					</userInfoContext.Provider>
				</i18nContext.Provider>
			</LocationProvider>
		);

		[inputBox] = screen.getAllByTestId("email_inputBox");
		[input] = screen.getAllByTestId("email_ipt");
		[, infoBtn] = screen.getAllByTestId("showTipBtn");
	});

	test("click info button showing info", () => {
		expect(inputBox).not.toHaveClass("tip");

		fireEvent.click(infoBtn);
		expect(inputBox.querySelector(".tip")).toBeInTheDocument();
		expect(inputBox.querySelector(".tip")).toHaveTextContent(
			"Email cannot be changed after submission."
		);
	});

	test("should show error tip & error icon when input is empty", async () => {
		await waitFor(() => {
			fireEvent.change(input, { target: { value: "" } });
			fireEvent.blur(input);

			expect(input).toHaveValue("");
			expect(inputBox.querySelector(".tip")).toHaveClass("tip open");
			expect(inputBox.querySelector(".tip")).toHaveTextContent(
				"Mail Format is wrong."
			);
			expect(inputBox.querySelector(".icon-cross")).toBeVisible();
		});
	});

	test("should show error tip & error icon when input is not in right format", async () => {
		await waitFor(() => {
			fireEvent.change(input, { target: { value: "wersf" } });
			fireEvent.blur(input);

			expect(input).toHaveValue("wersf");
			expect(inputBox.querySelector(".tip")).toHaveClass("tip open");
			expect(inputBox.querySelector(".tip")).toHaveTextContent(
				"Mail Format is wrong."
			);
			expect(inputBox.querySelector(".icon-cross")).toBeVisible();
		});
	});

	test("enter qualified email should not showing tip & error mark", async () => {
		const mockEmailExistApi = jest.spyOn(api_site, "api_ExistsEmail");
		mockEmailExistApi.mockImplementation(() =>
			Promise.resolve({
				data: {
					data: false,
					errorCode: 0
				}
			})
		);
		await waitFor(() => {
			fireEvent.change(input, {
				target: { value: "abc@abc.com" }
			});
			fireEvent.blur(input);

			expect(input).toHaveValue("abc@abc.com");
			expect(inputBox.querySelector(".icon-checkmark")).toBeVisible();
			expect(inputBox.querySelector(".tip")).not.toBeInTheDocument();
			expect(
				inputBox.querySelector(".icon-cross")
			).not.toBeInTheDocument();
		});
	});

	test("email already exists", async () => {
		const mockEmailExistApi = jest.spyOn(api_site, "api_ExistsEmail");
		mockEmailExistApi.mockImplementation(() =>
			Promise.resolve({
				data: {
					data: true,
					errorCode: 0
				}
			})
		);
		await waitFor(() => {
			fireEvent.change(input, {
				target: { value: "bwingtest01@bwingtest01.com" }
			});
			fireEvent.blur(input);

			expect(input).toHaveValue("bwingtest01@bwingtest01.com");
			expect(inputBox.querySelector(".icon-cross")).toBeVisible();
			expect(inputBox.querySelector(".tip")).toHaveTextContent(
				"Mail already exists."
			);
			expect(inputBox.querySelector(".tip")).toHaveClass("tip open");
		});
	});
});

describe("Birthday Dropdown", () => {
	let dropdown;
	let tip;
	let infoBtn;

	beforeEach(() => {
		render(
			<LocationProvider history={history}>
				<i18nContext.Provider value={{ i18n }}>
					<userInfoContext.Provider
						value={{
							userInfo: { country: null, langId: "en" },
							setUserInfo: jest.fn()
						}}>
						<ProfileDetail />
					</userInfoContext.Provider>
				</i18nContext.Provider>
			</LocationProvider>
		);

		[dropdown] = screen.getAllByTestId("birth");
		[tip] = screen.getAllByTestId("birth_tip");
		[, , infoBtn] = screen.getAllByTestId("showTipBtn");
	});

	test("click info button showing info", () => {
		expect(tip).toBeEmptyDOMElement();

		fireEvent.click(infoBtn);
		expect(tip).toHaveTextContent("Please select your birthday.");
	});

	test("options should start from current year - 21", () => {
		const today = new Date();
		const dd =
			today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
		const mm =
			today.getMonth() + 1 < 10
				? `0${today.getMonth() + 1}`
				: today.getMonth() + 1;
		const yyyy = today.getFullYear() - 21;

		expect(dropdown.getElementsByTagName("input")[0]).toHaveAttribute(
			"max",
			`${yyyy}-${mm}-${dd}`
		);
	});

	test("should render error tip when user not select birth", () => {
		fireEvent.click(dropdown.getElementsByTagName("input")[0]);
		fireEvent.blur(dropdown.getElementsByTagName("input")[0]);

		expect(dropdown.querySelector(".icon-cross")).toBeVisible();
		expect(tip).toHaveTextContent("Please select your birthday.");
	});
});

describe("Phone Input", () => {
	let phoneCol;
	let inputBox;
	let input;
	let infoBtn;

	beforeEach(() => {
		render(
			<LocationProvider history={history}>
				<i18nContext.Provider value={{ i18n }}>
					<userInfoContext.Provider
						value={{
							userInfo: {
								perCountry: "VN",
								langId: "en",
								currencyId: 51
							},
							setUserInfo: jest.fn()
						}}>
						<ProfileDetail />
					</userInfoContext.Provider>
				</i18nContext.Provider>
			</LocationProvider>
		);

		[phoneCol] = screen.getAllByTestId("phoneCol");
		[inputBox] = screen.getAllByTestId("phone_inputBox");
		[input] = screen.getAllByTestId("phone_ipt");
		[, , , infoBtn] = screen.getAllByTestId("showTipBtn");
	});

	test("should have right areaCode", () => {
		expect(phoneCol.querySelector(".countryCode")).toHaveTextContent("+84");
	});

	test("click info button showing info", () => {
		expect(phoneCol.querySelector(".errortip")).toBeEmptyDOMElement();

		fireEvent.click(infoBtn);
		expect(phoneCol.querySelector(".errortip")).toHaveTextContent(
			"Please enter your valid phone number, it can not be changed once saved!"
		);

		fireEvent.click(infoBtn);
		expect(phoneCol.querySelector(".errortip")).toBeEmptyDOMElement();
	});

	test("onBlur when input is empty should show error tip & error icon", async () => {
		await waitFor(() => {
			fireEvent.change(input, { target: { value: "" } });
			fireEvent.blur(input);

			expect(input).toHaveValue("");
			expect(phoneCol.querySelector(".errortip")).toHaveTextContent(
				"Please enter phone number."
			);
			expect(inputBox.querySelector(".icon-cross")).toBeVisible();
		});
	});

	test("enter qualified number should not showing tip & error mark", async () => {
		const mockPhoneExistApi = jest.spyOn(
			api_account,
			"api_account_ExistsPhoneNo"
		);
		mockPhoneExistApi.mockImplementation(() =>
			Promise.resolve({
				data: {
					data: false,
					errorCode: 0
				}
			})
		);
		await waitFor(() => {
			fireEvent.change(input, {
				target: { value: "987546465" }
			});
			fireEvent.blur(input);

			expect(input).toHaveValue("987546465");
			expect(inputBox.querySelector(".icon-checkmark")).toBeVisible();
			expect(phoneCol.querySelector(".errortip")).toBeEmptyDOMElement();
			expect(
				inputBox.querySelector(".icon-cross")
			).not.toBeInTheDocument();
		});
	});

	test("phone number already exists", async () => {
		const mockPhoneExistApi = jest.spyOn(
			api_account,
			"api_account_ExistsPhoneNo"
		);
		mockPhoneExistApi.mockImplementation(() =>
			Promise.resolve({
				data: {
					data: true,
					errorCode: 0
				}
			})
		);
		await waitFor(() => {
			fireEvent.change(input, {
				target: { value: "123456" }
			});
			fireEvent.blur(input);

			expect(inputBox.querySelector(".icon-cross")).toBeVisible();
			expect(phoneCol.querySelector(".errortip")).toHaveTextContent(
				"Phone number already exists."
			);
		});
	});
});

describe("Submit Button", () => {
	let accountNameInput;
	let emailInput;
	let birthTip;
	let phoneInput;
	let submitBtn;

	beforeEach(() => {
		render(
			<LocationProvider history={history}>
				<i18nContext.Provider value={{ i18n }}>
					<userInfoContext.Provider
						value={{
							userInfo: {
								langId: "en",
								currencyId: 51
							},
							setUserInfo: jest.fn()
						}}>
						<ProfileDetail />
					</userInfoContext.Provider>
				</i18nContext.Provider>
			</LocationProvider>
		);
		[accountNameInput] = screen.getAllByTestId("accountName_inputBox");
		[emailInput] = screen.getAllByTestId("email_inputBox");
		[birthTip] = screen.getAllByTestId("birth_tip");
		[phoneInput] = screen.getAllByTestId("phoneCol");
		[submitBtn] = screen.getAllByTestId("submitBtn");
	});

	test("click button if all inputs are empty", async () => {
		await waitFor(() => {
			fireEvent.click(submitBtn);

			expect(accountNameInput.querySelector(".icon-cross")).toBeVisible();
			expect(emailInput.querySelector(".icon-cross")).toBeVisible();
			expect(phoneInput.querySelector(".icon-cross")).toBeVisible();
			expect(accountNameInput.querySelector(".tip")).toBeInTheDocument();
			expect(accountNameInput.querySelector(".tip")).toHaveTextContent(
				"Please enter your real name."
			);
			expect(birthTip).toHaveTextContent("Please select your birthday.");
			expect(emailInput.querySelector(".tip")).toBeInTheDocument();
			expect(emailInput.querySelector(".tip")).toHaveTextContent(
				"Mail Format is wrong."
			);
			expect(phoneInput.querySelector(".errortip")).toHaveTextContent(
				"Please enter phone number."
			);
		});
	});
});
