import React, { useState, useContext, useRef, useEffect } from "react";
import { Redirect } from "@reach/router";
import Inputbox from "../common/inputbox";
import { i18nContext, userInfoContext, popBoxContext } from "../common/context";
import areaCode from "../../datas/areaCode";
import moment from "moment";
import {
	api_SetProfile,
	api_GetCustProfile
} from "../../service/api/accountStrict";
import { api_ExistsEmail } from "../../service/api/site";
import { defPopBoxType } from "../common/popbox";
import path from "../../path";
import { Link } from "@reach/router";
import { redirectToPrev } from "./profile.redirect";
import { initWarningState, infoList, initUserValue } from "./profile.def";

const Panel = () => {
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const [warningState, setWarningState] = useState(initWarningState);
	const _initUserValue = initUserValue(userInfo);
	const [userValue, setuserValue] = useState(_initUserValue);
	const country = userInfo.country ? userInfo.country : userInfo.perCountry;
	let _areaCode = country ? areaCode[country].AreaCode : "";

	let _infoList = infoList(i18n, userInfo, _areaCode);
	const legalDate = moment().subtract(21, "year");

	const isMountedRef = useRef(null);
	const [redirectPath, setRedirectPath] = useState(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => (isMountedRef.current = false);
	});

	useEffect(() => {
		if (isMountedRef.current && redirectPath !== null) {
			setRedirectPath(`/${path.member.root}`);
		}
	}, [redirectPath]);

	const EditField = (col, e) => {
		let val = e.target.value;

		if (col === "AccountName") {
			val = val.replace(/[^a-zA-Z\s]/g, "");
		} else if (col === "PhoneNo") {
			val = val.replace(/^[^\d]+/g, "");
		}

		setuserValue(prevState => ({
			...prevState,
			[col]: val
		}));
	};

	const checkPhone = val => {
		let checked = true;
		let message = "";

		if (userInfo.phoneNo) {
			return { checked, message };
		}

		if (val === "" || isNaN(val)) {
			checked = false;
			message = i18n["msg_EnterPhoneNumber"];
		}

		return { checked, message };
	};

	const checkAccountName = val => {
		let checked = true;
		let message = "";

		if (userInfo.accountName) {
			return { checked, message };
		}

		if (val === "" || val === null || val === undefined) {
			checked = false;
			message = i18n["msg_EnterRealName"];
		}

		return { checked, message };
	};

	const checkEmail = val => {
		let checked = true;
		let message = "";
		const regx = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;

		if (userInfo.email) {
			return { checked, message };
		}

		if (val === "" || val === null) {
			checked = false;
			message = i18n["msg_MailWrongFormat"];
		} else {
			if (!regx.test(val)) {
				checked = false;
				message = i18n["msg_MailWrongFormat"];
			}
		}

		if (checked) {
			api_ExistsEmail({
				Email: val
			}).then(
				response => {
					if (isMountedRef.current) {
						const res = response.data;
						if (res.errorCode === 0) {
							if (res.data === true) {
								setWarningState(prevState => {
									return {
										...prevState,
										Email: {
											status: true,
											msg: i18n["msg_MailExisted"]
										}
									};
								});
							}
						} else {
							setPopBox({
								isOpen: true,
								title: i18n.lbl_ImportantNote,
								content: response.data.message
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
		}

		return { checked, message };
	};

	const checkBirth = val => {
		let checked = true;
		let message = "";

		if (userInfo.birth_d && userInfo.birth_m && userInfo.birth_y) {
			return { checked, message };
		}

		if (val === "" || val === null || val === undefined) {
			checked = false;
			message = i18n["msg_SelectBirthDay"];
		}

		return { checked, message };
	};

	const checkInputboxHandler = (col, e) => {
		const val = e.target.value;
		let checked = true;
		let msg = "";

		if (col === "AccountName") {
			let result = checkAccountName(val);
			checked = result.checked;
			msg = result.message;
		} else if (col === "Email") {
			let result = checkEmail(val);
			checked = result.checked;
			msg = result.message;
		} else if (col === "PhoneNo") {
			let result = checkPhone(val);
			checked = result.checked;
			msg = result.message;
		} else {
			let result = checkBirth(val);
			checked = result.checked;
			msg = result.message;
		}

		setWarningState(prevState => {
			return {
				...prevState,
				[col]: {
					status: !checked,
					msg: msg
				}
			};
		});
	};

	const checkAll = () => {
		let _accountNameCheck = checkAccountName(userValue.AccountName);
		let _emailCheck = checkEmail(userValue.Email);
		let _phoneCheck = checkPhone(userValue.PhoneNo);
		let _birthCheck = checkBirth(userValue.Birthday);

		let checked =
			_accountNameCheck.checked &&
			_emailCheck.checked &&
			_phoneCheck.checked &&
			_birthCheck.checked;

		if (!checked) {
			setWarningState(prev => ({
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
	};

	const checkSubmitHandler = () => {
		let checked = checkAll();

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
							<button className="gray" onClick={closePopbox}>
								{i18n["lbl_Later"]}
							</button>
							<button className="blue" onClick={clickOtp}>
								{i18n["lbl_VerifyNow"]}
							</button>
						</div>
					)
				});
			};

			const setProfile = () => {
				let profileData = {
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
								setWarningState(prevState => ({
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
						<button className="cancel" onClick={closePopbox}>
							{i18n["lbl_Cancel"]}
						</button>
						<button className="submit" onClick={setProfile}>
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
			<div className="info">
				<div>{i18n.lbl_ProfileModifyWarning}</div>
				<ul>{arr}</ul>
			</div>
			{!userInfo.accountName ? (
				<>
					<div className="input-title">{i18n["lbl_RealName"]}</div>
					<Inputbox
						onBlur={checkInputboxHandler.bind(null, "AccountName")}
						onChange={EditField.bind(null, "AccountName")}
						Warning={warningState.AccountName}
						value={userValue.AccountName}
					/>
				</>
			) : null}

			{!userInfo.email ? (
				<>
					<div className="input-title">{i18n["lbl_Email"]}</div>
					<Inputbox
						onBlur={checkInputboxHandler.bind(null, "Email")}
						onChange={EditField.bind(null, "Email")}
						Tips={i18n["lbl_EmailToolTip"]}
						Warning={warningState.Email}
						value={userValue.Email}
					/>
				</>
			) : null}

			{!userInfo.birth_d || !userInfo.birth_m || !userInfo.birth_y ? (
				<>
					<div className="input-title">{i18n["lbl_Birthday"]}</div>
					<Inputbox
						iconModuleName="icon-calendar"
						inputType="date"
						onChange={EditField.bind(null, "Birthday")}
						onBlur={checkInputboxHandler.bind(null, "Birthday")}
						value={userValue.Birthday}
						max={moment(legalDate).format("YYYY-MM-DD")}
						iconModuleWarning={warningState.Birthday.status}
						label={true}
						ClassName="errortip"
					/>
					<div
						className={`errortip ${
							warningState.Birthday.status ? "open" : ""
						}`}>
						{warningState.Birthday.msg}
					</div>
				</>
			) : null}

			{!userInfo.phoneNo ? (
				<>
					<div className="input-title">{i18n["lbl_Phone"]}</div>
					<div className="inputBox parts">
						<span className="countryCode">{_areaCode}</span>

						<Inputbox
							inputType="tel"
							onBlur={checkInputboxHandler.bind(null, "PhoneNo")}
							onChange={EditField.bind(null, "PhoneNo")}
							value={userValue.PhoneNo}
							WarningIcon={warningState.PhoneNo.status}
						/>
						<div
							className={`errortip ${
								warningState.PhoneNo.status ? "open" : ""
							}`}>
							{warningState.PhoneNo.msg}
						</div>
					</div>
				</>
			) : null}

			{!userInfo.accountName ||
			!userInfo.birth_d ||
			!userInfo.phoneNo ||
			!userInfo.email ? (
				<div className="btn-group">
					<Link
						className="purple"
						to={`/${path.changePassword.root}`}>
						{i18n.lbl_ChangePassword.toUpperCase()}
					</Link>
					<button className="blue" onClick={checkSubmitHandler}>
						{i18n["lbl_Submit"]}
					</button>
				</div>
			) : null}
		</>
	);
};

const ColumnItem = props => {
	return (
		<li>
			<span className="title">{props.title}</span>
			{props.infoTitle !== "phoneNo" ? (
				<span>{props.content}</span>
			) : (
				<span>
					<span>{props.content}</span>
					{props.isVerified ? (
						<span className="otpBtn ver">
							<i className="icon icon-icon32px_check">
								{props.i18n.lbl_Verified}
							</i>
						</span>
					) : (
						<button className="otpBtn" onClick={props.clickOtp}>
							<span>{props.i18n.lbl_Unverified}</span>
							<span className="icon icon-error"></span>
						</button>
					)}
				</span>
			)}
		</li>
	);
};

export default Panel;
