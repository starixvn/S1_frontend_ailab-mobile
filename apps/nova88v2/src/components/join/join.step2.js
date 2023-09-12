import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import ReCAPTCHA from "react-google-recaptcha";
import areaCode from "../../datas/areaCode";
import { popBoxContext } from "../common/context";
import {
	getUrlParameter,
	getCookie,
	defCurrenyId,
	getCombineLangId,
	defCurrencyToLang
} from "../common/common";
import { Link } from "../../route/link";
import Inputbox from "../common/inputbox.hint";
import Dropdown from "../common/dropdown";
// import Birthday from "./join.birth";
import useTip from "../hook/useTip";
import InputboxPart from "../common/inputbox.profile";
import { GetYear, GetDayOfMonth } from "../profile/profile.detail";
import { monthOptions } from "../profile/profile.detail.def";
import api from "../../service/api";
import { GET_LANG_ID } from "../../service/language";
import {
	initStatus,
	currencyToAreacode,
	reCaptchaEnum,
	limitCountryNum
} from "./join.def";
import defLang from "../../datas/defLangs";
import { Iov_GetBlackBox } from "../common/iovation";
import { cloudBannerImgURL } from "../../config";

const areaCodeList = Object.values(areaCode).map(el => ({
	value: el.AreaCode,
	id: `${el.AreaCode} ${el.Name}`,
	displayText: `${el.AreaCode} ${el.Name}`,
	displaySelected: el.AreaCode,
	abbr: el.Abbr
}));

const JoinStep2 = ({
	i18n,
	userValue,
	hintStatus,
	setHintStatus,
	EditField,
	userInfo,
	setUserValue,
	setUserInfo,
	lineUserId,
	setStep,
	recaptchaInfo,
	siteCurrency,
	setSiteCurrencyState,
	urlAffId
}) => {
	const { setPopBox } = useContext(popBoxContext);
	const { t } = useTranslation();
	const [defaultOption, setDefaultOption] = useState(
		i18n.lbl_PrefferedCurrency
	);
	const { showTips, showTipHandler } = useTip([]);
	const isMountedRef = useRef(null);
	const defaultLangId = userInfo.langId ?? GET_LANG_ID();
	const [reCaptchaToken, setReCaptchaToken] = useState("");
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
	const _areaCode = areaCodeList[userValue?.AreaCodeIdx]?.value;

	const urlAffCode = getUrlParameter("AffCode") || getCookie("AffCode");

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const AffId = getUrlParameter("AffId") || getCookie("AffId");

	useEffect(() => {
		if (
			(!lineUserId && !AffId && !userValue?.Affiliate) ||
			// 有 userValue?.Affiliate 且 urlAffCode 有值，代表此 AffCode 為合格
			(userValue?.Affiliate && urlAffCode)
		) {
			GetSiteCurrencyList();
		} else if (AffId) {
			api.site.GetAffiliateAgent({ AffId }).then(
				res => {
					if (isMountedRef.current) {
						if (res.data?.errorCode === 0) {
							const { currencyId } = res.data.data;
							setSiteCurrencyState([
								{
									id: currencyId,
									displayKey: `Currency_${currencyId}`
								}
							]);
						} else {
							GetSiteCurrencyList();
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
		} else if (lineUserId) {
			setSiteCurrencyState([
				{
					id: defCurrenyId.THB,
					displayKey: `Currency_${defCurrenyId.THB}`
				}
			]);
		}
	}, []);

	useEffect(() => {
		if (AffId && siteCurrency.length > 0) {
			onSelectItem({ idx: 0, col: "CurrencyIdx" });
		}
	}, [siteCurrency.length]);

	const GetSiteCurrencyList = () => {
		api.site.GetSiteCurrencyList().then(
			res => {
				if (isMountedRef.current) {
					if (res.data?.errorCode === 0) {
						const currencyNum = res.data.data;
						const currencyArr = currencyNum.map(id => {
							return { id, displayKey: `Currency_${id}` };
						});
						setSiteCurrencyState(() => currencyArr);
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
	};

	// const birthSelect = (col, i) => {
	// 	setUserValue(prev => ({
	// 		...prev,
	// 		[col]: i
	// 	}));
	// };

	const onSelectItem = ({ idx, col, item }) => {
		setDefaultOption(null);

		const param = {};

		if (col === "CurrencyIdx") {
			const selCurrecnyName = currencyToAreacode[siteCurrency[idx].id];
			const areaCodeIdx = areaCodeList.findIndex(
				obj => obj.abbr === selCurrecnyName
			);
			param.CurrencyIdx = idx;
			param.AreaCodeIdx = areaCodeIdx;

			setHintStatus(prev => ({
				...prev,
				Currency: { checked: true, msg: "" }
			}));
		} else if (col === "AreaCodeIdx") {
			const areaCodeIdx = areaCodeList.findIndex(
				obj => obj.abbr === item.abbr
			);
			param.AreaCodeIdx = areaCodeIdx;
		}
		setUserValue(prev => ({ ...prev, ...param }));
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
			const result = phoneCheck(val);
			checked = result.checked;
			msg = result.msg;
		}

		setHintStatus(prev => ({
			...prev,
			[col]: {
				checked,
				msg: msg.length > 0 ? msg : ""
			}
		}));
	};

	const emailCheck = async val => {
		let checked = true;
		let msg = "";
		const regx = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;

		if (!val) {
			checked = false;
			msg = t("msg_EmailReq");
		} else if (!regx.test(val)) {
			checked = false;
			msg = t("msg_MailWrongFormat");
		} else {
			const res = await api.site.ExistsEmail({ Email: val });
			if (res.data?.errorCode === 0 && res.data?.data === true) {
				checked = false;
				msg = t("msg_MailExisted");
			} else if (res.data.errorCode !== 0) {
				setPopBox({
					isOpen: true,
					content: `[${res.data.errorCode}] ${res.data.message}`
				});
			}
		}
		return { checked, msg };
	};

	const phoneCheck = val => {
		let checked = true;
		let msg = "";
		const phoneTypeRegx = /^[0-9\s]*$/;
		const phoneLengthRegx = /^\+60[0-9]{9,10}$|\+62[0-9]{10,13}$|\+86[0-9]{10,11}$|\+91[0-9]{10}$|\+66[0-9]{9}$|\+880[0-9]{10}$|\+84[0-9]{9}$|\+855[0-9]{8,9}$/;

		if (!val || !_areaCode) {
			checked = false;
			msg = t("lbl_PhoneRequired");
		} else if (!phoneTypeRegx.test(val)) {
			checked = false;
			msg = t("lbl_PhoneTooltip");
		} else if (Object.keys(limitCountryNum).includes(_areaCode)) {
			const limitRange = limitCountryNum[_areaCode];
			if (!phoneLengthRegx.test(_areaCode + val)) {
				checked = false;
				msg = t("lbl_PhoneNumberErrorTip", {
					digitalArea: limitRange
				});
			}
		}

		// else {
		// 	const res = await api.site.ExistsPhoneNo({
		// 		AreaCode: _areaCode,
		// 		Phone: val
		// 	});

		// 	if (res.data?.errorCode === 0 && res.data?.data === true) {
		// 		checked = false;
		// 		msg = "msg_PhoneExisted";
		// 	} else if (res.data.errorCode !== 0) {
		// 		setPopBox({
		// 			isOpen: true,
		// 			content: `[${res.data.errorCode}] ${res.data.message}`
		// 		});
		// 	}
		// }
		return { checked, msg };
	};

	const currencyCheck = () => {
		let checked = true;
		let msg = "";
		if (defaultOption !== null) {
			checked = false;
			msg = t("lbl_RemindPrefferedCurrency");
		}
		return { checked, msg };
	};

	const checkAll = async () => {
		try {
			const _reCaptchaCheck =
				reCaptchaToken !== "" || recaptchaInfo.country === "CN";

			// * 機器人驗證沒過直接 return 出去
			if (!_reCaptchaCheck) return false;

			const res = await Promise.all([
				null,
				// * 世界杯期間不驗證手機，驗證會在 SignUp Api 驗證
				// phoneCheck(userValue.Phone),
				emailCheck(userValue.Email)
			]);

			const _phoneCheck = phoneCheck(userValue.Phone);
			const _emailCheck = res[1];
			const _currencyCheck = currencyCheck();

			const checked =
				_phoneCheck.checked &&
				_emailCheck.checked &&
				_currencyCheck.checked;

			if (!checked) {
				setHintStatus(prev => ({
					...prev,
					Phone: {
						checked: _phoneCheck.checked,
						msg: _phoneCheck.msg
					},
					Email: {
						checked: _emailCheck.checked,
						msg: _emailCheck.msg
					},
					Currency: {
						checked: _currencyCheck.checked,
						msg: _currencyCheck.msg
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
			const getSignupLangId = () => {
				const langList = [];
				defLang[
					defCurrencyToLang[
						siteCurrency[userValue.CurrencyIdx]?.id
					]?.toUpperCase()
				].lang.forEach(({ value }) => {
					langList.push(value);
				});
				return langList.includes(defaultLangId) ? defaultLangId : "en";
			};
			const signupLangId = getSignupLangId();
			const regData = {
				UserName: userValue.UserName,
				RealName: userValue.RealName,
				Userpwd: userValue.Password,
				Email: userValue.Email,
				PhoneNo: userValue.Phone,
				CurrencyId: siteCurrency[userValue.CurrencyIdx]?.id,
				UserLang: signupLangId,
				AreaCode: areaCodeList[userValue?.AreaCodeIdx]?.value,
				// Birth_d: userValue.Birth_d + 1,
				// Birth_m: monthOptions[userValue.Birth_m]?.value,
				// Birth_y: yearOptions[userValue.Birth_y]?.value,
				ReferralUrl: document.referrer,
				ReCaptchaToken: reCaptchaToken
			};

			regData.RefId = getUrlParameter("RefId") || getCookie("RefId");
			regData.Aff = getUrlParameter("Aff") || getCookie("Aff");
			// If userValue.affiliate means urlAffId is qualified
			regData.AffId = urlAffId && userValue.Affiliate ? urlAffId : null;
			// If no urlAffId, then userValue.affiliate is affCode (no matter url or form value)
			regData.AffCode = !urlAffId ? userValue.Affiliate : null;
			regData.blackbox = await Iov_GetBlackBox();
			regData.LineUserId = lineUserId;

			api.site.Signup(regData, signupLangId).then(
				response => {
					if (isMountedRef.current) {
						const { errorCode, message } = response.data;
						setHintStatus(initStatus);
						if (errorCode === 0) {
							api.accountStrict.GetCustProfile().then(
								res_custInfo => {
									if (isMountedRef.current) {
										let _user = {
											isJoin: true,
											isLogin: true,
											langId: signupLangId,
											userName: userValue.UserName
										};
										if (res_custInfo.data.errorCode === 0) {
											_user = {
												..._user,
												...res_custInfo.data.data
											};
										} else {
											setPopBox({
												isOpen: true,
												content: `[${res_custInfo.data.errorCode}] ${res_custInfo.data.message}`
											});
										}
										setUserInfo(_user);
										localStorage.removeItem("lineUser");
										setStep(3);
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
		}
	};

	const handleReCaptchaChange = token => {
		setReCaptchaToken(token);
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
				selectedIdx={userValue.CurrencyIdx}
				options={siteCurrency}
				onSelectItem={i => onSelectItem({ idx: i, col: "CurrencyIdx" })}
				infoText={i18n.lbl_PreferredCurrencyToolTip}
				clickInfo={() => showTipHandler("Currency")}
				showTips={showTips.includes("Currency")}
				checked={hintStatus.Currency.checked}
				warningMsg={hintStatus.Currency.msg}
				i18n={i18n}
				testAttr="Currency"
				onBlur={checkValue.bind(null, "Currency")}
				flag={true}
			/>

			<div className="infoModule parts parts-xs">
				<div
					className={`inputInfo ${
						showTips.includes("Phone") ? " active" : ""
					}`}>
					{i18n.lbl_PhoneTooltip}
				</div>
				<div className="phone">
					{siteCurrency?.[userValue.CurrencyIdx]?.id && (
						<AreaCodeDropdown
							i18n={i18n}
							options={areaCodeList}
							onSelectItem={(i, item) =>
								onSelectItem({
									idx: i,
									col: "AreaCodeIdx",
									item
								})
							}
							selectedIdx={userValue.AreaCodeIdx}
							defaultOption={_areaCode}
						/>
					)}
					<InputboxPart
						icon="icon-phone"
						inputType="tel"
						placeholder={i18n.lbl_Phone}
						onBlur={checkValue.bind(this, "Phone")}
						onChange={EditField.bind(null, "Phone")}
						value={userValue.Phone}
						clickInfo={() => showTipHandler("Phone")}
						btnStatus={hintStatus.Phone.checked}
					/>
				</div>
				<div
					className={`tip${
						hintStatus.Phone.checked === false ? " active" : ""
					}`}>
					{hintStatus.Phone.msg}
				</div>
			</div>

			{/* <Birthday
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
				testAttr="BirthDay"
			/> */}

			{Object.keys(recaptchaInfo).length > 0 &&
				recaptchaInfo.country !== "CN" && (
					<ReCAPTCHA
						class="g-recaptcha"
						sitekey={recaptchaInfo.siteKey}
						onChange={handleReCaptchaChange}
						hl={reCaptchaEnum[userInfo.langId]}
					/>
				)}

			<div className="Terms">
				{i18n.lbl_Check18TC1}
				<a
					rel="noreferrer"
					target="_blank"
					href={`${cloudBannerImgURL}/Static/${getCombineLangId(
						userInfo.langId,
						userInfo.currencyId
					)}/TermsConditions.html`}>
					{i18n.lbl_TermsConditions}
				</a>
				{i18n.lbl_Check18TC2}
			</div>
			<div className="btn-group">
				<button onClick={clickSubmit} data-testid="signUpBtn">
					{i18n.lbl_Register}
				</button>
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

JoinStep2.defaultProps = {
	lineUserId: null,
	siteCurrency: [],
	setSiteCurrencyState: () => null,
	urlAffId: null
};

JoinStep2.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	userValue: PropTypes.objectOf(PropTypes.any).isRequired,
	hintStatus: PropTypes.objectOf(PropTypes.object).isRequired,
	setHintStatus: PropTypes.func.isRequired,
	EditField: PropTypes.func.isRequired,
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	setUserValue: PropTypes.func.isRequired,
	setUserInfo: PropTypes.func.isRequired,
	lineUserId: PropTypes.string,
	setStep: PropTypes.func.isRequired,
	recaptchaInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	siteCurrency: PropTypes.arrayOf(PropTypes.object),
	setSiteCurrencyState: PropTypes.func,
	urlAffId: PropTypes.string
};

const AreaCodeDropdown = ({
	defaultOption,
	options,
	selectedIdx,
	onSelectItem,
	disabled
}) => {
	const [isOpen, setOpen] = useState(false);
	const [filterData, setFilterData] = useState({ input: "" });
	const wrapper = useRef(null);

	const useClickOutside = ref => {
		useEffect(() => {
			const handleClickOutside = e => {
				if (
					ref.current &&
					!ref.current.contains(e.target) &&
					e.target.className !== "search"
				) {
					setOpen(false);
				}
			};
			document.addEventListener("mousedown", handleClickOutside);

			return () => {
				document.removeEventListener("mousedown", handleClickOutside);
			};
		}, [ref]);
	};

	const clickDropdown = e => {
		e.preventDefault();

		if (disabled) return;

		if (e.target.className !== "search") {
			setOpen(prev => !prev);
			setFilterData({ input: "" });
		}
	};
	useClickOutside(wrapper);

	const selectItem = (e, { idx, item }) => {
		e.stopPropagation();
		setOpen(false);
		onSelectItem(idx, item);
	};

	const search = e => {
		const val = e.target.value;
		const filteredOptions = options.filter(el =>
			el.displayText.toLowerCase().includes(val.toLowerCase())
		);
		setFilterData(prev => ({ ...prev, input: val, filteredOptions }));
	};
	const _options = filterData?.filteredOptions ?? options;

	const arr = _options.map((item, i) => (
		<div
			key={`item-${item.displayText}`}
			className="dropdown-item"
			onClick={e => selectItem(e, { idx: i, item })}>
			{item.displayText}
		</div>
	));

	const selected = _options[selectedIdx]?.displayText;

	return (
		<div className="inputBox" ref={wrapper} onClick={clickDropdown}>
			<i className="icon icon-phone" />
			<button className="dropdown">
				{defaultOption ?? selected}
				<i className="icon icon-keyboard_arrow_down" />
			</button>
			<div className={`dropdown-container${isOpen ? " active" : ""}`}>
				<div className="inputBox">
					<input
						type="text"
						className="search"
						placeholder="Search"
						onChange={search}
						value={filterData?.input}
					/>
				</div>
				{arr}
			</div>
		</div>
	);
};

AreaCodeDropdown.defaultProps = {
	defaultOption: null,
	options: null,
	selectedIdx: null,
	onSelectItem: () => null,
	disabled: null
};

AreaCodeDropdown.propTypes = {
	defaultOption: PropTypes.string,
	options: PropTypes.arrayOf(PropTypes.object),
	selectedIdx: PropTypes.number,
	onSelectItem: PropTypes.func,
	disabled: PropTypes.bool
};

export default JoinStep2;
