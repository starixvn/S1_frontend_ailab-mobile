import React, { useState, useContext, useRef, useEffect } from "react";
import { Redirect } from "@reach/router";
import PropTypes from "prop-types";
import Inputbox from "../common/inputbox.info";
import Dropdown from "../common/dropdown.icon";
import { i18nContext, userInfoContext, popBoxContext } from "../common/context";
import areaCode from "../../datas/areaCode";
import {
	api_SetProfile,
	api_GetCustProfile,
	api_SendOTPEmail
} from "../../service/api/accountStrict";
import { api_ExistsEmail } from "../../service/api/site";
import { api_account_ExistsPhoneNo } from "../../service/api/account";
import { defPopBoxType } from "../common/popbox";
import path from "../../path";
import { redirectToPrev } from "./profile.redirect";
import {
	monthOptions,
	initStatus,
	initUserValue,
	infoList,
	otpCol
} from "./profile.def";
import verifiedIcon from "../../styles/img/protection.png";

const Panel = () => {
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const [inputStatus, setInputStatus] = useState(initStatus);
	const [birthIdx, setBirthIdx] = useState({
		year: null,
		month: null,
		day: null
	});
	const [redirectPath, setRedirectPath] = useState(null);
	const _initUserValue = initUserValue(userInfo);
	const [userValue, setuserValue] = useState(_initUserValue);
	const country = userInfo.country ?? userInfo.perCountry;
	const _areaCode = country ? areaCode[country]?.AreaCode : "Vietnam";
	const _infoList = infoList({ i18n, userInfo, _areaCode });
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		if (isMountedRef.current && redirectPath !== null) {
			setRedirectPath(`/${path.member.root}`);
		}
	}, [redirectPath]);

	const yearOptions = [];
	const dateOptions = [];

	const startYear = GetYear();
	const month = birthIdx.month ? monthOptions[birthIdx.month].value : "";

	const _startYear = startYear - 59;
	for (let i = startYear; i >= _startYear; i--) {
		yearOptions.push({ value: i, id: i, displayText: i });
	}
	const year = birthIdx.year ? yearOptions[birthIdx.year].value : "";

	const days = GetDayOfMonth(year, month);
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
		let msg = "";

		if (userInfo.phoneNo) {
			return { checked, msg };
		}

		if (val === "" || isNaN(val)) {
			checked = false;
			msg = i18n.msg_EnterPhoneNumber;
		} else {
			try {
				const res = await api_account_ExistsPhoneNo({
					AreaCode: _areaCode,
					Phone: val
				});
				if (res.data.errorCode === 0 && res.data.data === true) {
					checked = false;
					msg = i18n.msg_PhoneExisted;
				} else if (res.data.errorCode !== 0) {
					setPopBox({
						isOpen: true,
						content: `[${res.data.errorCode}] ${res.data.message}`
					});
				}
			} catch (error) {
				setPopBox({
					isOpen: true,
					content: i18n.msg_ApiServerError
				});
			}
		}

		return { checked, msg };
	};

	const checkAccountName = val => {
		let checked = true;
		let msg = "";

		if (val === "" || val === null || val === undefined) {
			checked = false;
			msg = i18n.msg_EnterRealName;
		}

		return { checked, msg };
	};

	const checkEmail = async val => {
		let checked = true;
		let msg = "";
		const regx = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;

		if (userInfo.email) {
			return { checked, msg };
		}

		if (val === "" || val === null) {
			checked = false;
			msg = i18n.lbl_EmailRequired;
		} else if (!regx.test(val)) {
			checked = false;
			msg = i18n.msg_MailWrongFormat;
		} else {
			try {
				const res = await api_ExistsEmail({ Email: val });

				if (res.data.errorCode === 0 && res.data.data === true) {
					checked = false;
					msg = i18n.msg_MailExisted;
				} else if (res.data.errorCode !== 0) {
					setPopBox({
						isOpen: true,
						content: `[${res.data.errorCode}] ${res.data.message}`
					});
				}
			} catch (error) {
				setPopBox({
					isOpen: true,
					content: i18n.msg_ApiServerError
				});
			}
		}

		return { checked, msg };
	};

	const checkBirth = () => {
		let checked = true;
		let msg = "";

		if (userInfo.birth_d && userInfo.birth_m && userInfo.birth_y) {
			return { checked, msg };
		}

		const _year = yearOptions[birthIdx.year]?.value;
		const _month = monthOptions[birthIdx.month]?.value;
		const day = birthIdx.day + 1;

		if (!_year || !_month || !day) {
			checked = false;
			msg = i18n.msg_SelectBirthDay;
		}

		setInputStatus(prev => ({
			...prev,
			Birthday: { checked, msg }
		}));
		return { checked, msg };
	};

	const checkInputboxHandler = async (col, e) => {
		const val = e.target.value;
		let result = { checked: true, msg: "" };

		if (col === "AccountName") {
			result = checkAccountName(val);
		} else if (col === "Email") {
			result = await checkEmail(val);
		} else if (col === "PhoneNo") {
			result = await checkPhone(val);
		}

		setInputStatus(prev => ({
			...prev,
			[col]: result
		}));
	};

	const EditField = (col, e) => {
		let val = e.target.value;

		if (col === "PhoneNo") {
			val = val.replace(/^(0+)|[^\d]+/g, "");
		}

		setuserValue(prevState => ({
			...prevState,
			[col]: val
		}));
	};

	const clickInfo = ({ col, info }) => {
		const _info = inputStatus[col].msg === "" ? i18n[info] : "";
		setInputStatus(prev => ({
			...prev,
			[col]: { checked: null, msg: _info }
		}));
	};

	const checkAll = async () => {
		const result = await Promise.all([
			checkPhone(userValue.PhoneNo),
			checkEmail(userValue.Email)
		]).then(
			res => {
				const _accountNameCheck = checkAccountName(
					userValue.AccountName
				);
				const _phoneCheck = res[0];
				const _emailCheck = res[1];
				const _birthCheck = checkBirth();

				const checked =
					_accountNameCheck.checked &&
					_emailCheck.checked &&
					_phoneCheck.checked &&
					_birthCheck.checked;

				if (!checked) {
					setInputStatus(prev => ({
						...prev,
						AccountName: _accountNameCheck,
						Birthday: _birthCheck,
						PhoneNo: _phoneCheck,
						Email: _emailCheck
					}));
				}
				return checked;
			},
			() => {
				return false;
			}
		);
		return result;
	};

	const checkSubmitHandler = async () => {
		const checked = await checkAll();

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
					content: <div>{i18n.lbl_VertifyContactConfirm}</div>,
					hasBtn: true,
					btnBar: (
						<div className="btn-group">
							<button className="blue" onClick={closePopbox}>
								{i18n.lbl_Later}
							</button>
							<button
								className="orange"
								onClick={clickOtp.bind(this, otpCol.phone)}>
								{i18n.lbl_VerifyNow}
							</button>
						</div>
					)
				});
			};

			const setProfile = () => {
				const profileData = {
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
							const { errorCode, message } = response.data;
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
													content: `[${res.data.errorCode}] ${res.data.message}`
												});
											}
										}
									},
									() => {
										if (isMountedRef.current) {
											setPopBox({
												isOpen: true,
												content: i18n.msg_ApiServerError
											});
										}
									}
								);

								redirectToPrev(i18n, setPopBox, closePopbox);
							} else if (errorCode === 21) {
								setInputStatus(prev => ({
									...prev,
									Phone: { checked: false, msg: message }
								}));
							} else {
								setPopBox({
									isOpen: true,
									content: `[${errorCode}] ${message}`
								});
							}
						}
					},
					() => {
						if (isMountedRef.current) {
							setPopBox({
								isOpen: true,
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
							{i18n.lbl_Hi} {userValue.AccountName}
						</div>
						<div>{i18n.lbl_ProfileModifyWarning}</div>
					</>
				),
				hasBtn: true,
				btnBar: (
					<div className="btn-group">
						<button className="darkGray" onClick={closePopbox}>
							{i18n.lbl_Cancel}
						</button>
						<button className="lightBlue" onClick={setProfile}>
							{i18n.lbl_Submit}
						</button>
					</div>
				)
			});
		}
	};

	const clickOtp = col => {
		if (col === otpCol.phone) {
			const ClosePopbox = ({ _redirectPath }) => {
				setPopBox({ isOpen: false });
				if (_redirectPath) {
					setRedirectPath(_redirectPath);
				}
			};
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.Otp,
				ClosePopbox
			});
		} else if (otpCol.email) {
			api_SendOTPEmail().then(
				res => {
					const { errorCode, message } = res.data;
					if (errorCode === 0) {
						setPopBox({
							isOpen: true,
							content: (
								<div className="title">
									{i18n.lbl_EmailOTPHint}
								</div>
							),
							hasBtn: true,
							btnBar: (
								<div className="btn-group">
									<button
										className="lightBlue"
										onClick={() => {
											setPopBox({ isOpen: false });
										}}>
										OK
									</button>
								</div>
							)
						});
					} else {
						setPopBox({
							isOpen: true,
							content: `[${errorCode}] ${message}`
						});
					}
				},
				() => {
					setPopBox({
						isOpen: true,
						content: i18n.msg_ApiServerError
					});
				}
			);
		}
	};

	const arr = _infoList
		.filter(item => {
			return (
				userInfo[item.infoTitle] ||
				(item.infoTitle === "birth" && item.birth_d)
			);
		})
		.map(item => {
			return (
				<ColumnItem
					key={`profile-${item.infoTitle}`}
					title={item.colTitle}
					content={item.content}
					infoTitle={item.infoTitle}
					clickOtp={clickOtp}
					isVerified={item.isVerified}
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
						icon="icon icon-member"
						placeholder={i18n.lbl_RealName}
						onBlur={checkInputboxHandler.bind(null, "AccountName")}
						onChange={EditField.bind(null, "AccountName")}
						btnStatus={inputStatus.AccountName.checked}
						value={userValue.AccountName}
						clickInfo={clickInfo.bind(this, {
							col: "AccountName",
							info: "msg_ConfirmRealNameAlert"
						})}
						testAttr="accountName"
					/>
					<div
						className={`open${
							inputStatus.AccountName.checked === false
								? " errortip"
								: ""
						}`}
						data-testid="accountNameTip">
						{inputStatus.AccountName.msg}
					</div>
				</>
			) : null}

			{!userInfo.email ? (
				<>
					<Inputbox
						icon="icon icon-email"
						placeholder={i18n.lbl_Email}
						onBlur={checkInputboxHandler.bind(null, "Email")}
						onChange={EditField.bind(null, "Email")}
						btnStatus={inputStatus.Email.checked}
						value={userValue.Email}
						clickInfo={clickInfo.bind(this, {
							col: "Email",
							info: "lbl_EmailToolTip"
						})}
						testAttr="email"
					/>
					<div
						className={`open${
							inputStatus.Email.checked === false
								? " errortip"
								: ""
						}`}
						data-testid="emailTip">
						{inputStatus.Email.msg}
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
					tip={inputStatus.Birthday.msg}
					dropdownStateHandler={dropdownStateHandler}
				/>
			) : null}

			{!userInfo.phoneNo ? (
				<div className="inputBox parts" data-testid="phoneCol">
					<span className="countryCode">{_areaCode}</span>
					<Inputbox
						icon="icon icon-phone"
						inputType="tel"
						placeholder={i18n.lbl_Phone}
						onBlur={checkInputboxHandler.bind(null, "PhoneNo")}
						onChange={EditField.bind(null, "PhoneNo")}
						value={userValue.PhoneNo}
						btnStatus={inputStatus.PhoneNo.checked}
						maxLength="10"
						clickInfo={clickInfo.bind(this, {
							col: "PhoneNo",
							info: "msg_EnterPhoneNumber"
						})}
						testAttr="phone"
					/>
					<div
						className={`open${
							inputStatus.PhoneNo.checked === false
								? " errortip"
								: ""
						}`}
						data-testid="phoneTip">
						{inputStatus.PhoneNo.msg}
					</div>
				</div>
			) : null}

			{!userInfo.accountName ||
			!userInfo.birth_d ||
			!userInfo.phoneNo ||
			!userInfo.email ? (
				<div className="btn-group" data-testid="submitBtn">
					<button className="lightBlue" onClick={checkSubmitHandler}>
						{i18n.lbl_Submit}
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
				testAttr="bday_month"
			/>
			<Dropdown
				mainKey="profile-day"
				options={props.dateOptions}
				colName="bday_day"
				onSelectItem={props.dropdownStateHandler.bind(null, "day")}
				selectedIdx={props.daySelectedIdx}
				testAttr="bday_day"
			/>
			<Dropdown
				mainKey="profile-year"
				options={props.yearOptions}
				colName="bday_year"
				onSelectItem={props.dropdownStateHandler.bind(null, "year")}
				selectedIdx={props.yearSelectedIdx}
				testAttr="bday_year"
			/>
			<div className="errortip open" data-testid="birthTip">
				{props.tip}
			</div>
		</div>
	);
};

Birthday.defaultProps = {
	monthSelectedIdx: null,
	daySelectedIdx: null,
	yearSelectedIdx: null,
	tip: ""
};

Birthday.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	monthOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
	dropdownStateHandler: PropTypes.func.isRequired,
	monthSelectedIdx: PropTypes.number,
	dateOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
	daySelectedIdx: PropTypes.number,
	yearOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
	yearSelectedIdx: PropTypes.number,
	tip: PropTypes.string
};

const ColumnItem = ({
	title,
	content,
	isVerified,
	infoTitle,
	clickOtp,
	i18n
}) => {
	return (
		<li>
			<span className="title">{title}</span>
			<span>
				{content}
				{isVerified && <img src={verifiedIcon} alt="Verified" />}
			</span>
			{!isVerified && Object.values(otpCol).includes(infoTitle) && (
				<button
					className="otpBtn"
					onClick={clickOtp.bind(this, infoTitle)}>
					<span
						className={`icon ${
							infoTitle === otpCol.phone
								? "icon-mobile"
								: "icon-email"
						}`}
					/>
					<span>
						{infoTitle === otpCol.phone
							? i18n.lbl_PhoneVerification
							: i18n.lbl_EmailVerification}
					</span>
				</button>
			)}
		</li>
	);
};

ColumnItem.defaultProps = {
	isVerified: false,
	clickOtp: () => null,
	content: null
};

ColumnItem.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	title: PropTypes.string.isRequired,
	isVerified: PropTypes.bool,
	content: PropTypes.string,
	infoTitle: PropTypes.string.isRequired,
	clickOtp: PropTypes.func
};

const GetYear = () => {
	return new Date().getFullYear() - 18;
};

const GetDayOfMonth = (year, month) => {
	const d = new Date(year, month, 0);
	return d.getDate();
};

export default Panel;
