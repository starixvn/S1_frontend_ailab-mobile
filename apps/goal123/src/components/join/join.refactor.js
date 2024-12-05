import React, { useEffect, useState, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { Redirect, useNavigate } from "@reach/router";
import { useCooldown } from "@ailab-mobile/hooks";
import { CaptchaTypeEnum } from "@ailab-mobile/service";
import { useCaptchaContext } from "@ailab-mobile/common";
import Inputbox from "../common/inputbox.info";
import InputboxPWD from "../common/inputbox.password.info";
import Checkbox from "../common/checkbox";
import {
	api_ExistsUserName,
	api_GetSiteCurrencyList,
	api_site_GetAffiliateAgent,
	api_site_Signup,
	api_ExistsEmail,
	api_site_AffiliateCheck
} from "../../service/api/site";
import { api_GetCustProfile } from "../../service/api/accountStrict";
import { getUrlParameter, passwordCheck, getCookie } from "../common/common";
import {
	userInfoContext,
	i18nContext,
	defNavPanel,
	popBoxContext
} from "../common/context";
import { GET_LANG_ID } from "../../service/language";
import TandC from "../../service/t_and_c";
import config from "../../config";
import Logo from "../common/logo";
import { initValue, initStatus, VN_AREACODE } from "./join.def";
import useShieldCheck from "../hook/useShieldCheck";

const defaultLangId = GET_LANG_ID();

const Join = ({ setNav, openPanel, showBylink }) => {
	const navigate = useNavigate();
	const { i18n } = useContext(i18nContext);
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const [userValue, setUserValue] = useState(initValue);
	const [siteCurrencyList, setSiteCurrencyList] = useState([]);
	const [inputStatus, setInputStatus] = useState(initStatus);
	const [redirectPath, setRedirectPath] = useState(null);
	const {
		Captcha,
		getToken,
		captchaType,
		refreshCaptcha
	} = useCaptchaContext();
	const { saveShieldData } = useShieldCheck();
	const { isReady, cooldown, setCooldown } = useCooldown();

	const urlAffId = getUrlParameter("AffId") || getCookie("AffId");
	const urlAffCode = getUrlParameter("AffCode") || getCookie("AffCode");
	const urlAffiliate = urlAffId || urlAffCode;

	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		const init = async () => {
			// * 預先拿 currencyList
			await GetSiteCurrencyList();
			if (urlAffiliate) checkAffiliate({});
		};
		init();
	}, []);

	useEffect(() => {
		if (isMountedRef.current && redirectPath !== null) {
			setRedirectPath(null);
		}
	}, [redirectPath]);

	const checkAffiliate = async ({ formAffCode }) => {
		let checked = null;
		let msg = "";
		if (urlAffId) {
			const res = await api_site_GetAffiliateAgent({ AffId: urlAffId });
			if (res.data.errorCode === 0) {
				const { currencyId } = res.data.data;
				const currencyArr = [
					{
						id: currencyId,
						displayKey: `Currency_${currencyId}`
					}
				];
				setSiteCurrencyList(() => currencyArr);
				setUserValue(prev => ({
					...prev,
					Affiliate: urlAffId
				}));
			}
		} else if (urlAffCode) {
			const res = await api_site_AffiliateCheck({
				AffCode: urlAffCode,
				langId: userInfo.langId
			});
			if (res.data.errorCode === 0) {
				setUserValue(prev => ({
					...prev,
					Affiliate: urlAffCode
				}));
			}
		} else if (formAffCode) {
			const res = await api_site_AffiliateCheck({
				AffCode: formAffCode,
				langId: userInfo.langId
			});
			if (res.data.errorCode === 0) {
				checked = true;
				msg = "";
			} else {
				checked = false;
				msg = i18n.lbl_AffiliateIdWrong;
			}
		}

		return { checked, msg };
	};

	const GetSiteCurrencyList = async () => {
		const res = await api_GetSiteCurrencyList();
		if (res.data.errorCode === 0) {
			const currencyNum = res.data.data;
			const currencyArr = currencyNum.map(id => {
				return { id, displayKey: `Currency_${id}` };
			});
			setSiteCurrencyList(() => currencyArr);
		} else {
			setPopBox({
				isOpen: true,
				content: `[${res.data.errorCode}] ${res.data.message}`
			});
		}
	};

	const checkValue = async ({ col }, e) => {
		const val = e.target.value;
		let result = { checked: true, msg: "" };

		if (col === "UserName") {
			result = await userNameCheck({ val });
		} else if (col === "Password") {
			result = passwordCheck({ val, i18n });
		} else if (col === "ConfirmPwd") {
			result = confirmPwdCheck({ val });
		} else if (col === "RealName") {
			result = realNameCheck({ val });
		} else if (col === "Phone") {
			result = phoneCheck({ val });
		} else if (col === "Email") {
			result = await emailCheck({ val });
		} else if (col === "Affiliate") {
			result = await checkAffiliate({ formAffCode: val });
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
			setCooldown(3);
			const res = await api_ExistsUserName({
				UserName: val,
				langId: userInfo.langId
			});
			if (res.data.errorCode === 0 && res.data.data === true) {
				checked = false;
				msg = res.data.message;
			} else if (res.data.errorCode !== 0) {
				setPopBox({
					isOpen: true,
					content: `[${res.data.errorCode}] ${res.data.message}`
				});
			}
		}

		return { checked, msg };
	};

	const confirmPwdCheck = ({ val }) => {
		let checked = false;
		let msg = "";

		if (val === "") {
			checked = false;
			msg = i18n.msg_ConfirmPwdReq;
		} else if (val !== userValue.Password) {
			checked = false;
			msg = i18n.msg_ConfirmPwdNotMatch;
		} else {
			checked = true;
			msg = "";
		}

		return { checked, msg };
	};

	const realNameCheck = ({ val }) => {
		const checked = val !== "";
		const msg = val === "" ? i18n.msg_RealNameReq : "";
		return { checked, msg };
	};

	const phoneCheck = ({ val }) => {
		let checked = true;
		let msg = "";
		const regx = /^[0-9\s]*$/;

		if (!val) {
			checked = false;
			msg = i18n.lbl_PhoneRequired;
		} else if (val.length < 9 || !regx.test(val)) {
			checked = false;
			msg = i18n.lbl_PhoneTooltip;
		}
		return { checked, msg };
	};

	const emailCheck = async ({ val }) => {
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
			const res = await api_ExistsEmail({ Email: val });
			if (res.data?.errorCode === 0 && res.data?.data === true) {
				checked = false;
				msg = i18n.msg_MailExisted;
			} else if (res.data.errorCode !== 0) {
				setPopBox({
					isOpen: true,
					content: `[${res.data.errorCode}] ${res.data.message}`
				});
			}
		}

		return { checked, msg };
	};

	const EditField = ({ col }, e) => {
		let val = col === "Checkbox" ? !userValue.Checkbox : e.target.value;

		if (col === "UserName") {
			val = val.replace(/[\W_]/g, "");
		} else if (col === "RealName") {
			val = val.replace(/[\d\-!@#$%^&_()+";~～<>=|?\[\]\\`~{}]+/gu, "");
		} else if (col === "Phone") {
			val = val.replace(/[^0-9]+/g, "");
		}

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
		const ConfirmPwdCheck = confirmPwdCheck({ val: userValue.ConfirmPwd });
		const RealNameCheck = realNameCheck({ val: userValue.RealName });
		const PhoneCheck = phoneCheck({ val: userValue.Phone });
		// const EmailCheck = await emailCheck({ val: userValue.Email });
		const _affiliateCheck = await checkAffiliate({
			formAffCode: userValue.Affiliate
		});

		const reCaptchaToken =
			captchaType === CaptchaTypeEnum.Number
				? userValue.reCaptchaToken
				: await getToken();

		checked =
			UserNameCheck.checked &&
			PasswordCheck.checked &&
			ConfirmPwdCheck.checked &&
			RealNameCheck.checked &&
			PhoneCheck.checked &&
			// EmailCheck.checked &&
			userValue.Checkbox &&
			// affiliate is optional
			(_affiliateCheck.checked === true ||
				_affiliateCheck.checked === null);

		if (checked) {
			const regData = {
				UserName: userValue.UserName,
				Userpwd: userValue.Password,
				RealName: userValue.RealName,
				CurrencyId: siteCurrencyList[userValue.Currency]?.id,
				PhoneNo: userValue.Phone,
				// Email: userValue.Email,
				AreaCode: VN_AREACODE,
				UserLang: defaultLangId,
				ReferralUrl: document.referrer,
				ReCaptchaToken: reCaptchaToken,
				CaptchaType: captchaType
			};

			regData.RefId = getUrlParameter("RefId") || getCookie("RefId");
			regData.Aff = getUrlParameter("Aff") || getCookie("Aff");
			// If userValue.affiliate means urlAffId is qualified
			regData.AffId = urlAffId && userValue.Affiliate ? urlAffId : null;
			// If no urlAffId, then userValue.affiliate is affCode (no matter url or form value)
			regData.AffCode = !urlAffId ? userValue.Affiliate : null;

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
										saveShieldData();
										navigate(`/`);
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
							setPopBox({
								isOpen: true,
								content: `[${errorCode}] ${message}`
							});
						}
					}
					refreshCaptcha();
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
			setInputStatus(prev => ({
				...prev,
				UserName: UserNameCheck,
				Password: PasswordCheck,
				ConfirmPwd: ConfirmPwdCheck,
				RealName: RealNameCheck,
				Phone: PhoneCheck,
				// Email: EmailCheck,
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

	const handleJoinPanel = (show, reset, showLink) => {
		if (reset) {
			// 保留推薦碼不在關閉註冊頁時被清空
			setUserValue(({ Affiliate }) => ({ ...initValue, Affiliate }));
			setInputStatus(initStatus);
		}

		if (showLink) {
			setRedirectPath("/");
		} else {
			setNav(() => {
				const newState = show ? null : defNavPanel.join;
				return newState;
			});
		}
	};

	if (redirectPath) {
		return <Redirect to="/" noThrow={true} />;
	}

	return (
		<>
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
				// onBlur={checkValue.bind(this, { col: "UserName" })}
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
				testAttr="Password"
			/>
			<InputboxPWD
				placeholder={i18n.lbl_ConfirmPassword}
				onBlur={checkValue.bind(this, { col: "ConfirmPwd" })}
				onChange={EditField.bind(this, { col: "ConfirmPwd" })}
				btnStatus={inputStatus.ConfirmPwd.checked}
				tip={inputStatus.ConfirmPwd.msg}
				value={userValue.ConfirmPwd}
				testAttr="ConfirmPwd"
			/>
			<Inputbox
				icon="icon icon-member"
				placeholder={i18n.lbl_RealName}
				onBlur={checkValue.bind(this, { col: "RealName" })}
				onChange={EditField.bind(this, { col: "RealName" })}
				btnStatus={inputStatus.RealName.checked}
				tip={inputStatus.RealName.msg}
				value={userValue.RealName}
				clickInfo={clickInfo.bind(this, {
					col: "RealName",
					info: "lbl_RemindForName"
				})}
				testAttr="RealName"
			/>
			<Inputbox
				icon="icon icon-phone"
				inputType="tel"
				placeholder={i18n.lbl_Phone}
				onBlur={checkValue.bind(this, { col: "Phone" })}
				onChange={EditField.bind(this, { col: "Phone" })}
				btnStatus={inputStatus.Phone.checked}
				tip={inputStatus.Phone.msg}
				value={userValue.Phone}
				clickInfo={clickInfo.bind(this, {
					col: "Phone",
					info: "lbl_PhoneTooltip"
				})}
				areaCode={VN_AREACODE}
				testAttr="Phone"
			/>
			{/* <Inputbox */}
			{/* 	icon="icon icon-email" */}
			{/* 	placeholder={i18n.lbl_Email} */}
			{/* 	onBlur={checkValue.bind(this, { col: "Email" })} */}
			{/* 	onChange={EditField.bind(this, { col: "Email" })} */}
			{/* 	btnStatus={inputStatus.Email.checked} */}
			{/* 	tip={inputStatus.Email.msg} */}
			{/* 	value={userValue.Email} */}
			{/* 	clickInfo={clickInfo.bind(this, { */}
			{/* 		col: "Email", */}
			{/* 		info: "lbl_EmailToolTip" */}
			{/* 	})} */}
			{/* 	testAttr="Email" */}
			{/* /> */}
			<Inputbox
				icon="icon icon-affiliate"
				placeholder={i18n.lbl_Affiliate_ID}
				value={userValue.Affiliate}
				onChange={EditField.bind(this, { col: "Affiliate" })}
				onBlur={checkValue.bind(this, { col: "Affiliate" })}
				btnStatus={inputStatus.Affiliate.checked}
				tip={inputStatus.Affiliate.msg}
				disabled={urlAffiliate && userValue.Affiliate}
				clickInfo={clickInfo.bind(this, {
					col: "Affiliate",
					info: "lbl_Please_enter_Affiliate_ID"
				})}
			/>

			<Captcha />
			{captchaType === CaptchaTypeEnum.Number && (
				<Inputbox
					value={userValue.reCaptchaToken}
					onChange={EditField.bind(this, { col: "reCaptchaToken" })}
					placeholder={i18n.lbl_EnterCaptchaCode}
				/>
			)}

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
				<button
					className="btn-gray"
					onClick={clickSubmit}
					style={isReady ? undefined : { filter: "grayscale(1)" }}
					disabled={!isReady}>
					{i18n.lbl_JoinNow}
					{cooldown ? ` (${cooldown})` : null}
				</button>
			</div>
		</>
	);
};

Join.defaultProps = {
	openPanel: false,
	showBylink: {}
};

Join.propTypes = {
	setNav: PropTypes.func.isRequired,
	openPanel: PropTypes.bool,
	showBylink: PropTypes.object
};

export default Join;
