import React, { useContext, useEffect, useState } from "react";
import classNames from "classnames";
import { useLocation, useNavigate } from "@reach/router";
import { useTranslation } from "react-i18next";
import ReCAPTCHA from "react-google-recaptcha";
import {
	defNavPanel,
	i18nContext,
	navContext,
	popBoxContext,
	userInfoContext
} from "../common/context";
import { bannerImgUrl } from "../../config";
import path from "../../path";
import Inputbox from "../common/inputbox.info";
import InputboxPWD from "../common/inputbox.password.info";
import { getUrlParameter, passwordCheck, readCookie } from "../common/common";
import {
	api_ExistsEmail,
	api_ExistsUserName,
	api_GetBanner,
	api_GetSiteCurrencyList,
	api_site_AffiliateCheck,
	api_site_GetAffiliateAgent,
	api_site_GetRecaptchaInfo,
	api_site_Signup
} from "../../service/api/site";
import { initStatus, initValue, reCaptchaEnum, VN_AREACODE } from "./def";
import { api_GetCustProfile } from "../../service/api/accountStrict";
import useShieldCheck from "../hook/useShieldCheck";
import Checkbox from "../common/checkbox";
import PromoPopup from "./join.promotion";

const Join = () => {
	const { t } = useTranslation();
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { nav, setNav } = useContext(navContext);
	const { i18n } = useContext(i18nContext);
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const [step, setStep] = useState(1);
	const [userValue, setUserValue] = useState(initValue);
	const [inputStatus, setInputStatus] = useState(initStatus);
	const [promoPopup, setPromoPopup] = useState(false);
	const [siteCurrencyList, setSiteCurrencyList] = useState([]);
	const [banner, setBanner] = useState([]);
	const [reCaptchaToken, setReCaptchaToken] = useState("");
	const [recaptchaInfo, setRecaptchaInfo] = useState({});
	const [reCaptchaKey, setReCaptchaKey] = useState(0);
	const [activeInfoMsg, setActiveInfoMsg] = useState("");
	const { getShieldData, saveShieldData, isShieldLoaded } = useShieldCheck();
	const urlAffId = getUrlParameter("AffId") || readCookie("AffId");
	const urlAffCode = getUrlParameter("AffCode") || readCookie("AffCode");
	const urlAffiliate = urlAffId || urlAffCode;
	const isShow =
		nav === defNavPanel.join || pathname === `/${path.join.root}`;

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
			[col]:
				col === "Affiliate"
					? {
							...prev[col],
							checked: result.checked,
							msg: result.msg ?? ""
					  }
					: {
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
			msg = t("msg_UsernameReq");
		} else if (val.length < 6 || val.length > 18) {
			checked = false;
			msg = t("msg_UsernameLength");
		} else if (!regx.test(val)) {
			checked = false;
			msg = t("lbl_UserNameCheckTooltip");
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
			msg = t("msg_ConfirmPwdReq");
		} else if (val !== userValue.Password) {
			checked = false;
			msg = t("msg_ConfirmPwdNotMatch");
		} else {
			checked = true;
			msg = "";
		}

		return { checked, msg };
	};

	const realNameCheck = ({ val }) => {
		const checked = val !== "";
		const msg = val === "" ? t("msg_RealNameReq") : "";
		return { checked, msg };
	};

	const phoneCheck = ({ val }) => {
		let checked = true;
		let msg = "";
		const regx = /^[0-9\s]*$/;
		if (!val) {
			checked = false;
			msg = t("lbl_PhoneRequired");
		} else if (val.length < 9 || !regx.test(val)) {
			checked = false;
			msg = t("lbl_PhoneTooltip");
		}
		return { checked, msg };
	};

	const emailCheck = async ({ val }) => {
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
			const res = await api_ExistsEmail({ Email: val });
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

	const clickInfo = col => {
		setActiveInfoMsg(inputStatus[col].hint);
	};

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
				msg = t("lbl_AffiliateIdWrong");
			}
		}

		return { checked, msg };
	};

	const GetSiteCurrencyList = () => {
		api_GetSiteCurrencyList().then(
			res => {
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
			},
			() => {
				setPopBox({
					isOpen: true,
					content: t("msg_ApiServerError")
				});
			}
		);
	};

	const clickSubmit = async () => {
		const _reCaptchaCheck =
			reCaptchaToken !== "" || recaptchaInfo.country === "CN";
		// * 機器人驗證沒過直接 return 出去
		if (!_reCaptchaCheck) return;

		let checked = null;
		const RealNameCheck = realNameCheck({ val: userValue.RealName });
		const PhoneCheck = phoneCheck({ val: userValue.Phone });
		// const EmailCheck = await emailCheck({ val: userValue.Email });
		const CheckboxCheck = userValue.agreeCheck;
		const _affiliateCheck = await checkAffiliate({
			formAffCode: userValue.Affiliate
		});

		checked =
			RealNameCheck.checked &&
			PhoneCheck.checked &&
			// EmailCheck.checked &&
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
				// Email: userValue.Email,
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
					const { message, errorCode } = response.data;
					if (errorCode === 0) {
						api_GetCustProfile().then(
							res_custInfo => {
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
							},
							() => {
								setPopBox({
									isOpen: true,
									content: t("msg_ApiServerError")
								});
							}
						);
						setNav(null);
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
						content: t("msg_ApiServerError")
					});
				}
			);
		} else {
			setInputStatus(prev => ({
				...prev,
				RealName: {
					checked: RealNameCheck.checked,
					msg: RealNameCheck.msg
				},
				Phone: {
					checked: PhoneCheck.checked,
					msg: PhoneCheck.msg
				},
				// Email: {
				// 	checked: EmailCheck.checked,
				// 	msg: EmailCheck.msg
				// },
				Checkbox: {
					checked: userValue.agreeCheck,
					msg: t("lbl_Check18TCTooltip")
				}
			}));
		}
	};

	const handleReCaptchaChange = token => {
		setReCaptchaToken(token);
	};

	const handleNextStep = async () => {
		let checked = null;
		const UserNameCheck = await userNameCheck({ val: userValue.UserName });
		const PasswordCheck = passwordCheck({ val: userValue.Password, i18n });
		const ConfirmPwdCheck = confirmPwdCheck({ val: userValue.ConfirmPwd });
		checked =
			UserNameCheck.checked &&
			PasswordCheck.checked &&
			ConfirmPwdCheck.checked;

		if (checked) {
			setStep(2);
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
				}
			}));
		}
	};

	const handleClose = () => {
		navigate(path.home.root);
		setInputStatus(initStatus);
		setUserValue(initValue);
		setStep(1);
		setNav(null);
	};

	const getRecaptchaSiteKey = async () => {
		try {
			const res = await api_site_GetRecaptchaInfo();
			const { country, siteKey } = res.data.data;
			setRecaptchaInfo({
				country,
				siteKey
			});
		} catch (error) {
			setPopBox({
				isOpen: true,
				content: error
			});
		}
	};

	useEffect(() => {
		setReCaptchaKey(reCaptchaKey + 1);
	}, [userInfo.langId]);

	useEffect(() => {
		const refId = readCookie("RefId");
		const openPanel =
			pathname === `/${path.join.root}` || nav === defNavPanel.join;
		if (refId && openPanel) {
			api_GetBanner("Promotion", refId, userInfo.langId).then(
				res => {
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
				},
				() => {
					setPopBox({
						isOpen: true,
						content: t("msg_ApiServerError")
					});
				}
			);
			if (isShieldLoaded) {
				getShieldData();
			}
		}
	}, [nav, userInfo.langId]);

	useEffect(() => {
		getRecaptchaSiteKey();
		if (urlAffiliate) {
			checkAffiliate({});
		} else {
			GetSiteCurrencyList();
		}
	}, [step]);

	return (
		<>
			<div
				className={`join-module popup ${classNames({
					active: isShow
				})}`}>
				<div>
					<button
						className="icon-close-white-bg"
						onClick={handleClose}
					/>
					<img
						className="join-logo"
						src={`${bannerImgUrl}/h5/img/4.0/logo.png`}
						alt=""
					/>
					<div className="join-title">{t("lbl_SignUp")}</div>
					{step === 1 && (
						<>
							<div className="join-message">
								{t("lbl_LoginMsg")}
								<a onClick={() => setNav(defNavPanel.login)}>
									{t("lbl_LoginHere")}
								</a>
							</div>
							<Inputbox
								icon="icon-profile"
								placeholder={t("lbl_Username")}
								onBlur={checkValue.bind(this, {
									col: "UserName"
								})}
								onChange={EditField.bind(this, {
									col: "UserName"
								})}
								value={userValue.UserName}
								tip={inputStatus.UserName.msg}
								btnStatus={inputStatus.UserName.checked}
								clickInfo={() => clickInfo("UserName")}
								testAttr="Username"
								inputBoxNewClass="inputbox-item primary"
								border={false}
								hint={inputStatus.UserName.hint}
								activeInfoMsg={activeInfoMsg}
								setActiveInfoMsg={setActiveInfoMsg}
							/>
							<InputboxPWD
								placeholder={t("lbl_Password")}
								onBlur={checkValue.bind(this, {
									col: "Password"
								})}
								onChange={EditField.bind(this, {
									col: "Password"
								})}
								value={userValue.Password}
								tip={inputStatus.Password.msg}
								btnStatus={inputStatus.Password.checked}
								testAttr="Password"
								icon="icon-password"
								inputBoxNewClass="inputbox-item primary"
								border={false}
								activeInfoMsg={activeInfoMsg}
								setActiveInfoMsg={setActiveInfoMsg}
							/>
							<InputboxPWD
								placeholder={t("lbl_ConfirmPassword")}
								onBlur={checkValue.bind(this, {
									col: "ConfirmPwd"
								})}
								onChange={EditField.bind(this, {
									col: "ConfirmPwd"
								})}
								value={userValue.ConfirmPwd}
								tip={inputStatus.ConfirmPwd.msg}
								btnStatus={inputStatus.ConfirmPwd.checked}
								testAttr="ConfirmPwd"
								icon="icon-password"
								inputBoxNewClass="inputbox-item primary"
								border={false}
								activeInfoMsg={activeInfoMsg}
								setActiveInfoMsg={setActiveInfoMsg}
							/>

							<div className="btn-group">
								<button
									className="btn-primary"
									onClick={handleNextStep}>
									{t("lbl_Next")}
								</button>
							</div>
						</>
					)}
					{step === 2 && (
						<>
							<Inputbox
								icon="icon-profile"
								placeholder={t("lbl_RealName")}
								onBlur={checkValue.bind(this, {
									col: "RealName"
								})}
								onChange={EditField.bind(this, {
									col: "RealName"
								})}
								value={userValue.RealName}
								tip={inputStatus.RealName.msg}
								btnStatus={inputStatus.RealName.checked}
								clickInfo={() => clickInfo("RealName")}
								testAttr="RealName"
								inputBoxNewClass="inputbox-item primary"
								border={false}
								hint={inputStatus.RealName.hint}
								activeInfoMsg={activeInfoMsg}
								setActiveInfoMsg={setActiveInfoMsg}
							/>

							<Inputbox
								_class="input-Area"
								icon="icon-phone"
								inputType="tel"
								placeholder={t("lbl_Phone")}
								value={userValue.Phone}
								onBlur={checkValue.bind(this, { col: "Phone" })}
								onChange={EditField.bind(this, {
									col: "Phone"
								})}
								tip={inputStatus.Phone.msg}
								btnStatus={inputStatus.Phone.checked}
								clickInfo={() => clickInfo("Phone")}
								testAttr="Phone"
								areaCode={VN_AREACODE}
								inputBoxNewClass="inputbox-item primary"
								border={false}
								hint={inputStatus.Phone.hint}
								activeInfoMsg={activeInfoMsg}
								setActiveInfoMsg={setActiveInfoMsg}
							/>

							{/* <Inputbox */}
							{/* 	icon="icon-email" */}
							{/* 	placeholder={t("lbl_Email")} */}
							{/* 	onBlur={checkValue.bind(this, { col: "Email" })} */}
							{/* 	onChange={EditField.bind(this, { */}
							{/* 		col: "Email" */}
							{/* 	})} */}
							{/* 	value={userValue.Email} */}
							{/* 	tip={inputStatus.Email.msg} */}
							{/* 	btnStatus={inputStatus.Email.checked} */}
							{/* 	clickInfo={() => clickInfo("Email")} */}
							{/* 	testAttr="Email" */}
							{/* 	inputBoxNewClass="inputbox-item primary" */}
							{/* 	border={false} */}
							{/* 	hint={inputStatus.Email.hint} */}
							{/* 	activeInfoMsg={activeInfoMsg} */}
							{/* 	setActiveInfoMsg={setActiveInfoMsg} */}
							{/* /> */}
							<Inputbox
								icon="icon-affiliate"
								placeholder={t("lbl_Affiliate_ID")}
								value={userValue.Affiliate}
								onChange={EditField.bind(this, {
									col: "Affiliate"
								})}
								onBlur={checkValue.bind(this, {
									col: "Affiliate"
								})}
								btnStatus={inputStatus.Affiliate.checked}
								tip={inputStatus.Affiliate.msg}
								clickInfo={() => clickInfo("Affiliate")}
								disabled={urlAffiliate && userValue.Affiliate}
								inputBoxNewClass="inputbox-item primary"
								border={false}
								hint={inputStatus.Affiliate.hint}
								activeInfoMsg={activeInfoMsg}
								setActiveInfoMsg={setActiveInfoMsg}
							/>

							{Object.keys(recaptchaInfo).length > 0 &&
								recaptchaInfo.country !== "CN" && (
									<ReCAPTCHA
										key={reCaptchaKey}
										class="g-recaptcha"
										sitekey={recaptchaInfo.siteKey}
										onChange={handleReCaptchaChange}
										hl={reCaptchaEnum[userInfo.langId]}
									/>
								)}

							<div className="join-message">
								<Checkbox
									testAttr="agreeCheck"
									checked={userValue.agreeCheck}
									onChange={EditField.bind(this, {
										col: "agreeCheck"
									})}
									id="joinAgreeCheck"
									className="checkbox-group">
									<div>{t("lbl_SignUpTerms")}</div>
								</Checkbox>
							</div>

							<div className="btn-group">
								<button
									className="btn-primary"
									data-testid="signUpBtn"
									onClick={clickSubmit}>
									{t("lbl_JoinNow")}
								</button>
							</div>
						</>
					)}
				</div>
				<div className="join-bottominfo">
					{t("lbl_PoweredBy")} Bong88
				</div>
			</div>
			<PromoPopup
				banner={banner}
				ImgFolder="Promotion"
				ClickClose={() => setPromoPopup(false)}
				title={t("lbl_Welcome")}
				isOpen={promoPopup}
			/>
		</>
	);
};

export default Join;
