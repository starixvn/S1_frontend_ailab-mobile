import React, { useEffect, useState, useContext, useRef } from "react";
import { useMatch, useNavigate } from "@reach/router";
import ReCAPTCHA from "react-google-recaptcha";
import Inputbox from "../common/inputbox.info";
import InputboxPWD from "../common/inputbox.password.info";
import Checkbox from "../common/checkbox";
import {
	api_ExistsUserName,
	api_GetSiteCurrencyList,
	api_GetBanner,
	api_site_Signup,
	// api_site_ExistsPhoneNo,
	api_site_GetAffiliateAgent,
	api_ExistsEmail,
	api_site_AffiliateCheck
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
import { initValue, initStatus, reCaptchaEnum, VN_AREACODE } from "./join.def";
import useShieldCheck from "../hook/useShieldCheck";

const Join = () => {
	const navigate = useNavigate();
	const { i18n } = useContext(i18nContext);
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { nav, setNav } = useContext(navContext);
	const [userValue, setUserValue] = useState(initValue);
	const [siteCurrencyList, setSiteCurrencyList] = useState([]);
	const [banner, setBanner] = useState([]);
	const [inputStatus, setInputStatus] = useState(initStatus);
	const [promoPopup, setPromoPopup] = useState(false);
	const [reCaptchaToken, setReCaptchaToken] = useState("");
	const isMountedRef = useRef(null);
	const { getShieldData, saveShieldData, isShieldLoaded } = useShieldCheck();
	const [reCaptchaKey, setReCaptchaKey] = useState(0);

	const urlAffId = getUrlParameter("AffId") || readCookie("AffId");
	const urlAffCode = getUrlParameter("AffCode") || readCookie("AffCode");
	const urlAffiliate = urlAffId || urlAffCode;

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		setReCaptchaKey(reCaptchaKey + 1);
	}, [userInfo.langId]);

	useEffect(() => {
		const refId = readCookie("RefId");
		const showBylink = window.location.pathname === `/${path.join.root}`;
		const openPanel = showBylink || nav === defNavPanel.join;
		if (refId && openPanel) {
			api_GetBanner("Promotion", refId, userInfo.langId).then(
				res => {
					if (isMountedRef.current) {
						if (res.data.errorCode === 0) {
							if (res.data.data.length > 0) {
								setBanner(res.data.data);
								setPromoPopup(true);
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
					setPopBox({
						isOpen: true,
						content: i18n.msg_ApiServerError
					});
				}
			);
			if (isShieldLoaded) {
				getShieldData();
			}
		}
	}, [nav, userInfo.langId]);

	useEffect(() => {
		if (urlAffiliate) {
			checkAffiliate({});
		} else {
			GetSiteCurrencyList();
		}
	}, []);

	const checkAffiliate = async ({ formAffCode }) => {
		let checked = null;
		let msg = "";
		await GetSiteCurrencyList();

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
			if (res.data.errorCode === 0) {
				if (res.data.data === true) {
					checked = false;
					msg = res.data.message;
				}
			} else {
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
		let val = col.includes("Check") ? !userValue[col] : e.target.value;

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
		const _reCaptchaCheck = reCaptchaToken !== "";
		// * 機器人驗證沒過直接 return 出去
		if (!_reCaptchaCheck) return;

		let checked = null;
		const UserNameCheck = await userNameCheck({ val: userValue.UserName });
		const PasswordCheck = passwordCheck({ val: userValue.Password, i18n });
		const ConfirmPwdCheck = confirmPwdCheck({ val: userValue.ConfirmPwd });
		const RealNameCheck = realNameCheck({ val: userValue.RealName });
		const PhoneCheck = phoneCheck({ val: userValue.Phone });
		const EmailCheck = await emailCheck({ val: userValue.Email });
		const CheckboxCheck = userValue.agreeCheck;
		const _affiliateCheck = await checkAffiliate({
			formAffCode: userValue.Affiliate
		});

		checked =
			UserNameCheck.checked &&
			PasswordCheck.checked &&
			ConfirmPwdCheck.checked &&
			RealNameCheck.checked &&
			PhoneCheck.checked &&
			EmailCheck.checked &&
			CheckboxCheck &&
			// affiliate is optional
			(_affiliateCheck.checked === true ||
				_affiliateCheck.checked === null);

		if (checked) {
			const regData = {
				UserName: userValue.UserName,
				Userpwd: userValue.Password,
				RealName: userValue.RealName,
				CurrencyId: siteCurrencyList[userValue.Currency]?.id,
				UserLang: userInfo.langId,
				PhoneNo: userValue.Phone,
				Email: userValue.Email,
				AreaCode: VN_AREACODE,
				ReferralUrl: document.referrer,
				ReCaptchaToken: reCaptchaToken
			};

			regData.RefId = getUrlParameter("RefId") || readCookie("RefId");
			regData.Aff = getUrlParameter("Aff") || readCookie("Aff");
			// If userValue.affiliate means urlAffId is qualified
			regData.AffId = urlAffId && userValue.Affiliate ? urlAffId : null;
			// If no urlAffId, then userValue.affiliate is affCode (no matter url or form value)
			regData.AffCode = !urlAffId ? userValue.Affiliate : null;

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
										} else {
											setPopBox({
												isOpen: true,
												content: `[${res_custInfo.data.errorCode}] ${res_custInfo.data.message}`
											});
										}
										setUserInfo(_user);
										saveShieldData();
										navigate(`/`);
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
							setNav(null);
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
				ConfirmPwd: {
					checked: ConfirmPwdCheck.checked,
					msg: ConfirmPwdCheck.msg
				},
				RealName: {
					checked: RealNameCheck.checked,
					msg: RealNameCheck.msg
				},
				Phone: {
					checked: PhoneCheck.checked,
					msg: PhoneCheck.msg
				},
				Email: {
					checked: EmailCheck.checked,
					msg: EmailCheck.msg
				},
				Checkbox: {
					checked: userValue.agreeCheck,
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

	const handleReCaptchaChange = token => {
		setReCaptchaToken(token);
	};

	return (
		<>
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
					testAttr="Username"
				/>
				<InputboxPWD
					placeholder={i18n.lbl_Password}
					onBlur={checkValue.bind(this, { col: "Password" })}
					onChange={EditField.bind(this, { col: "Password" })}
					value={userValue.Password}
					tip={inputStatus.Password.msg}
					btnStatus={inputStatus.Password.checked}
					testAttr="Password"
				/>
				<InputboxPWD
					placeholder={i18n.lbl_ConfirmPassword}
					onBlur={checkValue.bind(this, { col: "ConfirmPwd" })}
					onChange={EditField.bind(this, { col: "ConfirmPwd" })}
					value={userValue.ConfirmPwd}
					tip={inputStatus.ConfirmPwd.msg}
					btnStatus={inputStatus.ConfirmPwd.checked}
					testAttr="ConfirmPwd"
				/>
				<Inputbox
					icon="icon icon-member"
					placeholder={i18n.lbl_RealName}
					onBlur={checkValue.bind(this, { col: "RealName" })}
					onChange={EditField.bind(this, { col: "RealName" })}
					value={userValue.RealName}
					tip={inputStatus.RealName.msg}
					btnStatus={inputStatus.RealName.checked}
					clickInfo={clickInfo.bind(this, {
						col: "RealName",
						info: "lbl_RemindForName"
					})}
					testAttr="RealName"
				/>
				<div className="inputPhone parts">
					<Inputbox
						_class="input-Area"
						icon="icon icon-phone"
						inputType="tel"
						placeholder={i18n.lbl_Phone}
						value={userValue.Phone}
						onBlur={checkValue.bind(this, { col: "Phone" })}
						// * 清空錯誤訊息， phone 改為按下 submit 之後才打 api 驗證
						// onBlur={() =>
						// 	setInputStatus(prev => ({
						// 		...prev,
						// 		Phone: { checked: null, msg: "" }
						// 	}))
						// }
						onChange={EditField.bind(this, { col: "Phone" })}
						btnStatus={inputStatus.Phone.checked}
						clickInfo={clickInfo.bind(this, {
							col: "Phone",
							info: "lbl_PhoneTooltip"
						})}
						testAttr="Phone"
						areaCode={VN_AREACODE}
					/>
					<div className="errortip open" data-testid="Phone_msg">
						{inputStatus.Phone.msg}
					</div>
				</div>
				<Inputbox
					icon="icon icon-email"
					placeholder={i18n.lbl_Email}
					onBlur={checkValue.bind(this, { col: "Email" })}
					onChange={EditField.bind(this, { col: "Email" })}
					value={userValue.Email}
					tip={inputStatus.Email.msg}
					btnStatus={inputStatus.Email.checked}
					clickInfo={clickInfo.bind(this, {
						col: "Email",
						info: "lbl_EmailToolTip"
					})}
					testAttr="Email"
				/>
				<Inputbox
					icon="icon icon-affiliate"
					placeholder={i18n.lbl_Affiliate_ID}
					value={userValue.Affiliate}
					onChange={EditField.bind(this, { col: "Affiliate" })}
					onBlur={checkValue.bind(this, { col: "Affiliate" })}
					btnStatus={inputStatus.Affiliate.checked}
					tip={inputStatus.Affiliate.msg}
					clickInfo={clickInfo.bind(this, {
						col: "Affiliate",
						info: "lbl_Please_enter_Affiliate_ID"
					})}
					disabled={urlAffiliate && userValue.Affiliate}
				/>
				<ReCAPTCHA
					key={reCaptchaKey}
					class="g-recaptcha"
					sitekey="6LdzkRciAAAAAMuli_1oYaulJv-LHcT0wNZtaK69"
					onChange={handleReCaptchaChange}
					hl={reCaptchaEnum[userInfo.langId]}
				/>
				<div className="Terms">
					<Checkbox
						testAttr="agreeCheck"
						checked={userValue.agreeCheck}
						onChange={EditField.bind(this, { col: "agreeCheck" })}
						id="joinAgreeCheck">
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
					{inputStatus.Checkbox.msg ? (
						<div className="JoinRule open">
							{inputStatus.Checkbox.msg}
						</div>
					) : null}
				</div>
				<div className="btn-group">
					<button data-testid="signUpBtn" onClick={clickSubmit}>
						{i18n.lbl_JoinNow}
					</button>
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
