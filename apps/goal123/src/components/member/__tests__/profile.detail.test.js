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
	lbl_MobileVerify: "Mobile verification",
	lbl_Birthday: "Birthday",
	lbl_Username: "Username",
	lbl_Country: "Country",
	lbl_CountryVN: "Vietnam",
	lbl_Email: "Email",
	lbl_RegisterTime: "Register Time",
	lbl_LastLogin: "Last Login",
	msg_EnterRealName: "Please enter your real name.",
	lbl_Month1: "JAN",
	lbl_Month12: "DEC",
	lbl_PhoneRequired: "Please fill in the phone field",
	msg_PhoneExisted: "Phone number already exists.",
	msg_ConfirmRealNameAlert:
		"To ensure all transations correct, please make sure your real name is same with your bank account name",
	lbl_EmailToolTip: "Email cannot be changed after submission.",
	lbl_EmailRequired: "Please fill in the email field.",
	msg_MailExisted: "Mail already exists.",
	msg_SelectBirthDay: "Please select your birthday."
};

describe("profile detail", () => {
	test("render correctly when user haven't update profile", () => {
		const tree = renderer
			.create(
				<LocationProvider history={history}>
					<i18nContext.Provider value={{ i18n }}>
						<userInfoContext.Provider
							value={{
								userInfo: {
									country: null,
									langId: "en",
									regTime: "2020-02-15T10:17:52-04:00",
									lastLogin: "2021-06-17T16:11:45-04:00",
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
			phoneNo: "9875464651318",
			areaCode: "+84",
			regTime: "2020-02-15T10:17:52-04:00",
			lastLogin: "2021-06-17T16:11:45-04:00",
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
			phoneNo: "9875464651318",
			areaCode: "+84",
			regTime: "2020-02-15T10:17:52-04:00",
			lastLogin: "2021-06-17T16:11:45-04:00",
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
			phoneNo: "9875464651318",
			areaCode: "+84",
			regTime: "2020-02-15T10:17:52-04:00",
			lastLogin: "2021-06-17T16:11:45-04:00",
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
			regTime: "2020-02-15T10:17:52-04:00",
			lastLogin: "2021-06-17T16:11:45-04:00",
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
			phoneNo: "9875464651318",
			areaCode: "+84",
			regTime: "2020-02-15T10:17:52-04:00",
			lastLogin: "2021-06-17T16:11:45-04:00",
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
			regTime: "2020-02-15T10:17:52-04:00",
			lastLogin: "2021-06-17T16:11:45-04:00",
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
		[inputBox] = screen.getAllByTestId("accountName_inputBox");
		[input] = screen.getAllByTestId("accountName_ipt");
		[tip] = screen.getAllByTestId("accountNameTip");
		[infoBtn] = screen.getAllByTestId("showTipBtn");
	});

	test("click info button showing info", () => {
		expect(tip).toBeEmptyDOMElement();
		fireEvent.click(infoBtn);
		expect(tip).toHaveTextContent(
			"To ensure all transations correct, please make sure your real name is same with your bank account name"
		);
		fireEvent.click(infoBtn);
		expect(tip).toBeEmptyDOMElement();
	});

	test("enter empty string should show error tip & error icon", () => {
		fireEvent.change(input, { target: { value: "" } });
		fireEvent.blur(input);

		expect(input).toHaveValue("");
		expect(tip).toHaveClass("errortip");
		expect(tip).toHaveTextContent("Please enter your real name.");
		expect(inputBox.querySelector(".icon-cross")).toBeVisible();
	});

	test("enter qualified accountName should reder correctly & show check mark", () => {
		fireEvent.change(input, { target: { value: "Jasmine" } });
		fireEvent.blur(input);

		expect(input).toHaveValue("Jasmine");
		expect(tip).toBeEmptyDOMElement();
		expect(inputBox.querySelector(".icon-checkmark")).toBeVisible();
	});
});

describe("Email Input", () => {
	let inputBox;
	let input;
	let tip;
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
		[tip] = screen.getAllByTestId("emailTip");
		[, infoBtn] = screen.getAllByTestId("showTipBtn");
	});

	test("click info button showing info", () => {
		expect(tip).toBeEmptyDOMElement();

		fireEvent.click(infoBtn);
		expect(tip).toHaveTextContent(
			"Email cannot be changed after submission."
		);
	});

	test("onBlur when input is empty should show error tip & error icon", async () => {
		await waitFor(() => {
			fireEvent.change(input, { target: { value: "" } });
			fireEvent.blur(input);

			expect(input).toHaveValue("");
			expect(tip).toHaveClass("errortip");
			expect(tip).toHaveTextContent("Please fill in the email field.");
			expect(inputBox.querySelector(".icon-cross")).toBeVisible();
		});
	});

	test("enter qualified number should not showing tip & error mark", async () => {
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
			expect(tip).toBeEmptyDOMElement();
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
				target: { value: "qatest22@abc.com" }
			});
			fireEvent.blur(input);

			expect(input).toHaveValue("qatest22@abc.com");
			expect(inputBox.querySelector(".icon-cross")).toBeVisible();
			expect(tip).toHaveTextContent("Mail already exists.");
			expect(tip).toHaveClass("errortip");
		});
	});
});

describe("Birthday Component", () => {
	let bday_month;
	let bday_day;
	let bday_year;
	let yearDropdownItem;
	let monthDropdownItem;
	let dayDropdownItem;

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

		[bday_year] = screen.getAllByTestId("bday_year");
		[bday_month] = screen.getAllByTestId("bday_month");
		[bday_day] = screen.getAllByTestId("bday_day");
		yearDropdownItem = bday_year.querySelectorAll(".text");
		monthDropdownItem = bday_month.querySelectorAll(".text");
		dayDropdownItem = bday_day.querySelectorAll(".text");
	});

	test("year options should from current year -21 to current year - 80", () => {
		const currentYear = new Date().getFullYear();
		const yearItemArr = [...yearDropdownItem];
		const selectedYear = yearItemArr[0];

		expect(selectedYear).toHaveTextContent("");
		expect(yearItemArr[1]).toHaveTextContent(currentYear - 21);
		expect(yearItemArr[yearItemArr.length - 1]).toHaveTextContent(
			currentYear - 80
		);
		expect(yearItemArr).toHaveLength(61);
	});

	test("month options should be 12 months", () => {
		const monthItemArr = [...monthDropdownItem];
		const selectedMonth = monthItemArr[0];

		expect(selectedMonth).toHaveTextContent("");
		expect(monthItemArr[1]).toHaveTextContent("JAN");
		expect(monthItemArr[monthItemArr.length - 1]).toHaveTextContent("DEC");
		expect(monthItemArr).toHaveLength(13);
	});

	test("day options should have value depends on year & month", () => {
		const selectedYear = new Date().getFullYear() - 22;
		const dayItemArr = [...dayDropdownItem];

		expect(dayItemArr).toHaveLength(
			new Date(selectedYear, 1, 0).getDate() + 1
		);
		expect(dayItemArr[0]).toHaveTextContent("");
	});

	test("click dropdown should show options", () => {
		expect(bday_year).not.toHaveClass("open");
		expect(bday_month).not.toHaveClass("open");
		expect(bday_day).not.toHaveClass("open");

		fireEvent.click(bday_year);
		fireEvent.click(bday_month);
		fireEvent.click(bday_day);

		expect(bday_year).toHaveClass("open");
		expect(bday_month).toHaveClass("open");
		expect(bday_day).toHaveClass("open");
	});
});

describe("Phone Input", () => {
	let phoneCol;
	let inputBox;
	let input;
	let tip;
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
		[tip] = screen.getAllByTestId("phoneTip");
		[, , infoBtn] = screen.getAllByTestId("showTipBtn");
	});

	test("should have right areaCode", () => {
		expect(phoneCol.querySelector(".countryCode")).toHaveTextContent("+84");
	});

	test("click info button showing info", () => {
		expect(tip).toBeEmptyDOMElement();

		fireEvent.click(infoBtn);
		expect(tip).toHaveTextContent("Please enter phone number.");
	});

	test("onBlur when input is empty should show error tip & error icon", async () => {
		await waitFor(() => {
			fireEvent.change(input, { target: { value: "" } });
			fireEvent.blur(input);

			expect(input).toHaveValue("");
			expect(tip).toHaveClass("errortip");
			expect(tip).toHaveTextContent("Please enter phone number.");
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
			expect(tip).toBeEmptyDOMElement();
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
			expect(tip).toHaveTextContent("Phone number already exists.");
			expect(tip).toHaveClass("errortip");
		});
	});
});

describe("Submit Button", () => {
	let accountNameInput;
	let accountNameTip;
	let emailInput;
	let emailTip;
	let birthTip;
	let phoneInput;
	let phoneTip;
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
		[accountNameTip] = screen.getAllByTestId("accountNameTip");
		[emailInput] = screen.getAllByTestId("email_inputBox");
		[emailTip] = screen.getAllByTestId("emailTip");
		[birthTip] = screen.getAllByTestId("birthTip");
		[phoneInput] = screen.getAllByTestId("phone_inputBox");
		[phoneTip] = screen.getAllByTestId("phoneTip");
		submitBtn = screen
			.getAllByTestId("submitBtn")[0]
			.querySelector(".lightBlue");
	});

	test("click button if all inputs are empty", async () => {
		await waitFor(() => {
			fireEvent.click(submitBtn);

			expect(accountNameInput.querySelector(".icon-cross")).toBeVisible();
			expect(emailInput.querySelector(".icon-cross")).toBeVisible();
			expect(phoneInput.querySelector(".icon-cross")).toBeVisible();
			expect(accountNameTip).toHaveTextContent(
				"Please enter your real name."
			);
			expect(birthTip).toHaveTextContent("Please select your birthday.");
			expect(emailTip).toHaveTextContent(
				"Please fill in the email field."
			);
			expect(phoneTip).toHaveTextContent("Please enter phone number.");
		});
	});
});
