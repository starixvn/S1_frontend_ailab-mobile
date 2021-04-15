import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import areaCode from "../../datas/areaCode";
import { popBoxContext } from "../common/context";
import { getUrlParameter, getCookie } from "../common/common";
import { Link } from "../../route/link";
import Inputbox from "../common/inputbox.hint";
import Dropdown from "../common/dropdown";
import Birthday from "./join.birth";
import useTip from "../hook/useTip";
import TandC from "../../service/t_and_c";
import AreaCodeDropdown from "../common/dropdown.profile";
import InputboxPart from "../common/inputbox.profile";
import { GetYear, GetDayOfMonth } from "../profile/profile.detail";
import { monthOptions } from "../profile/profile.detail.def";
import api from "../../service/api";
import { GET_LANG_ID } from "../../service/language";
import { initStatus, currencyToAreacode } from "./join.def";
import { Iov_GetBlackBox } from "../common/iovation";

const JoinStep2 = ({
	i18n,
	userValue,
	hintStatus,
	setHintStatus,
	EditField,
	userInfo,
	setUserValue,
	setUserInfo
}) => {
	const { setPopBox } = useContext(popBoxContext);
	const [siteCurrency, setSiteCurrencyState] = useState([]);
	const [defaultOption, setDefaultOption] = useState(
		i18n.lbl_PrefferedCurrency
	);
	const { showTips, showTipHandler } = useTip([]);
	const isMountedRef = useRef(null);
	const defaultLangId = userInfo.langId ?? GET_LANG_ID();
	const _currencyId = siteCurrency[userValue.Currency]?.id;
	const [_areaCode, setAreaCode] = useState(null);

	const [AreaCodeIdx, setAreaCodeIdx] = useState(0);

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

	const yearOptions = [];
	const startYear = GetYear();
	for (let i = startYear; i >= startYear - 59; i--) {
		yearOptions.push({ value: i, id: i, displayText: i });
	}
	const year = userValue.Birth_y ? yearOptions[userValue.Birth_y].value : "";
	const month = userValue.Birth_m
		? monthOptions[userValue.Birth_m].value
		: "";
	const dateOptions = [];
	const days = GetDayOfMonth(year, month);
	for (let i = 1; i <= days; i++) {
		dateOptions.push({ value: i, id: i, displayText: i });
	}

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const AffId = getUrlParameter("AffId") || getCookie("AffId");
	useEffect(() => {
		if (AffId) {
			api.site.GetAffiliateAgent({ AffId }).then(
				res => {
					if (isMountedRef.current) {
						if (res.data.errorCode === 0) {
							const { currencyId } = res.data.data;
							setSiteCurrencyState([
								{
									id: currencyId,
									displayKey: `Currency_${currencyId}`
								}
							]);
						} else {
							GetSiteCurrencyList();
						}
					}
				},
				() => {
					if (isMountedRef.current) {
						setPopBox({
							isOpen: true,
							title: i18n.lbl_ImportantNote,
							content: i18n.msg_ApiServerError
						});
					}
				}
			);
		} else {
			GetSiteCurrencyList();
		}
	}, []);

	const GetSiteCurrencyList = () => {
		api.site.GetSiteCurrencyList().then(
			res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						const currencyNum = res.data.data;
						const currencyArr = currencyNum.map(id => {
							return { id, displayKey: `Currency_${id}` };
						});
						setSiteCurrencyState(() => currencyArr);
					} else {
						setPopBox({
							isOpen: true,
							title: i18n.lbl_ImportantNote,
							content: res.data.message
						});
					}
				}
			},
			() => {
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

	const birthSelect = (col, i) => {
		setUserValue(prev => ({
			...prev,
			[col]: i
		}));
	};

	const onSelectItem = i => {
		setDefaultOption(null);
		setUserValue(prev => ({ ...prev, Currency: i }));
		setHintStatus(prev => ({
			...prev,
			Currency: { checked: true, msg: "" }
		}));

		const selCurrencyId = siteCurrency[i]?.id;
		const currencyToCountryCode = selCurrencyId
			? areaCode[currencyToAreacode[selCurrencyId]]?.AreaCode
			: null;
		if (selCurrencyId !== 96) {
			setAreaCode(currencyToCountryCode);
		}
	};

	const checkValue = async (col, e) => {
		const val = e?.target?.value;
		let checked = null;
		let msg = "";

		if (col === "Email") {
			const result = await emailCheck(val);
			checked = result.checked;
			msg = result.msg;
		} else if (col === "Currency") {
			const result = currencyCheck();
			checked = result.checked;
			msg = result.msg;
		} else if (col === "Phone") {
			const result = await phoneCheck(val);
			checked = result.checked;
			msg = result.msg;
		} else if (col === "RealName") {
			const result = checkRealName({ val });
			checked = result.checked;
			msg = result.msg;
		}

		setHintStatus(prev => ({
			...prev,
			[col]: {
				checked,
				msg: msg ? i18n[msg] : ""
			}
		}));
	};

	const emailCheck = async val => {
		let checked = true;
		let msg = "";
		const regx = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;

		if (!val || !regx.test(val)) {
			checked = false;
			msg = "msg_MailWrongFormat";
		} else {
			const res = await api.site.ExistsEmail({ Email: val });
			if (res.data.errorCode === 0 && res.data.data === true) {
				checked = false;
				msg = "msg_MailExisted";
			}
		}

		return { checked, msg };
	};

	const phoneCheck = async val => {
		let checked = true;
		let msg = "";
		const regx = /^[0-9\s]*$/;

		if (!val) {
			checked = false;
			msg = "lbl_PhoneRequired";
		} else if (!regx.test(val)) {
			checked = false;
			msg = "lbl_PhoneTooltip";
		} else {
			const res = await api.site.ExistsPhoneNo({
				AreaCode:
					_currencyId === 96
						? areaCodeOptions[AreaCodeIdx].value
						: _areaCode,
				Phone: val
			});

			if (res.data.errorCode === 0 && res.data.data === true) {
				checked = false;
				msg = "msg_PhoneExisted";
			}
		}

		return { checked, msg };
	};

	const currencyCheck = () => {
		let checked = true;
		let msg = "";
		if (defaultOption !== null) {
			checked = false;
			msg = "lbl_RemindPrefferedCurrency";
		}
		return { checked, msg };
	};

	const checkRealName = ({ val }) => {
		const checked = val !== "";
		const msg = val === "" ? "msg_EnterRealName" : "";
		return { checked, msg };
	};

	const checkAll = async () => {
		try {
			const res = await Promise.all([
				phoneCheck(userValue.Phone),
				emailCheck(userValue.Email)
			]);

			const _phoneCheck = res[0];
			const _emailCheck = res[1];
			const _currencyCheck = currencyCheck();
			const _realNameCheck = checkRealName({ val: userValue.RealName });

			const checked =
				_phoneCheck.checked &&
				_emailCheck.checked &&
				_currencyCheck.checked &&
				_realNameCheck.checked;

			if (!checked) {
				setHintStatus(prev => ({
					...prev,
					Phone: {
						checked: _phoneCheck.checked,
						msg: i18n[_phoneCheck.msg]
					},
					Email: {
						checked: _emailCheck.checked,
						msg: i18n[_emailCheck.msg]
					},
					Currency: {
						checked: _currencyCheck.checked,
						msg: i18n[_currencyCheck.msg]
					},

					RealName: {
						checked: _realNameCheck.checked,
						msg: i18n[_realNameCheck.msg]
					}
				}));
			}
			return checked;
		} catch (error) {
			return false;
		}
	};

	const clickSubmit = async () => {
		const checked = await checkAll();

		if (checked) {
			const regData = {
				UserName: userValue.UserName,
				Userpwd: userValue.Password,
				Email: userValue.Email,
				PhoneNo: userValue.Phone,
				CurrencyId: _currencyId,
				UserLang: defaultLangId,
				AreaCode:
					_currencyId === 96
						? areaCodeOptions[AreaCodeIdx].value
						: _areaCode,
				PromoCode: userValue.SpecialBonusCode,
				Birth_d: userValue.Birth_d + 1,
				Birth_m: monthOptions[userValue.Birth_m]?.value,
				Birth_y: yearOptions[userValue.Birth_y]?.value,
				RealName: userValue.RealName
			};

			if (AffId) {
				const res = await api.site.GetAffiliateAgent({ AffId });
				if (res.data.errorCode === -19) {
					setHintStatus(prev => ({
						...prev,
						AffiliateId: {
							checked: false,
							msg: res.data.message
						}
					}));
				}
			}

			regData.RefId = getUrlParameter("RefId") || getCookie("RefId");
			regData.Aff = getUrlParameter("Aff") || getCookie("Aff");
			regData.AffCode =
				getUrlParameter("AffCode") ||
				getCookie("AffCode") ||
				userValue.AffiliateId;
			regData.blackbox = await Iov_GetBlackBox();

			api.site.Signup(regData, defaultLangId).then(
				response => {
					if (isMountedRef.current) {
						const { errorCode } = response.data;
						const { message } = response.data;
						setHintStatus(initStatus);
						if (errorCode === 0) {
							api.accountStrict.GetCustProfile().then(
								res_custInfo => {
									if (isMountedRef.current) {
										let _user = {
											isJoin: true,
											isLogin: true,
											langId: defaultLangId,
											userName: userValue.UserName
										};
										if (res_custInfo.data.errorCode === 0) {
											_user = {
												..._user,
												...res_custInfo.data.data
											};
										}
										setUserInfo(_user);
									}
								},
								() => {
									if (isMountedRef.current) {
										setPopBox({
											isOpen: true,
											title: i18n.lbl_ImportantNote,
											content: i18n.msg_ApiServerError
										});
									}
								}
							);
						} else if (
							errorCode === -2 ||
							errorCode === -5 ||
							errorCode === -19
						) {
							setHintStatus(prev => ({
								...prev,
								UserName: { checked: false, msg: message }
							}));
						} else if (errorCode === -3) {
							setHintStatus(prev => ({
								...prev,
								Password: { checked: false, msg: message }
							}));
						} else if (errorCode === -7) {
							setHintStatus(prev => ({
								...prev,
								SpecialBonusCode: {
									checked: false,
									msg: message
								}
							}));
						} else if (errorCode === -6) {
							setHintStatus(prev => ({
								...prev,
								Phone: { checked: false, msg: message }
							}));
						}
					}
				},
				() => {
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
	};

	return (
		<div className="Join">
			<Inputbox
				icon="icon-email"
				placeholder={i18n.lbl_Email}
				value={userValue.Email}
				onChange={EditField.bind(null, "Email")}
				onBlur={checkValue.bind(null, "Email")}
				btnStatus={hintStatus.Email.checked}
				warningMsg={hintStatus.Email.msg}
				infoText={i18n.lbl_EmailToolTip}
				clickInfo={() => showTipHandler("Email")}
				showTips={showTips.includes("Email")}
				testAttr="Email"
			/>
			<Dropdown
				mainKey="join-curr"
				colName="Currency"
				defaultOption={defaultOption}
				selectedIdx={userValue.Currency}
				options={siteCurrency}
				onSelectItem={onSelectItem}
				infoText={i18n.lbl_PreferredCurrencyToolTip}
				clickInfo={() => showTipHandler("Currency")}
				showTips={showTips.includes("Currency")}
				checked={hintStatus.Currency.checked}
				warningMsg={hintStatus.Currency.msg}
				i18n={i18n}
				testAttr="Currency"
				onBlur={checkValue.bind(null, "Currency")}
			/>
			{/* 如果userValue.Currency已選擇了才顯示 */}
			{siteCurrency?.[userValue.Currency]?.id !== 96 ? (
				<Inputbox
					icon="icon-phone"
					placeholder={i18n.lbl_Phone}
					value={userValue.Phone}
					areaCode={_areaCode}
					onChange={EditField.bind(null, "Phone")}
					btnStatus={hintStatus.Phone.checked}
					warningMsg={hintStatus.Phone.msg}
					infoText={i18n.lbl_PhoneTooltip}
					clickInfo={() => showTipHandler("Phone")}
					showTips={showTips.includes("Phone")}
					onBlur={checkValue.bind(null, "Phone")}
					testAttr="Phone"
				/>
			) : (
				<div className="infoModule parts">
					<AreaCodeDropdown
						i18n={i18n}
						mainKey="profile-areaCode"
						options={areaCodeOptions}
						colName="areaCode"
						onSelectItem={i => setAreaCodeIdx(i)}
						selectedIdx={AreaCodeIdx}
						icon="icon icon-phone"
						hideInfo={true}
					/>
					<InputboxPart
						icon="icon-phone"
						inputType="tel"
						placeholder={i18n.lbl_Phone}
						onBlur={checkValue.bind(this, "Phone")}
						onChange={EditField.bind(null, "Phone")}
						value={userValue.Phone}
						btnStatus={hintStatus.Phone.checked}
						warningMsg={hintStatus.Phone.msg}
						infoText={i18n.lbl_PhoneTooltip}
						clickInfo={() => showTipHandler("Phone")}
						showTips={showTips.includes("Phone")}
					/>
				</div>
			)}

			<Inputbox
				icon="icon-member"
				placeholder={i18n.lbl_RealName}
				value={userValue.RealName}
				onChange={EditField.bind(null, "RealName")}
				onBlur={checkValue.bind(null, "RealName")}
				btnStatus={hintStatus.RealName.checked}
				warningMsg={hintStatus.RealName.msg}
				infoText={i18n.msg_ConfirmRealNameAlert}
				clickInfo={() => showTipHandler("RealName")}
				showTips={showTips.includes("RealName")}
				testAttr="RealName"
			/>
			<Birthday
				i18n={i18n}
				monthOptions={monthOptions}
				dateOptions={dateOptions}
				yearOptions={yearOptions}
				monthSelectedIdx={userValue.Birth_m}
				daySelectedIdx={userValue.Birth_d}
				yearSelectedIdx={userValue.Birth_y}
				dropdownStateHandler={birthSelect}
				checked={hintStatus.Birth.checked}
				tip={hintStatus.Birth.msg}
			/>
			<div className="Terms">
				{i18n.lbl_Check18TC1}
				<a
					rel="noreferrer"
					target="_blank"
					href={TandC(userInfo.langId).terms}>
					{i18n.lbl_TermsConditions}
				</a>
				{i18n.lbl_Check18TC2}
			</div>
			<div className="btn-group">
				<button onClick={clickSubmit}>{i18n.lbl_Register}</button>
			</div>
			<Link to="/">
				<div className="visit">
					{i18n.lbl_IWouldLikeToVisit}
					<i className="icon icon-visit" />
				</div>
			</Link>
		</div>
	);
};

JoinStep2.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	userValue: PropTypes.objectOf(PropTypes.any).isRequired,
	hintStatus: PropTypes.objectOf(PropTypes.object).isRequired,
	setHintStatus: PropTypes.func.isRequired,
	EditField: PropTypes.func.isRequired,
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	setUserValue: PropTypes.func.isRequired,
	setUserInfo: PropTypes.func.isRequired
};

export default JoinStep2;
