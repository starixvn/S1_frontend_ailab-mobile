import React, { useState, useContext, useRef, useEffect } from "react";
import { Redirect } from "@reach/router";
import Inputbox from "../common/inputbox";
import Dropdown from "../common/dropdown.icon";
import { i18nContext, userInfoContext, popBoxContext } from "../common/context";
import areaCode from "../../datas/areaCode";
import {
	api_SetProfile,
	api_GetCustProfile
} from "../../service/api/accountStrict";
import { api_ExistsEmail } from "../../service/api/site";
import { api_account_ExistsPhoneNo } from "../../service/api/account";
import { defPopBoxType } from "../common/popbox";
import path from "../../path";
import { redirectToPrev } from "./profile.redirect";
import {
	monthOptions,
	initWarning,
	initUserValue,
	infoList
} from "./profile.def";

const Panel = () => {
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const [warning, setWarning] = useState(initWarning);
	const [birthIdx, setBirthIdx] = useState({
		year: null,
		month: null,
		day: null
	});
	const [redirectPath, setRedirectPath] = useState(null);

	const _initUserValue = initUserValue(userInfo);
	const [userValue, setuserValue] = useState(_initUserValue);

	const country = userInfo.country ? userInfo.country : userInfo.perCountry;
	let _areaCode = country ? areaCode[country].AreaCode : "";
	let _infoList = infoList({ i18n, userInfo, _areaCode });
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => (isMountedRef.current = false);
	});

	useEffect(() => {
		if (isMountedRef.current && redirectPath !== null) {
			setRedirectPath(`/${path.member.root}`);
		}
	}, [redirectPath]);

	let yearOptions = [];
	let dateOptions = [];

	let startYear = GetYear();
	let month = birthIdx.month ? monthOptions[birthIdx.month].value : "";

	let _startYear = startYear - 59;
	for (let i = startYear; i >= _startYear; i--) {
		yearOptions.push({ value: i, id: i, displayText: i });
	}
	let year = birthIdx.year ? yearOptions[birthIdx.year].value : "";

	let days = GetDayOfMonth(year, month);
	for (let i = 1; i <= days; i++) {
		dateOptions.push({ value: i, id: i, displayText: i });
	}

	const dropdownStateHandler = (col, i) => {
		setBirthIdx(prev => ({
			...prev,
			[col]: i
		}));
	};

	const checkPhone = async val => {
		let checked = true;
		let message = "";

		if (userInfo.phoneNo) {
			return { checked, message };
		}

		if (val === "" || isNaN(val)) {
			checked = false;
			message = i18n["msg_EnterPhoneNumber"];
		} else {
			try {
				const res = await api_account_ExistsPhoneNo({
					AreaCode: _areaCode,
					Phone: val
				});
				if (res.data.errorCode === 0 && res.data.data === true) {
					checked = false;
					message = i18n["msg_PhoneExisted"];
				}
			} catch (error) {
				checked = false;
				message = i18n["msg_ApiServerError"];
			}
		}

		return { checked, message };
	};

	const checkAccountName = val => {
		let checked = true;
		let message = "";

		if (val === "" || val === null || val === undefined) {
			checked = false;
			message = i18n["msg_EnterRealName"];
		}

		return { checked, message };
	};

	const checkEmail = async val => {
		let checked = true;
		let message = "";
		const regx = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;

		if (userInfo.email) {
			return { checked, message };
		}

		if (val === "" || val === null) {
			checked = false;
			message = i18n["msg_MailWrongFormat"];
		} else if (!regx.test(val)) {
			checked = false;
			message = i18n["msg_MailWrongFormat"];
		} else {
			try {
				const res = await api_ExistsEmail({ Email: val });

				if (res.data.errorCode === 0 && res.data.data === true) {
					checked = false;
					message = i18n["msg_MailExisted"];
				}
			} catch (error) {
				checked = false;
				message = i18n.msg_ApiServerError;
			}
		}

		return { checked, message };
	};

	const checkBirth = () => {
		let checked = true;
		let message = "";

		if (userInfo.birth_d && userInfo.birth_m && userInfo.birth_y) {
			return { checked, message };
		}

		let year = yearOptions[birthIdx.year]?.value;
		let month = monthOptions[birthIdx.month]?.value;
		let day = birthIdx.day + 1;

		if (!year || !month || !day) {
			checked = false;
			message = i18n["msg_SelectBirthDay"];
		}

		return { checked, message };
	};

	const checkInputboxHandler = async (col, e) => {
		const val = e.target.value;
		let checked = true;
		let msg = "";

		if (col === "AccountName") {
			let result = checkAccountName(val);
			checked = result.checked;
			msg = result.message;
		} else if (col === "Email") {
			let result = await checkEmail(val);
			checked = result.checked;
			msg = result.message;
		} else {
			let result = await checkPhone(val);
			checked = result.checked;
			msg = result.message;
		}

		setWarning(prevState => ({
			...prevState,
			[col]: {
				status: !checked,
				msg: msg
			}
		}));
	};

	const EditField = (col, e) => {
		let val = e.target.value;

		if (col === "AccountName") {
			val = val.replace(/[^a-zA-Z\s]/g, "");
		} else if (col === "PhoneNo") {
			val = val.replace(/^(0+)|[^\d]+/g, "");
		}

		setuserValue(prevState => ({
			...prevState,
			[col]: val
		}));
	};

	const checkAll = async () => {
		return await Promise.all([
			checkPhone(userValue.PhoneNo),
			checkEmail(userValue.Email)
		]).then(
			res => {
				let _accountNameCheck = checkAccountName(userValue.AccountName);
				let _phoneCheck = res[0];
				let _emailCheck = res[1];
				let _birthCheck = checkBirth();

				let checked =
					_accountNameCheck.checked &&
					_emailCheck.checked &&
					_phoneCheck.checked &&
					_birthCheck.checked;

				if (!checked) {
					setWarning(prev => ({
						...prev,
						AccountName: {
							status: !_accountNameCheck.checked,
							msg: _accountNameCheck.message
						},
						Birthday: {
							status: !_birthCheck.checked,
							msg: _birthCheck.message
						},
						PhoneNo: {
							status: !_phoneCheck.checked,
							msg: _phoneCheck.message
						},
						Email: {
							status: !_emailCheck.checked,
							msg: _emailCheck.message
						}
					}));
				}
				return checked;
			},
			err => {
				return false;
			}
		);
	};

	const checkSubmitHandler = async () => {
		let checked = await checkAll();

		if (checked) {
			const closePopbox = ({ _redirectPath }) => {
				setPopBox({ isOpen: false });
				if (_redirectPath) {
					setRedirectPath(_redirectPath);
				}
			};

			const openOtpHint = () => {
				setPopBox({
					isOpen: true,
					title: i18n.msg_Updatesuccessful,
					content: <div>{i18n["lbl_VertifyContactConfirm"]}</div>,
					hasBtn: true,
					btnBar: (
						<div className="btn-group">
							<button className="blue" onClick={closePopbox}>
								{i18n["lbl_Later"]}
							</button>
							<button className="orange" onClick={clickOtp}>
								{i18n["lbl_VerifyNow"]}
							</button>
						</div>
					)
				});
			};

			const setProfile = () => {
				let profileData = {
					AccountName: userInfo.accountName ?? userValue.AccountName,
					Birth_d: `${birthIdx.day + 1}`,
					Birth_m: `${monthOptions[birthIdx.month]?.value}`,
					Birth_y: `${yearOptions[birthIdx.year]?.value}`,
					CountryCode: country,
					AreaCode: _areaCode,
					PhoneNo: userInfo.phoneNo ?? userValue.PhoneNo,
					Email: userInfo.email ?? userValue.Email
				};

				api_SetProfile(profileData).then(
					response => {
						if (isMountedRef.current) {
							const errorCode = response.data.errorCode;
							const message = response.data.message;

							if (errorCode === 0) {
								api_GetCustProfile().then(
									res => {
										if (isMountedRef.current) {
											if (res.data.errorCode === 0) {
												setUserInfo(prevState => ({
													...prevState,
													...res.data.data
												}));

												if (!userInfo.phoneVerified) {
													openOtpHint();
												}
											} else {
												setPopBox({
													isOpen: true,
													title:
														i18n.lbl_ImportantNote,
													content:
														response.data.message
												});
											}
										}
									},
									err => {
										if (isMountedRef.current) {
											setPopBox({
												isOpen: true,
												title: i18n.lbl_ImportantNote,
												content: i18n.msg_ApiServerError
											});
										}
									}
								);

								redirectToPrev(i18n, setPopBox, closePopbox);
							} else if (errorCode === 21) {
								setWarning(prevState => ({
									...prevState,
									Phone: { status: true, msg: message }
								}));
							} else {
								setPopBox({
									isOpen: true,
									title: i18n.lbl_ImportantNote,
									content: message
								});
							}
						}
					},
					err => {
						if (isMountedRef.current) {
							setPopBox({
								isOpen: true,
								title: i18n.lbl_ImportantNote,
								content: i18n.msg_ApiServerError
							});
						}
					}
				);
			};

			setPopBox({
				isOpen: true,
				title: i18n.lbl_ImportantNote,
				content: (
					<>
						<div className="title">
							{i18n["lbl_Hi"]} {userValue.AccountName}
						</div>
						<div>{i18n["lbl_ProfileModifyWarning"]}</div>
					</>
				),
				hasBtn: true,
				btnBar: (
					<div className="btn-group">
						<button className="blue" onClick={closePopbox}>
							{i18n["lbl_Cancel"]}
						</button>
						<button className="orange" onClick={setProfile}>
							{i18n["lbl_Submit"]}
						</button>
					</div>
				)
			});
		}
	};

	const clickOtp = () => {
		const ClosePopbox = ({ _redirectPath }) => {
			setPopBox({ isOpen: false });
			if (_redirectPath) {
				setRedirectPath(_redirectPath);
			}
		};

		setPopBox({
			isOpen: true,
			popBoxType: defPopBoxType.Otp,
			ClosePopbox: ClosePopbox
		});
	};

	let arr = _infoList
		.filter(item => {
			return (
				userInfo[item.infoTitle] ||
				(item.infoTitle === "birth" && item.birth_d)
			);
		})
		.map(item => {
			let _isVerified =
				item.infoTitle === "phoneNo" ? item.isVerified : null;

			return (
				<ColumnItem
					key={`profile-${item.infoTitle}`}
					title={item.colTitle}
					content={item.content}
					infoTitle={item.infoTitle}
					clickOtp={clickOtp}
					isVerified={_isVerified}
					i18n={i18n}
				/>
			);
		});

	return redirectPath !== null ? (
		<Redirect to={redirectPath} noThrow />
	) : (
		<>
			{!userInfo.accountName ? (
				<>
					<Inputbox
						icon="icon-member"
						inputType="text"
						placeholder={i18n["lbl_RealName"]}
						onBlur={checkInputboxHandler.bind(null, "AccountName")}
						onChange={EditField.bind(null, "AccountName")}
						WarningIcon={warning.AccountName.status}
						value={userValue.AccountName}
					/>
					<div
						className={`errortip ${
							warning.AccountName.status ? "open" : ""
						}`}>
						{warning.AccountName.msg}
					</div>
				</>
			) : null}

			{!userInfo.email ? (
				<>
					<Inputbox
						icon="icon-email"
						inputType="text"
						placeholder={i18n["lbl_Email"]}
						onBlur={checkInputboxHandler.bind(null, "Email")}
						onChange={EditField.bind(null, "Email")}
						WarningIcon={warning.Email.status}
						value={userValue.Email}
					/>
					<div
						className={`errortip ${
							warning.Email.status ? "open" : ""
						}`}>
						{warning.Email.msg}
					</div>
				</>
			) : null}

			{!userInfo.birth_d || !userInfo.birth_m || !userInfo.birth_y ? (
				<Birthday
					i18n={i18n}
					userValue={userValue}
					monthOptions={monthOptions}
					dateOptions={dateOptions}
					yearOptions={yearOptions}
					yearSelectedIdx={birthIdx.year}
					monthSelectedIdx={birthIdx.month}
					daySelectedIdx={birthIdx.day}
					Warning={warning.Birthday}
					dropdownStateHandler={dropdownStateHandler}></Birthday>
			) : null}

			{!userInfo.phoneNo ? (
				<div className="inputBox parts">
					<span className="countryCode">{_areaCode}</span>

					<Inputbox
						icon="icon-phone"
						inputType="tel"
						placeholder={i18n["lbl_Phone"]}
						onBlur={checkInputboxHandler.bind(null, "PhoneNo")}
						onChange={EditField.bind(null, "PhoneNo")}
						value={userValue.PhoneNo}
						WarningIcon={warning.PhoneNo.status}
						maxLength="10"
					/>
					<div
						className={`errortip ${
							warning.PhoneNo.status ? "open" : ""
						}`}>
						{warning.PhoneNo.msg}
					</div>
				</div>
			) : null}

			{!userInfo.accountName ||
			!userInfo.birth_d ||
			!userInfo.phoneNo ||
			!userInfo.email ? (
				<div className="btn-group">
					<button className="orange" onClick={checkSubmitHandler}>
						{i18n["lbl_Submit"]}
					</button>
				</div>
			) : null}

			<div className="info">
				<ul>{arr}</ul>
			</div>
		</>
	);
};

const Birthday = props => {
	return (
		<div className="inputBox parts">
			<Dropdown
				i18n={props.i18n}
				mainKey="profile-month"
				options={props.monthOptions}
				colName="bday_month"
				onSelectItem={props.dropdownStateHandler.bind(null, "month")}
				selectedIdx={props.monthSelectedIdx}
				icon="icon icon-cake"
			/>
			<Dropdown
				mainKey="profile-day"
				options={props.dateOptions}
				colName="bday_day"
				onSelectItem={props.dropdownStateHandler.bind(null, "day")}
				selectedIdx={props.daySelectedIdx}
			/>
			<Dropdown
				mainKey="profile-year"
				options={props.yearOptions}
				colName="bday_year"
				onSelectItem={props.dropdownStateHandler.bind(null, "year")}
				selectedIdx={props.yearSelectedIdx}
			/>
			<div className={`errortip${props.Warning.status ? " open" : ""}`}>
				{props.Warning.msg}
			</div>
		</div>
	);
};

const ColumnItem = props => {
	return (
		<li>
			<span className="title">
				{props.title}
				{props.isVerified ? (
					<i className="icon icon-checkmark"></i>
				) : null}
			</span>
			<span>{props.content}</span>
			{props.infoTitle === "phoneNo" && !props.isVerified ? (
				<button className="otpBtn" onClick={props.clickOtp}>
					<span className="icon icon-mobile"></span>
					<span>{props.i18n.lbl_MobileVerify}</span>
				</button>
			) : null}
		</li>
	);
};

const GetYear = () => {
	return new Date().getFullYear() - 21;
};

const GetDayOfMonth = (year, month) => {
	let d = new Date(year, month, 0);
	return d.getDate();
};

export default Panel;
