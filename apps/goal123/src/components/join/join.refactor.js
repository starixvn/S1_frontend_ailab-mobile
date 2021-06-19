import React, { useEffect, useState, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { useMatch, Redirect, useNavigate } from "@reach/router";
import Inputbox from "../common/inputbox.info";
import InputboxPWD from "../common/inputbox.password.info";
import Dropdown from "../common/dropdown";
import Checkbox from "../common/checkbox";
import Tips from "./tips";
import {
	api_ExistsUserName,
	api_GetSiteCurrencyList,
	api_GetBanner,
	api_site_GetAffiliateAgent,
	api_site_Signup
} from "../../service/api/site";
import { api_GetCustProfile } from "../../service/api/accountStrict";
import { getUrlParameter, passwordCheck, getCookie } from "../common/common";
import {
	userInfoContext,
	i18nContext,
	navContext,
	defNavPanel,
	popBoxContext
} from "../common/context";
import { GET_LANG_ID } from "../../service/language";
import TandC from "../../service/t_and_c";
import path from "../../path";
import config from "../../config";
import PromoPopup from "./join.promotion";
import Logo from "../common/logo";
import { initValue, initStatus } from "./join.def";

const defaultLangId = GET_LANG_ID();

const Join = ({ hideBtn }) => {
	const navigate = useNavigate();
	const { i18n } = useContext(i18nContext);
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { nav, setNav } = useContext(navContext);
	const [userValue, setUserValue] = useState(initValue);
	const [siteCurrencyList, setSiteCurrencyList] = useState([]);
	const [inputStatus, setInputStatus] = useState(initStatus);
	const [redirectPath, setRedirectPath] = useState(null);
	const [banner, setBanner] = useState([]);
	const [affiliateidExist, setAffiliateidExist] = useState(null);
	const [promoPopup, setPromoPopup] = useState(false);

	const isMountedRef = useRef(null);
	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		const refId = getCookie("RefId");
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

	const AffId = getUrlParameter("AffId") || getCookie("AffId");
	useEffect(() => {
		const AffCode = getUrlParameter("AffCode") || getCookie("AffCode");
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

	useEffect(() => {
		if (isMountedRef.current && redirectPath !== null) {
			setRedirectPath(null);
		}
	}, [redirectPath]);

	const GetSiteCurrencyList = async () => {
		const res = await api_GetSiteCurrencyList();
		if (res.data.errorCode === 0) {
			const currencyNum = res.data.data;
			const currencyArr = currencyNum.map(id => {
				return { id, displayKey: `Currency_${id}` };
			});
			setSiteCurrencyList(() => currencyArr);
		}
	};

	const checkValue = async ({ col }, e) => {
		const val = e.target.value;
		let result = { checked: true, msg: "" };

		if (col === "UserName") {
			result = await userNameCheck({ val });
		} else if (col === "Password") {
			result = passwordCheck({ val, i18n });
		}

		setInputStatus(prev => ({
			...prev,
			[col]: result
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
		const val = col === "Checkbox" ? !userValue.Checkbox : e.target.value;
		setUserValue(prev => ({
			...prev,
			[col]: val
		}));

		if (col === "Checkbox") {
			setInputStatus(prev => ({
				...prev,
				Checkbox: {
					checked: val,
					msg: val === false ? i18n.lbl_Check18TCTooltip : ""
				}
			}));
		}
	};

	const clickInfo = ({ col, info }) => {
		const _info = inputStatus[col].msg === "" ? i18n[info] : "";
		setInputStatus(prev => ({
			...prev,
			[col]: { checked: null, msg: _info }
		}));
	};

	const clickSubmit = async () => {
		let checked = null;
		const UserNameCheck = await userNameCheck({ val: userValue.UserName });
		const PasswordCheck = passwordCheck({ val: userValue.Password, i18n });

		checked =
			UserNameCheck.checked &&
			PasswordCheck.checked &&
			userValue.Checkbox;

		if (checked) {
			const regData = {
				UserName: userValue.UserName,
				Userpwd: userValue.Password,
				CurrencyId: siteCurrencyList[userValue.Currency]?.id,
				UserLang: defaultLangId,
				PromoCode: userValue.SpecialBonusCode
			};

			if (AffId) {
				const res = await api_site_GetAffiliateAgent({ AffId });
				if (res.data.errorCode === 0) {
					regData.AffId =
						getUrlParameter("AffId") || getCookie("AffId");
				}
			}

			regData.RefId = getUrlParameter("RefId") || getCookie("RefId");
			regData.Aff = getUrlParameter("Aff") || getCookie("Aff");
			regData.AffCode =
				getUrlParameter("AffCode") ||
				getCookie("AffCode") ||
				userValue.AffiliateId;

			api_site_Signup(regData, userInfo.langId).then(
				response => {
					if (isMountedRef.current) {
						const { errorCode, message } = response.data;
						if (errorCode === 0) {
							api_GetCustProfile().then(
								res => {
									if (isMountedRef.current) {
										let _user = {
											isLogin: true,
											langId: defaultLangId,
											userName: userValue.UserName
										};
										if (res.data.errorCode === 0) {
											_user = {
												..._user,
												...res.data.data
											};
										}
										setUserInfo(_user);
										setNav(null);
										navigate(`/${path.deposit.root}`);
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
						} else {
							const closePopBox = () => {
								setPopBox({ isOpen: false });
							};
							setPopBox({
								isOpen: true,
								title: i18n.lbl_ImportantNote,
								content: `[${errorCode}] ${message}`,
								hasBtn: true,
								btnBar: (
									<div className="btn-group">
										<button
											className="lightBlue"
											onClick={closePopBox}>
											{i18n.lbl_Close}
										</button>
									</div>
								)
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
				UserName: UserNameCheck,
				Password: PasswordCheck,
				Checkbox: {
					checked: userValue.Checkbox,
					msg:
						userValue.Checkbox === false
							? i18n.lbl_Check18TCTooltip
							: ""
				}
			}));
		}
	};

	const handleJoinPanel = (show, reset, showBylink) => {
		if (reset) {
			setUserValue(initValue);
			setInputStatus(initStatus);
		}

		if (showBylink) {
			setRedirectPath("/");
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

	return redirectPath === null ? (
		<>
			{hideBtn ? null : (
				<button
					className="registerBtn"
					onClick={handleJoinPanel.bind(this, openPanel)}>
					{i18n.lbl_JoinNow.toUpperCase()}
				</button>
			)}
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
					btnStatus={inputStatus.UserName.checked}
					tip={inputStatus.UserName.msg}
					value={userValue.UserName}
					clickInfo={clickInfo.bind(this, {
						col: "UserName",
						info: "lbl_UsernameTooltip"
					})}
					testAttr="Username"
				/>
				<InputboxPWD
					placeholder={i18n.lbl_Password}
					onBlur={checkValue.bind(this, { col: "Password" })}
					onChange={EditField.bind(this, { col: "Password" })}
					btnStatus={inputStatus.Password.checked}
					tip={inputStatus.Password.msg}
					value={userValue.Password}
					clickInfo={clickInfo.bind(this, {
						col: "Password",
						info: "lbl_PasswordTooltip"
					})}
					testAttr="Password"
				/>
				<div className="inputBox">
					<Dropdown
						colName="Currency"
						mainKey="join-curr"
						selectedIdx={userValue.Currency}
						options={siteCurrencyList}
						onSelectItem={selectCurrency}
						i18n={i18n}
					/>
					<Tips
						Icon="icon-coin-dollar"
						ClassName="JoinRule"
						IsOpen={Boolean(inputStatus.Currency.msg)}>
						{inputStatus.Currency.msg}
					</Tips>
				</div>
				{/* <Inputbox
					icon="icon icon-promotion"
					placeholder={i18n.lbl_JoinPromoCode}
					value={userValue.SpecialBonusCode}
					onChange={EditField.bind(this, { col: "SpecialBonusCode" })}
					onBlur={checkValue.bind(this, { col: "SpecialBonusCode" })}
				/> */}
				<Inputbox
					icon="icon icon-affiliate"
					placeholder={i18n.lbl_Affiliate_ID}
					value={affiliateidExist ?? userValue.AffiliateId}
					onChange={EditField.bind(this, { col: "AffiliateId" })}
					btnStatus={inputStatus.AffiliateId.checked}
					tip={inputStatus.AffiliateId.msg}
					disabled={Boolean(affiliateidExist)}
					clickInfo={clickInfo.bind(this, {
						col: "AffiliateId",
						info: "lbl_Please_enter_Affiliate_ID"
					})}
				/>
				<Checkbox
					Checked={userValue.Checkbox}
					className={`Terms${
						inputStatus.Checkbox.checked === false ? " error" : ""
					}`}
					onChange={EditField.bind(this, { col: "Checkbox" })}
					id="c1">
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
					.&nbsp;
					{i18n.lbl_Check18TC4}
				</Checkbox>
				<div className="JoinRule open">{inputStatus.Checkbox.msg}</div>
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
	) : (
		<Redirect to="/" noThrow={true} />
	);
};

Join.defaultProps = {
	hideBtn: null
};

Join.propTypes = {
	hideBtn: PropTypes.bool
};

export default Join;
