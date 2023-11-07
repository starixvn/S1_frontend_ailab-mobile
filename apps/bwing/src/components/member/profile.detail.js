import React, { useState, useContext, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { INPUT_PATTERN } from "@ailab-mobile/format-pattern";
import { Redirect } from "@reach/router";
import moment from "moment";
import Inputbox, { InputboxDate } from "../common/inputbox.info";
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
import { infoList, initUserValue, initStatus, otpCol } from "./profile.def";

const Panel = () => {
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const [inputStatus, setInputStatus] = useState(initStatus);
	const _initUserValue = initUserValue(userInfo);
	const [userValue, setUserValue] = useState(_initUserValue);
	const country = userInfo.country ? userInfo.country : userInfo.perCountry;
	const _areaCode = country ? areaCode[country]?.AreaCode : "";

	const _infoList = infoList(i18n, userInfo, _areaCode);
	const legalDate = moment().subtract(18, "year");

	const isMountedRef = useRef(null);
	const [redirectPath, setRedirectPath] = useState(null);

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

	const EditField = (col, e) => {
		let val = e.target.value;

		if (col === "AccountName") {
			val = String(val).replace(
				INPUT_PATTERN.userNameSpecialCharactersPattern,
				""
			);
		} else if (col === "PhoneNo") {
			val = val.replace(/^[^\d]+/g, "");
		}

		setUserValue(prevState => ({
			...prevState,
			[col]: val
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

		if (userInfo.accountName) {
			return { checked, msg };
		}

		if (val === "" || val === null || val === undefined) {
			checked = false;
			msg = i18n.msg_EnterRealName;
		} else if (
			// * 如果使用者有填入特殊字元則顯示錯誤訊息
			String(val).match(INPUT_PATTERN.userNameSpecialCharactersPattern)
		) {
			msg = i18n.lbl_EnterRealName;
			checked = false;
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
			msg = i18n.msg_MailWrongFormat;
		} else if (!regx.test(val)) {
			checked = false;
			msg = i18n.msg_MailWrongFormat;
		}

		if (checked) {
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

	const checkBirth = val => {
		let checked = true;
		let msg = "";

		if (val === "" || val === null || val === undefined) {
			checked = false;
			msg = i18n.msg_SelectBirthDay;
		} else if (moment(val).isAfter(legalDate)) {
			checked = false;
			msg = i18n.lbl_BirthdayWarn;
		}

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
		} else {
			result = checkBirth(val);
		}
		setInputStatus(prev => ({
			...prev,
			[col]: { checked: result.checked, msg: result.msg }
		}));
	};

	const checkAll = async () => {
		try {
			const res = await Promise.all([
				checkPhone(userValue.PhoneNo),
				checkEmail(userValue.Email)
			]);

			const _accountNameCheck = checkAccountName(userValue.AccountName);
			const _phoneCheck = res[0];
			const _emailCheck = res[1];
			const _birthCheck = checkBirth(userValue.Birthday);

			const checked =
				_accountNameCheck.checked &&
				_phoneCheck.checked &&
				_emailCheck.checked &&
				_birthCheck.checked;

			if (!checked) {
				setInputStatus({
					AccountName: {
						checked: _accountNameCheck.checked,
						msg: _accountNameCheck.msg
					},
					Birthday: {
						checked: _birthCheck.checked,
						msg: _birthCheck.msg
					},
					PhoneNo: {
						checked: _phoneCheck.checked,
						msg: _phoneCheck.msg
					},
					Email: {
						checked: _emailCheck.checked,
						msg: _emailCheck.msg
					}
				});
			}
			return checked;
		} catch (error) {
			return false;
		}
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
							<button className="gray" onClick={closePopbox}>
								{i18n.lbl_Later}
							</button>
							<button
								className="blue"
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
					Birth_d:
						userInfo.birth_d ?? userValue.Birthday.slice(8, 10),
					Birth_m: userInfo.birth_m ?? userValue.Birthday.slice(5, 7),
					Birth_y: userInfo.birth_y ?? userValue.Birthday.slice(0, 4),
					CountryCode: country,
					AreaCode: userInfo.areaCode ?? _areaCode,
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
						<button className="cancel" onClick={closePopbox}>
							{i18n.lbl_Cancel}
						</button>
						<button className="submit" onClick={setProfile}>
							{i18n.lbl_Confirm}
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
							content: i18n.lbl_EmailOTPHint,
							hasBtn: true,
							btnBar: (
								<div className="btn-group">
									<button
										className="submit"
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

	const clickInfo = col => {
		let _msg = "";

		if (inputStatus[col].msg === "") {
			if (col === "AccountName") {
				_msg = i18n.lbl_RemindForName;
			} else if (col === "PhoneNo") {
				_msg = i18n.lbl_PhoneTooltip;
			} else if (col === "Email") {
				_msg = i18n.lbl_EmailToolTip;
			} else if (col === "Birthday") {
				_msg = i18n.msg_SelectBirthDay;
			}
		}

		setInputStatus(prev => ({
			...prev,
			[col]: { checked: null, msg: _msg }
		}));
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
			<div className="info">
				<ul>{arr}</ul>
			</div>
			{!userInfo.accountName ? (
				<Inputbox
					title={i18n.lbl_RealName}
					onBlur={checkInputboxHandler.bind(null, "AccountName")}
					onChange={EditField.bind(null, "AccountName")}
					btnStatus={inputStatus.AccountName.checked}
					tip={inputStatus.AccountName.msg}
					value={userValue.AccountName}
					clickInfo={clickInfo.bind(this, "AccountName")}
					testAttr="accountName"
				/>
			) : null}

			{!userInfo.email ? (
				<Inputbox
					title={i18n.lbl_Email}
					onBlur={checkInputboxHandler.bind(null, "Email")}
					onChange={EditField.bind(null, "Email")}
					value={userValue.Email}
					btnStatus={inputStatus.Email.checked}
					tip={inputStatus.Email.msg}
					clickInfo={clickInfo.bind(this, "Email")}
					testAttr="email"
				/>
			) : null}

			{!userInfo.birth_d || !userInfo.birth_m || !userInfo.birth_y ? (
				<>
					<div className="input-title">{i18n.lbl_Birthday}</div>
					<InputboxDate
						onChange={EditField.bind(null, "Birthday")}
						onBlur={checkInputboxHandler.bind(null, "Birthday")}
						value={userValue.Birthday}
						max={moment(legalDate).format("YYYY-MM-DD")}
						clickInfo={clickInfo.bind(this, "Birthday")}
						btnStatus={inputStatus.Birthday.checked}
						testAttr="birth"
					/>
					<div className="errortip open" data-testid="birth_tip">
						{inputStatus.Birthday.msg}
					</div>
				</>
			) : null}

			{!userInfo.phoneNo ? (
				<>
					<div className="title">{i18n.lbl_Phone}</div>
					<div className="inputPhone parts" data-testid="phoneCol">
						<span className="countryCode">{_areaCode}</span>
						<Inputbox
							_class="input-Area"
							inputType="tel"
							onBlur={checkInputboxHandler.bind(null, "PhoneNo")}
							onChange={EditField.bind(null, "PhoneNo")}
							value={userValue.PhoneNo}
							btnStatus={inputStatus.PhoneNo.checked}
							clickInfo={clickInfo.bind(this, "PhoneNo")}
							maxLength="10"
							testAttr="phone"
						/>
						<div className="errortip open">
							{inputStatus.PhoneNo.msg}
						</div>
					</div>
				</>
			) : null}

			{!userInfo.accountName ||
			!userInfo.birth_d ||
			!userInfo.phoneNo ||
			!userInfo.email ? (
				<div className="btn-group">
					<button
						className="blue"
						onClick={checkSubmitHandler}
						data-testid="submitBtn">
						{i18n.lbl_Submit}
					</button>
				</div>
			) : null}
		</>
	);
};

const ColumnItem = ({
	i18n,
	infoTitle,
	title,
	content,
	clickOtp,
	isVerified
}) => {
	return (
		<>
			<div className="title">{title}</div>
			<li className={infoTitle === "phoneNo" ? "phone" : ""}>
				{infoTitle === "phoneNo" ? (
					<div>
						<div>{content}</div>
					</div>
				) : (
					<div>{content}</div>
				)}
			</li>
			{isVerified && (
				<button className="otpBtn ver">
					<span>{i18n.lbl_Verified}</span>
					<span className="icon icon-icon32px_check" />
				</button>
			)}
			{!isVerified && Object.values(otpCol).includes(infoTitle) && (
				<button
					className="otpBtn"
					onClick={clickOtp.bind(this, infoTitle)}>
					<span>{i18n.lbl_Unverified}</span>
					<span className="icon icon-error" />
				</button>
			)}
		</>
	);
};

ColumnItem.defaultProps = {
	clickOtp: () => null,
	isVerified: false,
	content: null
};

ColumnItem.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	infoTitle: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	content: PropTypes.string,
	clickOtp: PropTypes.func,
	isVerified: PropTypes.bool
};

export default Panel;
