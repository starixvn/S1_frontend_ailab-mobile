import React, { useState, useContext, useRef, useEffect } from "react";
import { useNavigate } from "@reach/router";
import { i18nContext, userInfoContext, popBoxContext } from "Context";
import { INPUT_PATTERN } from "@ailab-mobile/format-pattern";
import PropTypes from "prop-types";
import Inputbox from "../common/inputbox.hint";
import Dropdown from "../common/dropdown.profile";
import PhoneInputbox from "../common/inputbox.profile";
import areaCode from "../../datas/areaCode";
import useTip from "../hook/useTip";
import {
	monthOptions,
	initWarning,
	initValue,
	infoList,
	otpCol
} from "./profile.detail.def";
import { defPopBoxType } from "../common/popbox";
import { redirectToPrev } from "./profile.redirect";
import api from "../../service/api";

const Panel = () => {
	const navigate = useNavigate();
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const [userValue, setUserValue] = useState(initValue);
	const [warning, setWarning] = useState(initWarning);
	const [yearSelectedIdx, setYearSelectedIdx] = useState();
	const [monthSelectedIdx, setMonthSelectedIdx] = useState();
	const [daySelectedIdx, setDaySelectedIdx] = useState();
	const [AreaCodeIdx, setAreaCodeIdx] = useState(0);

	const { showTips, showTipHandler } = useTip();

	const isMountedRef = useRef(null);

	const _areaCode =
		userInfo?.areaCode ??
		Object.entries(areaCode).find(el => el[0] === userInfo?.perCountry)?.[1]
			?.AreaCode;

	const areaCodeOptions = Object.values(areaCode)
		.filter(
			(el, idx, self) =>
				idx === self.findIndex(t => el.AreaCode === t.AreaCode)
		)
		.map(el => ({
			value: el.AreaCode,
			id: el.AreaCode,
			displayText: el.AreaCode
		}))
		.sort((a, b) => (a.id > b.id ? 1 : -1));

	useEffect(() => {
		isMountedRef.current = true;

		setYearSelectedIdx(0);
		setMonthSelectedIdx(0);
		setDaySelectedIdx(0);
		setAreaCodeIdx(0);
		return () => {
			isMountedRef.current = false;
		};
	}, []);

	const _infoList = infoList({ i18n, userInfo }).filter(obj => !obj.type);
	const yearOptions = [];
	const dateOptions = [];

	const startYear = GetYear();
	const month =
		monthSelectedIdx === undefined
			? ""
			: monthOptions[monthSelectedIdx].value;

	const _startYear = startYear - 59;
	for (let i = startYear; i >= _startYear; i--) {
		yearOptions.push({ value: i, id: i, displayText: i });
	}
	const year =
		yearSelectedIdx === undefined ? "" : yearOptions[yearSelectedIdx].value;

	const days = GetDayOfMonth(year, month);
	for (let i = 1; i <= days; i++) {
		dateOptions.push({ value: i, id: i, displayText: i });
	}

	const dropdownStateHandler = (col, i) => {
		if (col === "bday_year") {
			setYearSelectedIdx(i);
		} else if (col === "bday_month") {
			setMonthSelectedIdx(i);
		} else if (col === "bday_day") {
			setDaySelectedIdx(i);
		} else {
			setAreaCodeIdx(i);
		}
	};

	const checkAccountName = val => {
		let checked = true;
		let msg = "";

		if (!val) {
			msg = i18n.msg_EnterRealName;
			checked = !!val;
		} else if (
			// * 如果使用者有填入特殊字元則顯示錯誤訊息
			String(val).match(INPUT_PATTERN.userNameSpecialCharactersPattern)
		) {
			msg = i18n.lbl_EnterRealName;
			checked = false;
		}

		setWarning(prevState => ({
			...prevState,
			accountName: {
				checked,
				msg
			}
		}));

		return checked;
	};

	const checkPhone = async val => {
		let checked = true;
		let tip = "";

		if (!val) {
			checked = false;
			tip = i18n.lbl_PhoneRequired;
		} else {
			try {
				const res = await api.account.ExistsPhoneNo({
					AreaCode: _areaCode ?? areaCodeOptions[AreaCodeIdx]?.value,
					Phone: val
				});

				if (res.data.errorCode === 0 && res.data.data === true) {
					checked = false;
					tip = i18n.msg_PhoneExisted;
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

		setWarning(prev => ({
			...prev,
			phoneNo: {
				checked,
				msg: tip
			}
		}));

		return checked;
	};

	const checkEmail = async val => {
		let checked = true;
		let msg = "";
		const regx = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;

		if (!val) {
			checked = false;
			msg = i18n.msg_EmailReq;
		} else if (!regx.test(val)) {
			checked = false;
			msg = i18n.msg_MailWrongFormat;
		} else {
			const res = await api.site.ExistsEmail({ Email: val });
			if (res.data?.errorCode === 0) {
				if (res.data?.data === true) {
					checked = false;
					msg = i18n.msg_MailExisted;
				} else {
					setWarning(prevState => ({
						...prevState,
						email: {
							checked,
							msg
						}
					}));
				}
			} else {
				setPopBox({
					isOpen: true,
					content: `[${res.data.errorCode}] ${res.data.message}`
				});
			}
		}

		setWarning(prevState => ({
			...prevState,
			email: {
				checked,
				msg
			}
		}));

		return { checked, msg };
	};

	const checkBirth = (_day, _month, _year) => {
		let checked = true;
		let message = "";

		if (!_day || !_month || !_year) {
			checked = false;
			message = i18n.msg_SelectBirthDay;
		}

		setWarning(prevState => ({
			...prevState,
			birth: {
				checked,
				msg: message
			}
		}));

		return checked;
	};

	const EditField = (col, e) => {
		let val = e.target.value;

		if (col === "accountName") {
			val = String(val).replace(
				INPUT_PATTERN.userNameSpecialCharactersPattern,
				""
			);
		} else if (col === "phoneNo") {
			val = val.replace(/\D/g, "");
		}

		setUserValue(prevState => ({
			...prevState,
			[col]: val
		}));
	};

	const checkAll = async () => {
		const _year = yearOptions[yearSelectedIdx]?.value;
		const _month = monthOptions[monthSelectedIdx]?.value;
		const _day = daySelectedIdx + 1;

		const accountNameCheck = userInfo.accountName
			? true
			: checkAccountName(userValue.accountName);

		const birthCheck = userInfo.birth_d
			? true
			: checkBirth(_day, _month, _year);

		let phoneCheck = false;
		if (userInfo.phoneNo) {
			phoneCheck = true;
		} else {
			phoneCheck = await checkPhone(userValue.phoneNo);
		}

		const emailCheck = userInfo.email
			? true
			: await checkEmail(userValue.email);

		const checked =
			accountNameCheck && birthCheck && phoneCheck && emailCheck;

		if (checked) {
			setUserValue(prevState => ({
				...prevState,
				Birth: `${_year} / ${_month} / ${_day}`
			}));
		}
		return checked;
	};

	const clickSubmit = async () => {
		const checked = await checkAll();
		if (checked) {
			const closePopbox = ({ _redirectPath }) => {
				setPopBox({ isOpen: false });
				if (_redirectPath) {
					navigate(`/${userInfo.langId}/${_redirectPath}`);
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
							<button className="white" onClick={closePopbox}>
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
					AccountName: userInfo.accountName ?? userValue.accountName,
					Birth_d: userInfo.birth_d ?? `${daySelectedIdx + 1}`,
					Birth_m:
						userInfo.birth_m ??
						`${monthOptions[monthSelectedIdx]?.value}`,
					Birth_y:
						userInfo.birth_y ??
						`${yearOptions[yearSelectedIdx]?.value}`,
					AreaCode: _areaCode ?? areaCodeOptions[AreaCodeIdx]?.value,
					PhoneNo: userInfo.phoneNo ?? userValue.phoneNo,
					Email: userInfo?.email ?? userValue.email
				};

				api.accountStrict.SetProfile(profileData).then(
					response => {
						if (isMountedRef.current) {
							const { errorCode, message } = response.data;

							if (errorCode === 0) {
								api.accountStrict.GetCustProfile().then(
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
								setWarning(prevState => ({
									...prevState,
									phoneNo: { checked: false, msg: message }
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
				content: userInfo.accountName
					? i18n.lbl_ProfileModifyWarning
					: i18n.msg_ConfirmRealNameAlert,
				hasBtn: true,
				btnBar: (
					<div className="btn-group">
						<button className="white" onClick={closePopbox}>
							{i18n.lbl_Cancel}
						</button>
						<button className="orange" onClick={setProfile}>
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
					navigate(`/${userInfo.langId}/${_redirectPath}`);
				}
			};

			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.Otp,
				ClosePopbox
			});
		} else if (col === otpCol.email) {
			api.accountStrict.SendOTPEmail().then(
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
										className="blue"
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
			let result =
				userInfo[item.infoTitle] ||
				(item.infoTitle === "birth" && item.birth_d);

			if (
				result &&
				(item.infoTitle === "country" ||
					item.infoTitle === "perCountry")
			) {
				result = false;
			}

			return result;
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
	return (
		<>
			{!userInfo?.accountName ? (
				<Inputbox
					icon="icon-member"
					placeholder={i18n.lbl_RealName}
					onBlur={e => checkAccountName(e.target.value)}
					onChange={EditField.bind(null, "accountName")}
					btnStatus={warning.accountName.checked}
					warningMsg={warning.accountName.msg}
					value={userValue.accountName}
					infoText={i18n.lbl_UsernameTooltip}
					clickInfo={() => showTipHandler("accountName")}
					showTips={showTips.includes("accountName")}
					testAttr="accountName"
				/>
			) : null}
			{!userInfo?.email && (
				<Inputbox
					icon="con icon-email"
					placeholder={i18n.lbl_Email}
					onBlur={e => checkEmail(e.target.value)}
					onChange={EditField.bind(null, "email")}
					btnStatus={warning.email.checked}
					warningMsg={warning.email.msg}
					value={userValue.email}
					clickInfo={() => showTipHandler("email")}
					showTips={showTips.includes("email")}
					testAttr="email"
					clickSubmit={clickSubmit}
				/>
			)}
			{!userInfo?.birth_d || !userInfo?.birth_m || !userInfo?.birth_y ? (
				<Birthday
					i18n={i18n}
					userValue={userValue}
					monthOptions={monthOptions}
					dateOptions={dateOptions}
					yearOptions={yearOptions}
					yearSelectedIdx={yearSelectedIdx}
					monthSelectedIdx={monthSelectedIdx}
					daySelectedIdx={daySelectedIdx}
					checked={warning.birth.checked}
					warningMsg={warning.birth.msg}
					tip={warning.birth.msg}
					dropdownStateHandler={dropdownStateHandler}
					testAttr="birthday"
				/>
			) : null}
			{!userInfo?.phoneNo ? (
				<div className="infoModule parts parts-xs">
					<Dropdown
						i18n={i18n}
						mainKey="profile-areaCode"
						options={areaCodeOptions}
						colName="areaCode"
						onSelectItem={dropdownStateHandler.bind(
							null,
							"areaCode"
						)}
						selectedIdx={AreaCodeIdx}
						icon="icon icon-phone"
						hideInfo={true}
						testAttr="phoneDropdown"
					/>
					<PhoneInputbox
						icon="icon-phone"
						inputType="tel"
						placeholder={i18n.lbl_Phone}
						onBlur={e => checkPhone(e.target.value)}
						onChange={EditField.bind(null, "phoneNo")}
						value={userValue.phoneNo}
						btnStatus={warning.phoneNo.checked}
						warningMsg={warning.phoneNo.msg}
						infoText={i18n.lbl_PhoneTooltip}
						clickInfo={() => showTipHandler("phoneNo")}
						showTips={showTips.includes("phoneNo")}
						testAttr="phoneInput"
					/>
				</div>
			) : null}
			{(!userInfo?.accountName ||
				!userInfo?.birth_d ||
				!userInfo?.phoneNo ||
				!userInfo?.email) && (
				<div className="btn-group" data-testid="submitBtn">
					<button onClick={clickSubmit}>{i18n.lbl_Submit}</button>
				</div>
			)}
			<div className="profile">{arr}</div>)
		</>
	);
};

const Birthday = props => {
	return (
		<div className="infoModule parts">
			<Dropdown
				i18n={props.i18n}
				mainKey="profile-month"
				options={props.monthOptions}
				colName="bday_month"
				onSelectItem={props.dropdownStateHandler.bind(
					null,
					"bday_month"
				)}
				selectedIdx={props.monthSelectedIdx}
				icon="icon icon-cake"
				hideInfo={true}
				birthDayIcon={true}
				hideTip={true}
				testAttr="bday_month"
			/>
			<Dropdown
				mainKey="profile-day"
				options={props.dateOptions}
				colName="bday_day"
				onSelectItem={props.dropdownStateHandler.bind(null, "bday_day")}
				selectedIdx={props.daySelectedIdx}
				hideInfo={true}
				hideTip={true}
				testAttr="bday_day"
			/>
			<Dropdown
				mainKey="profile-year"
				options={props.yearOptions}
				colName="bday_year"
				onSelectItem={props.dropdownStateHandler.bind(
					null,
					"bday_year"
				)}
				selectedIdx={props.yearSelectedIdx}
				hideTip={true}
				hideInfo={true}
				testAttr="bday_year"
			/>
		</div>
	);
};

Birthday.defaultProps = {
	monthSelectedIdx: null,
	daySelectedIdx: null,
	yearSelectedIdx: null
};

Birthday.propTypes = {
	monthOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
	dateOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
	yearOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
	monthSelectedIdx: PropTypes.number,
	daySelectedIdx: PropTypes.number,
	yearSelectedIdx: PropTypes.number,
	dropdownStateHandler: PropTypes.func.isRequired,
	i18n: PropTypes.objectOf(PropTypes.string).isRequired
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
		<div>
			<div>{title}</div>
			<div>
				{content}&nbsp;
				{isVerified && <span className="icon icon-Shield" />}
				{!isVerified && Object.values(otpCol).includes(infoTitle) && (
					<button
						className={`icon btn-org ${
							infoTitle === otpCol.phone
								? "icon-mobile"
								: "icon-envelope"
						}`}
						onClick={clickOtp.bind(this, infoTitle)}>
						<span>
							{infoTitle === otpCol.phone
								? i18n.lbl_MobileVerify
								: i18n.lbl_EmailVerification}
						</span>
					</button>
				)}
			</div>
		</div>
	);
};

ColumnItem.defaultProps = {
	isVerified: false,
	content: "",
	clickOtp: () => null
};

ColumnItem.propTypes = {
	title: PropTypes.string.isRequired,
	isVerified: PropTypes.bool,
	infoTitle: PropTypes.string.isRequired,
	clickOtp: PropTypes.func,
	content: PropTypes.string,
	i18n: PropTypes.objectOf(PropTypes.string).isRequired
};

export const GetYear = () => {
	return new Date().getFullYear() - 18;
};

export const GetDayOfMonth = (year, month) => {
	const d = new Date(year, month, 0);
	return d.getDate();
};

export default Panel;
