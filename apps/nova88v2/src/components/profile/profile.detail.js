import React, { useState, useContext, useRef, useEffect } from "react";
import { useNavigate } from "@reach/router";
import { i18nContext, userInfoContext, popBoxContext } from "Context";
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
	infoList
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
	const [AreaCodeIdx, setAreaCodeIdx] = useState();

	const { showTips, showTipHandler } = useTip();

	const country =
		userInfo.country && userInfo.country !== "null"
			? userInfo.country
			: userInfo.perCountry;
	const isMountedRef = useRef(null);

	const areaCodeOptions =
		userInfo.currencyId === 96
			? Object.keys(areaCode)
					.filter(
						(el, idx, self) =>
							idx ===
							self.findIndex(
								t => areaCode[el].AreaCode === t.AreaCode
							)
					)
					.map(el => ({
						value: areaCode[el].AreaCode,
						id: areaCode[el].AreaCode,
						displayText: areaCode[el].AreaCode
					}))
					.sort((a, b) => (a.id > b.id ? 1 : -1))
			: [];

	useEffect(() => {
		isMountedRef.current = true;

		setYearSelectedIdx(1);
		setMonthSelectedIdx(1);
		setDaySelectedIdx(1);
		setAreaCodeIdx(1);
		return () => {
			isMountedRef.current = false;
		};
	}, []);

	const _infoList = infoList({ i18n, userInfo });

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
		const checked = !!val;
		const message = !val ? i18n.msg_EnterRealName : "";

		setWarning(prevState => ({
			...prevState,
			accountName: {
				checked,
				msg: message
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
				const res = await api.site.ExistsPhoneNo({
					AreaCode: areaCodeOptions[AreaCodeIdx]?.value,
					Phone: val
				});

				if (res.data.errorCode === 0 && res.data.data === true) {
					checked = false;
					tip = i18n.msg_PhoneExisted;
				}
			} catch (error) {
				checked = false;
				tip = i18n.msg_ApiServerError;
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
		const val = e.target.value;
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

		const checked = accountNameCheck && birthCheck && phoneCheck;

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
							<button className="blue" onClick={closePopbox}>
								{i18n.lbl_Later}
							</button>
							<button className="orange" onClick={clickOtp}>
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
					CountryCode: country ?? "",
					AreaCode:
						userInfo.areaCode ??
						areaCodeOptions[AreaCodeIdx]?.value,
					PhoneNo: userInfo.phoneNo ?? userValue.phoneNo
				};

				api.accountStrict.SetProfile(profileData).then(
					response => {
						if (isMountedRef.current) {
							const { errorCode } = response.data;
							const { message } = response.data;

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
									phoneNo: { checked: false, msg: message }
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
				content: userInfo.accountName
					? i18n.lbl_ProfileModifyWarning
					: i18n.msg_ConfirmRealNameAlert,
				hasBtn: true,
				btnBar: (
					<div className="btn-group">
						<button className="blue" onClick={closePopbox}>
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

	const clickOtp = () => {
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
	};

	const arr = _infoList
		.filter(item => {
			return userInfo.currencyId === 96
				? item.infoTitle !== "country" &&
						item.infoTitle !== "perCountry"
				: userInfo[item.infoTitle] ||
						(item.infoTitle === "birth" && item.birth_d);
		})
		.map(item => {
			const _isVerified =
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
				/>
			) : null}

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
				/>
			) : null}
			{!userInfo?.phoneNo ? (
				<div className="infoModule parts">
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
					/>
				</div>
			) : null}
			{!userInfo?.accountName ||
			!userInfo?.birth_d ||
			!userInfo?.phoneNo ? (
				<div className="btn-group">
					<button className="orange" onClick={clickSubmit}>
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
			/>
			<Dropdown
				mainKey="profile-day"
				options={props.dateOptions}
				colName="bday_day"
				onSelectItem={props.dropdownStateHandler.bind(null, "bday_day")}
				selectedIdx={props.daySelectedIdx}
				hideInfo={true}
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
				hideInfo={true}
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

const ColumnItem = props => {
	return (
		<>
			<li>
				<span className="title">
					{props.title}
					{props.isVerified ? (
						<i className="icon icon-checkmark" />
					) : null}
				</span>
				<span>{props.content}</span>
			</li>
			{props.infoTitle === "phoneNo" && !props.isVerified && (
				<li>
					<button className="otpBtn" onClick={props.clickOtp}>
						<span className="icon icon-mobile" />
						<span>{props.i18n.lbl_MobileVerify}</span>
					</button>
				</li>
			)}
		</>
	);
};

ColumnItem.defaultProps = {
	isVerified: false,
	content: ""
};

ColumnItem.propTypes = {
	title: PropTypes.string.isRequired,
	isVerified: PropTypes.bool,
	infoTitle: PropTypes.string.isRequired,
	clickOtp: PropTypes.func.isRequired,
	content: PropTypes.string,
	i18n: PropTypes.objectOf(PropTypes.string).isRequired
};

export const GetYear = () => {
	return new Date().getFullYear() - 21;
};

export const GetDayOfMonth = (year, month) => {
	const d = new Date(year, month, 0);
	return d.getDate();
};

export default Panel;
