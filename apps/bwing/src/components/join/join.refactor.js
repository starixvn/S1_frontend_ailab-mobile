import React, { useEffect, useState, useContext, useRef } from "react";
import { useMatch, useNavigate } from "@reach/router";
import Inputbox from "../common/inputbox.info";
import InputboxPWD from "../common/inputbox.password.info";
import Dropdown from "../common/dropdown";
import Checkbox from "../common/checkbox";
import Tips from "./tips";
import {
	api_ExistsUserName,
	api_GetSiteCurrencyList,
	api_GetBanner,
	api_site_Signup,
	api_site_ExistsPhoneNo,
	api_site_GetAffiliateAgent
} from "../../service/api/site";
import { api_GetCustProfile } from "../../service/api/accountStrict";
import { getUrlParameter, readCookie, passwordCheck } from "../common/common";
import {
	userInfoContext,
	i18nContext,
	navContext,
	defNavPanel,
	popBoxContext
} from "../common/context";
import TandC from "../../service/t_and_c";
import path from "../../path";
import config from "../../config";
import PromoPopup from "./join.promotion";
import Logo from "../img/logo";
import areaCode from "../../datas/areaCode";
import { initValue, initStatus, currencyToAreacode } from "./join.def";

const Join = () => {
	const navigate = useNavigate();
	const { i18n } = useContext(i18nContext);
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { nav, setNav } = useContext(navContext);
	const [userValue, setUserValue] = useState(initValue);
	const [siteCurrencyList, setSiteCurrencyList] = useState([]);
	const [banner, setBanner] = useState([]);
	const [affiliateidExist, setAffiliateidExist] = useState(null);
	const [inputStatus, setInputStatus] = useState(initStatus);
	const [promoPopup, setPromoPopup] = useState(false);
	const isMountedRef = useRef(null);

	const currencyToCountryCode = currencyToAreacode[51];
	const _areaCode = areaCode[currencyToCountryCode]?.AreaCode;

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		const refId = readCookie("RefId");
		const showBylink = window.location.pathname === `/${path.join.root}`;
		const openPanel = showBylink || nav === defNavPanel.join;
		if (refId && openPanel) {
			api_GetBanner("Promotion", refId, userInfo.langId).then(res => {
				if (res.data.errorCode === 0 && isMountedRef.current) {
					if (res.data.data.length > 0) {
						setBanner(res.data.data);
						setPromoPopup(true);
					}
				}
			});
		}
	}, [nav, userInfo.langId]);

	const AffId = getUrlParameter("AffId") || readCookie("AffId");
	useEffect(() => {
		const AffCode = getUrlParameter("AffCode") || readCookie("AffCode");
		if (AffId) {
			setAffiliateidExist(AffId);
			api_site_GetAffiliateAgent({ AffId }).then(
				res => {
					if (isMountedRef.current) {
						if (res.data.errorCode === 0) {
							const { currencyId } = res.data.data;
							const currencyData = {
								id: currencyId,
								displayKey: `Currency_${currencyId}`
							};
							setSiteCurrencyList(() => [currencyData]);
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
			if (AffCode) {
				setAffiliateidExist(AffCode);
			}
			GetSiteCurrencyList();
		}
	}, []);

	const GetSiteCurrencyList = () => {
		api_GetSiteCurrencyList().then(
			res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						const currencyNum = res.data.data;
						const currencyArr = currencyNum.map(id => {
							return { id, displayKey: `Currency_${id}` };
						});
						setSiteCurrencyList(() => currencyArr);
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

	const checkValue = async ({ col }, e) => {
		const val = e.target.value;
		let result = { checked: true, msg: "" };

		if (col === "UserName") {
			result = await userNameCheck({ val });
		} else if (col === "Password") {
			result = passwordCheck({ val, i18n });
		} else if (col === "Phone") {
			result = await phoneCheck({ val });
		}

		setInputStatus(prev => ({
			...prev,
			[col]: {
				checked: result.checked,
				msg: result.msg ?? ""
			}
		}));
	};

	const userNameCheck = async ({ val }) => {
		let checked = true;
		let msg = "";

		const regx = /^[A-Za-z][A-Za-z0-9]*$/;
		if (!val) {
			checked = false;
			msg = i18n.msg_UsernameReq;
		} else if (val.length < 6 || val.length > 18) {
			checked = false;
			msg = i18n.msg_UsernameLength;
		} else if (!regx.test(val)) {
			checked = false;
			msg = i18n.lbl_UserNameCheckTooltip;
		} else {
			const res = await api_ExistsUserName({
				UserName: val,
				langId: userInfo.langId
			});
			if (res.data.errorCode === 0 && res.data.data === true) {
				checked = false;
				msg = res.data.message;
			}
		}

		return { checked, msg };
	};

	const phoneCheck = async ({ val }) => {
		let checked = true;
		let msg = "";
		const regx = /^[0-9\s]*$/;

		if (!val) {
			checked = false;
			msg = i18n.lbl_PhoneRequired;
		} else if (val.length < 9 || !regx.test(val)) {
			checked = false;
			msg = i18n.lbl_PhoneTooltip;
		} else {
			const res = await api_site_ExistsPhoneNo({
				AreaCode: _areaCode,
				Phone: val
			});
			if (res.data.errorCode === 0 && res.data.data === true) {
				checked = false;
				msg = i18n.msg_PhoneExisted;
			}
		}

		return { checked, msg };
	};

	const selectCurrency = i => {
		setInputStatus(prev => ({
			...prev,
			Currency: {
				checked: true,
				msg: i18n.lbl_PreferredCurrencyToolTip
			}
		}));
		setUserValue(prev => ({
			...prev,
			Currency: i
		}));
	};

	const EditField = ({ col }, e) => {
		const val = col.includes("Check") ? !userValue[col] : e.target.value;
		setUserValue(prev => ({
			...prev,
			[col]: val
		}));
	};

	const clickInfo = ({ col, info }) => {
		const _info = inputStatus[col].msg === "" ? i18n[info] : "";
		setInputStatus(prev => ({
			...prev,
			[col]: {
				checked: null,
				msg: _info
			}
		}));
	};

	const clickSubmit = async () => {
		let checked = null;
		const UserNameCheck = await userNameCheck({ val: userValue.UserName });
		const PasswordCheck = passwordCheck({ val: userValue.Password, i18n });
		const PhoneCheck = await phoneCheck({ val: userValue.Phone });
		const CheckboxCheck = userValue.termsCheck && userValue.ageCheck;

		checked =
			UserNameCheck.checked &&
			PasswordCheck.checked &&
			PhoneCheck.checked &&
			CheckboxCheck;

		if (checked) {
			const regData = {
				UserName: userValue.UserName,
				Userpwd: userValue.Password,
				CurrencyId: siteCurrencyList[userValue.Currency]?.id,
				UserLang: userInfo.langId,
				PhoneNo: userValue.Phone,
				AreaCode: _areaCode,
				PromoCode: userValue.SpecialBonusCode
			};

			if (AffId) {
				const res = await api_site_GetAffiliateAgent({ AffId });
				if (res.data.errorCode === 0) {
					regData.AffId =
						getUrlParameter("AffId") || getCookie("AffId");
				}
			}

			regData.RefId = getUrlParameter("RefId") || readCookie("RefId");
			regData.Aff = getUrlParameter("Aff") || readCookie("Aff");
			regData.AffCode =
				getUrlParameter("AffCode") ||
				readCookie("AffCode") ||
				userValue.AffiliateId;

			api_site_Signup(regData, userInfo.langId).then(
				response => {
					if (isMountedRef.current) {
						const { message, errorCode } = response.data;
						if (errorCode === 0) {
							api_GetCustProfile().then(
								res_custInfo => {
									if (isMountedRef.current) {
										let _user = {
											isLogin: true,
											langId: userInfo.langId,
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
							setNav(null);
						} else if (
							errorCode === -2 ||
							errorCode === -5 ||
							errorCode === -19
						) {
							setInputStatus(prevState => ({
								...prevState,
								UserName: { checked: false, msg: message }
							}));
						} else if (errorCode === -3) {
							setInputStatus(prevState => ({
								...prevState,
								Password: { checked: false, msg: message }
							}));
						} else if (errorCode === -7) {
							setInputStatus(prevState => ({
								...prevState,
								SpecialBonusCode: {
									checked: false,
									msg: message
								}
							}));
						} else {
							setPopBox({
								isOpen: true,
								title: i18n.lbl_ImportantNote,
								content: `[${errorCode}]${message}`
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
		} else {
			setInputStatus(prev => ({
				...prev,
				UserName: {
					checked: UserNameCheck.checked,
					msg: UserNameCheck.msg
				},
				Password: {
					checked: PasswordCheck.checked,
					msg: PasswordCheck.msg
				},
				Phone: {
					checked: PhoneCheck.checked,
					msg: PhoneCheck.msg
				},
				Checkbox: {
					checked: userValue.termsCheck && userValue.ageCheck,
					msg: i18n.lbl_Check18TCTooltip
				}
			}));
		}
	};

	const handleJoinPanel = (show, reset, showBylink) => {
		if (reset) {
			setUserValue({
				...initValue
			});
			setInputStatus(initStatus);
		}

		if (showBylink) {
			navigate("/");
		} else {
			setNav(() => {
				const newState = show ? null : defNavPanel.join;
				return newState;
			});
		}
	};

	const showBylink = useMatch(path.join.root);
	const openPanel = showBylink || nav === defNavPanel.join;

	const ClosePromoPopup = () => {
		setPromoPopup(false);
	};

	return (
		<>
			<button onClick={handleJoinPanel.bind(this, openPanel)}>
				{i18n.lbl_JoinNow.toUpperCase()}
			</button>
			<div className={`Join${openPanel ? " open" : ""}`}>
				<div
					className={`close${openPanel ? " open" : ""}`}
					onClick={handleJoinPanel.bind(
						this,
						openPanel,
						true,
						showBylink
					)}>
					<span />
					<span />
					<span />
					<span />
					<span />
					<span />
				</div>
				<Logo />
				<div className="title">{i18n.lbl_JoinNow}</div>
				<Inputbox
					icon="icon icon-member"
					placeholder={i18n.lbl_Username}
					onBlur={checkValue.bind(this, { col: "UserName" })}
					onChange={EditField.bind(this, { col: "UserName" })}
					value={userValue.UserName}
					tip={inputStatus.UserName.msg}
					btnStatus={inputStatus.UserName.checked}
					clickInfo={clickInfo.bind(this, {
						col: "UserName",
						info: "lbl_UsernameTooltip"
					})}
				/>
				<InputboxPWD
					placeholder={i18n.lbl_Password}
					onBlur={checkValue.bind(this, { col: "Password" })}
					onChange={EditField.bind(this, { col: "Password" })}
					value={userValue.Password}
					tip={inputStatus.Password.msg}
					btnStatus={inputStatus.Password.checked}
					clickInfo={clickInfo.bind(this, {
						col: "Password",
						info: "lbl_PasswordTooltip"
					})}
				/>
				<div className="inputBox">
					<Dropdown
						mainKey="join-curr"
						colName="Currency"
						selectedIdx={userValue.Currency}
						options={siteCurrencyList}
						onSelectItem={selectCurrency}
						i18n={i18n}
					/>
					<Tips
						Icon="icon-coin-dollar"
						IsOpen={inputStatus.Currency.checked}
						ClassName="JoinRule">
						{inputStatus.Currency.msg}
					</Tips>
				</div>
				<div className="inputPhone parts">
					<span className="countryCode">{_areaCode}</span>
					<Inputbox
						icon="icon icon-phone"
						inputType="tel"
						placeholder={i18n.lbl_Phone}
						value={userValue.Phone}
						onBlur={checkValue.bind(this, { col: "Phone" })}
						onChange={EditField.bind(this, { col: "Phone" })}
						btnStatus={inputStatus.Phone.checked}
						clickInfo={clickInfo.bind(this, {
							col: "Phone",
							info: "lbl_PhoneTooltip"
						})}
					/>
					<div className="errortip open">{inputStatus.Phone.msg}</div>
				</div>
				<Inputbox
					icon="icon icon-affiliate"
					placeholder={i18n.lbl_Affiliate_ID}
					value={affiliateidExist ?? userValue.AffiliateId}
					onChange={EditField.bind(this, { col: "AffiliateId" })}
					btnStatus={inputStatus.AffiliateId.checked}
					tip={inputStatus.AffiliateId.msg}
					clickInfo={clickInfo.bind(this, {
						col: "AffiliateId",
						info: "lbl_Please_enter_Affiliate_ID"
					})}
					disabled={affiliateidExist}
				/>
				<div className="Terms">
					<Checkbox
						checked={userValue.termsCheck}
						onChange={EditField.bind(this, { col: "termsCheck" })}
						id="joinTermsCheck">
						{i18n.lbl_Check18TC1} &nbsp;
						<a
							target="_blank"
							rel="noreferrer"
							href={TandC(userInfo.langId).terms}>
							{i18n.lbl_TermsConditions}
						</a>
						&nbsp; {i18n.lbl_Check18TC2}&nbsp;
						<a
							target="_blank"
							rel="noreferrer"
							href={TandC(userInfo.langId).rule}>
							{i18n.lbl_RuleRegulations}
						</a>
						&nbsp; {i18n.lbl_Check18TC3}&nbsp;{config.siteName}
					</Checkbox>
					<Checkbox
						id="joinAgeCheck"
						checked={userValue.ageCheck}
						onChange={EditField.bind(this, { col: "ageCheck" })}>
						{i18n.lbl_Check18TC4}
					</Checkbox>
					{inputStatus.Checkbox.msg ? (
						<div className="JoinRule open">
							{inputStatus.Checkbox.msg}
						</div>
					) : null}
				</div>
				<div className="btn-group">
					<button onClick={clickSubmit}>{i18n.lbl_JoinNow}</button>
				</div>
			</div>
			<PromoPopup
				banner={banner}
				ImgFolder="Promotion"
				ClickClose={ClosePromoPopup}
				title={i18n.lbl_Welcome}
				isOpen={promoPopup}
			/>
		</>
	);
};

export default Join;
