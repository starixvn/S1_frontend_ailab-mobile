import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import renderer from "react-test-renderer";
import { createHistory, LocationProvider } from "@reach/router";
import ProfileDetail from "../profile.detail";
import { i18nContext, userInfoContext } from "../../common/context";
import api from "../../../service/api";

const history = createHistory(window);

const i18n = {
	lbl_RealName: "Real Name",
	lbl_UsernameTooltip:
		"For security, we suggest that your username does not contain your real name.",
	lbl_Phone: "Phone Number",
	lbl_PhoneTooltip:
		"Please enter your valid phone number, it can not be changed once saved!",
	lbl_Submit: "Submit",
	lbl_MobileVerify: "Mobile verification",
	lbl_Birthday: "Birthday",
	lbl_Username: "Username",
	lbl_Country: "Country",
	lbl_CountryMY: "Malaysia",
	lbl_Email: "Email",
	lbl_RegisterTime: "Register Time",
	lbl_LastLogin: "Last Login",
	msg_EnterRealName: "Please enter your real name.",
	lbl_Month1: "JAN",
	lbl_Month2: "FEB",
	lbl_Month12: "DEC",
	lbl_PhoneRequired: "Please fill in the phone field",
	msg_PhoneExisted: "Phone number already exists."
};

describe("Profile Detail", () => {
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
									currencyId: 2,
									email: "qatest22@abc.com",
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
			country: "MY",
			langId: "en",
			accountName: "test22",
			birth_d: "2",
			birth_m: "2",
			birth_y: "1999",
			currencyId: 2,
			phoneNo: "9875464651318",
			areaCode: "+60",
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
			country: "MY",
			langId: "en",
			accountName: "test22",
			birth_d: "2",
			birth_m: "2",
			birth_y: "1999",
			currencyId: 2,
			phoneNo: "9875464651318",
			areaCode: "+60",
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
			country: "MY",
			langId: "en",
			birth_d: "2",
			birth_m: "2",
			birth_y: "1999",
			currencyId: 2,
			phoneNo: "9875464651318",
			areaCode: "+60",
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
			country: "MY",
			langId: "en",
			accountName: "test22",
			birth_d: "2",
			birth_m: "2",
			birth_y: "1999",
			currencyId: 2,
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
			country: "MY",
			langId: "en",
			accountName: "test22",
			currencyId: 2,
			phoneNo: "9875464651318",
			areaCode: "+60",
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
});

describe("AccountName Input", () => {
	let container;
	let input;
	let tip;
	let info;

	beforeEach(() => {
		container = render(
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
		input = container.getByTestId("accountName_ipt");
		tip = container.getByTestId("accountName_msg");
		[info] = container.getAllByTestId("inputInfo");
	});

	test("should showing info when click info button", () => {
		const infoBtn = input.parentNode.querySelector(".icon-information");

		expect(info).toHaveTextContent(
			"For security, we suggest that your username does not contain your real name."
		);
		expect(info).not.toHaveClass("active");
		fireEvent.click(infoBtn);
		expect(info).toHaveClass("active");
	});

	test("should show error tip & error icon when enter empty string", () => {
		fireEvent.change(input, { target: { value: "" } });
		fireEvent.blur(input);

		expect(input).toHaveValue("");
		expect(tip).toBeVisible();
		expect(tip).toHaveTextContent("Please enter your real name.");
		expect(input.parentNode.querySelector(".icon-errormark")).toBeVisible();
		expect(
			input.parentNode.querySelector(".icon-checkmark")
		).not.toBeInTheDocument();
	});

	test("should show check mark when enter qualified accountName", () => {
		fireEvent.change(input, { target: { value: "Jasmine" } });
		fireEvent.blur(input);

		expect(input).toHaveValue("Jasmine");
		expect(tip).toBeEmptyDOMElement();
		expect(
			input.parentNode.querySelector(".icon-errormark")
		).not.toBeInTheDocument();
		expect(input.parentNode.querySelector(".icon-checkmark")).toBeVisible();
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

	test("year init selected should be current year - 22, options should from current year -22 to current year - 80", () => {
		const currentYear = new Date().getFullYear();
		const yearItemArr = [...yearDropdownItem];
		const selectedYear = yearItemArr[0];

		expect(selectedYear).toHaveTextContent(currentYear - 22);
		expect(yearItemArr[1]).toHaveTextContent(currentYear - 21);
		expect(yearItemArr[yearItemArr.length - 1]).toHaveTextContent(
			currentYear - 80
		);
		expect(yearItemArr).toHaveLength(61);
	});

	test("month init selected should be Feburary, options should be 12 months", () => {
		const monthItemArr = [...monthDropdownItem];
		const selectedMonth = monthItemArr[0];

		expect(selectedMonth).toHaveTextContent("FEB");
		expect(monthItemArr[1]).toHaveTextContent("JAN");
		expect(monthItemArr[monthItemArr.length - 1]).toHaveTextContent("DEC");
		expect(monthItemArr).toHaveLength(13);
	});

	test("day options should have value depends on year & month", () => {
		const selectedYear = new Date().getFullYear() - 22;
		const selectedMonth = 2;
		const dayItemArr = [...dayDropdownItem];

		expect(dayItemArr).toHaveLength(
			new Date(selectedYear, selectedMonth, 0).getDate() + 1
		);
		expect(dayItemArr[0]).toHaveTextContent("2");
	});

	test("click dropdown should show options", () => {
		expect(bday_year.querySelector(".dropdown-container")).not.toHaveClass(
			"active"
		);
		expect(bday_month.querySelector(".dropdown-container")).not.toHaveClass(
			"active"
		);
		expect(bday_day.querySelector(".dropdown-container")).not.toHaveClass(
			"active"
		);

		fireEvent.click(bday_year.querySelector(".dropdown"));
		fireEvent.click(bday_month.querySelector(".dropdown"));
		fireEvent.click(bday_day.querySelector(".dropdown"));

		expect(bday_year.querySelector(".dropdown-container")).toHaveClass(
			"active"
		);
		expect(bday_month.querySelector(".dropdown-container")).toHaveClass(
			"active"
		);
		expect(bday_day.querySelector(".dropdown-container")).toHaveClass(
			"active"
		);
	});
});

describe("phone input when currency is not USDT", () => {
	let inputBox;
	let tip;
	let info;
	let input;
	let infoBtn;

	beforeEach(() => {
		render(
			<LocationProvider history={history}>
				<i18nContext.Provider value={{ i18n }}>
					<userInfoContext.Provider
						value={{
							userInfo: {
								perCountry: "MY",
								langId: "en",
								currencyId: 2
							},
							setUserInfo: jest.fn()
						}}>
						<ProfileDetail />
					</userInfoContext.Provider>
				</i18nContext.Provider>
			</LocationProvider>
		);

		[inputBox, tip] = screen.getAllByTestId("phoneInput");
		[, info] = screen.getAllByTestId("inputInfo");
		input = inputBox.querySelector(".textRight");
		infoBtn = inputBox.querySelector(".icon-information");
	});

	test("should have right areaCode when perCountry is MY", () => {
		expect(inputBox.querySelectorAll(".icon")[0]).toHaveClass("icon-phone");
		expect(inputBox.querySelectorAll(".icon")[0]).toHaveTextContent("+60");
	});

	test("click info button showing info", () => {
		expect(info).toHaveTextContent(
			"Please enter your valid phone number, it can not be changed once saved!"
		);
		expect(info).not.toHaveClass("active");
		fireEvent.click(infoBtn);
		expect(info).toHaveClass("active");
	});

	test("onBlur when input is empty should show error tip & error icon", () => {
		fireEvent.change(input, { target: { value: "" } });
		fireEvent.blur(input);

		expect(input).toHaveValue("");
		expect(tip).toBeVisible();
		expect(tip).toHaveTextContent("Please fill in the phone field");
		expect(inputBox.querySelector(".icon-information")).toBeVisible();
		expect(inputBox.querySelector(".icon-errormark")).toBeVisible();
		expect(
			inputBox.querySelector(".icon-checkmark")
		).not.toBeInTheDocument();
	});

	test("enter qualified number should not showing tip & error mark", async () => {
		const mockPhoneExistApi = jest.spyOn(api.site, "ExistsPhoneNo");
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
				target: { value: "9875464651318" }
			});
			fireEvent.blur(input);

			expect(input).toHaveValue("9875464651318");
			expect(inputBox.querySelector(".icon-checkmark")).toBeVisible();
			expect(tip).toBeEmptyDOMElement();
			expect(inputBox.querySelector(".icon-information")).toBeVisible();
			expect(
				inputBox.querySelector(".icon-errormark")
			).not.toBeInTheDocument();
		});
	});

	test("phone number already exists", async () => {
		const mockPhoneExistApi = jest.spyOn(api.site, "ExistsPhoneNo");
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

			expect(inputBox.querySelector(".icon-errormark")).toBeVisible();
			expect(tip).toHaveTextContent("Phone number already exists.");
		});
	});
});

describe("phone input when currency is USDT", () => {
	let inputBox;
	let tip;
	let dropdown;
	let info;
	let input;
	let infoBtn;

	beforeEach(() => {
		render(
			<LocationProvider history={history}>
				<i18nContext.Provider value={{ i18n }}>
					<userInfoContext.Provider
						value={{
							userInfo: {
								langId: "en",
								currencyId: 96
							},
							setUserInfo: jest.fn()
						}}>
						<ProfileDetail />
					</userInfoContext.Provider>
				</i18nContext.Provider>
			</LocationProvider>
		);

		[inputBox, tip] = screen.getAllByTestId("phoneInput");
		[dropdown] = screen.getAllByTestId("phoneDropdown");
		[, info] = screen.getAllByTestId("inputInfo");
		input = inputBox.querySelector(".textRight");
		infoBtn = inputBox.querySelector(".icon-information");
	});

	test("should have areaCode dropdown", () => {
		expect(dropdown).toBeVisible();
		fireEvent.click(dropdown.querySelector(".btn"));
		expect(dropdown.querySelector(".dropdown-container")).toHaveClass(
			"active"
		);
	});

	test("click info button showing info", () => {
		expect(info).toHaveTextContent(
			"Please enter your valid phone number, it can not be changed once saved!"
		);
		expect(info).not.toHaveClass("active");
		fireEvent.click(infoBtn);
		expect(info).toHaveClass("active");
	});

	test("onBlur when input is empty should show error tip & error icon", () => {
		fireEvent.change(input, { target: { value: "" } });
		fireEvent.blur(input);

		expect(input).toHaveValue("");
		expect(tip).toBeVisible();
		expect(tip).toHaveTextContent("Please fill in the phone field");
		expect(inputBox.querySelector(".icon-information")).toBeVisible();
		expect(inputBox.querySelector(".icon-errormark")).toBeVisible();
		expect(
			inputBox.querySelector(".icon-checkmark")
		).not.toBeInTheDocument();
	});

	test("enter qualified number should not showing tip & error mark", () => {
		fireEvent.change(input, {
			target: { value: "9875464651318" }
		});
		fireEvent.blur(input);

		expect(input).toHaveValue("9875464651318");
		expect(tip).toBeEmptyDOMElement();
		expect(inputBox.querySelector(".icon-information")).toBeVisible();
		expect(
			inputBox.querySelector(".icon-errormark")
		).not.toBeInTheDocument();
	});
});

describe("submit button", () => {
	let accountNameInput;
	let accountNameTip;
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
								currencyId: 2
							},
							setUserInfo: jest.fn()
						}}>
						<ProfileDetail />
					</userInfoContext.Provider>
				</i18nContext.Provider>
			</LocationProvider>
		);
		accountNameInput = screen.getByTestId("accountName_ipt");
		accountNameTip = screen.getByTestId("accountName_msg");
		[phoneInput, phoneTip] = screen.getAllByTestId("phoneInput");
		submitBtn = screen
			.getAllByTestId("submitBtn")[0]
			.querySelector(".orange");
	});

	test("click if accountName input & phone input is empty", () => {
		fireEvent.click(submitBtn);
		expect(
			accountNameInput.parentNode.querySelector(".icon-errormark")
		).toBeVisible();
		expect(
			phoneInput.parentNode.querySelector(".icon-errormark")
		).toBeVisible();
		expect(accountNameTip).toHaveTextContent(
			"Please enter your real name."
		);
		expect(phoneTip).toHaveTextContent("Please fill in the phone field");
	});
});
