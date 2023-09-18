import React, { useContext, useEffect, useState } from "react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "@reach/router";
import { bannerImgUrl } from "../../config";
import { defNavPanel, navContext, userInfoContext } from "../common/context";
import path from "../../path";
import Inputbox from "../common/inputbox.info";
import InputboxPWD from "../common/inputbox.password.info";
import { LOGIN } from "../../service/auth";
import useShieldCheck from "../hook/useShieldCheck";

const initUserValue = {
	UserName: "",
	Password: ""
};

const initStatus = {
	UserName: {
		checked: null,
		msg: "",
		hint: "lbl_UsernameTooltip",
		isShowHint: false
	},
	Password: {
		checked: null,
		msg: "",
		hint: "lbl_PasswordTooltip",
		isShowHint: false
	}
};

const Login = () => {
	const { t } = useTranslation();
	const { nav, setNav } = useContext(navContext);
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const { getShieldData, saveShieldData, isShieldLoaded } = useShieldCheck();
	const [userValue, setUserValue] = useState(initUserValue);
	const [inputStatus, setInputStatus] = useState(initStatus);

	const isShow =
		nav === defNavPanel.login || pathname === `/${path.login.root}`;

	const checkValue = ({ col }, e) => {
		const val = e.target.value;
		const _msg = col === "UserName" ? "msg_UsernameReq" : "msg_PasswordReq";
		setInputStatus(prev => ({
			...prev,
			[col]: {
				checked: val !== "",
				msg: val === "" ? t(_msg) : ""
			}
		}));
	};

	const EditField = ({ col }, e) => {
		let val = e.target.value;

		if (col === "UserName") {
			val = val.replace(/[\W_]/g, "");
		}

		setUserValue(prev => ({
			...prev,
			[col]: val
		}));
	};

	const clickInfo = col => {
		setInputStatus(prev => ({
			...prev,
			[col]: {
				...prev[col],
				isShowHint: !inputStatus[col].isShowHint
			}
		}));
	};

	const handleLogin = () => {
		const checked = userValue.UserName !== "" && userValue.Password !== "";

		if (checked) {
			const CallBackLogin = (errorCode, message, isLogin, userData) => {
				if (errorCode === 0) {
					setUserInfo(() => ({
						...userData,
						isLogin
					}));
					setNav(null);
					saveShieldData();
					navigate(`/`);
					setUserValue(initUserValue);
					setInputStatus(initStatus);
				} else if (
					errorCode === 1101 ||
					errorCode === 1102 ||
					errorCode === 9000 ||
					errorCode === 1103
				) {
					setInputStatus(prev => ({
						...prev,
						UserName: {
							checked: false,
							msg: message,
							hint: "lbl_UsernameTooltip",
							isShowHint: false
						}
					}));
				} else if (errorCode === 1001) {
					setInputStatus(prev => ({
						...prev,
						Password: {
							checked: false,
							msg: message,
							hint: "lbl_PasswordTooltip",
							isShowHint: false
						}
					}));
				}
			};

			LOGIN(
				{
					userName: userValue.UserName,
					password: userValue.Password,
					langId: userInfo.langId
				},
				CallBackLogin
			);
		} else {
			const userNameCheck = userValue.UserName !== "";
			const passwordCheck = userValue.Password !== "";
			setInputStatus({
				UserName: {
					checked: userNameCheck,
					msg: userNameCheck ? "" : t("msg_UsernameReq"),
					hint: "lbl_UsernameTooltip",
					isShowHint: false
				},
				Password: {
					checked: passwordCheck,
					msg: passwordCheck ? "" : t("msg_PasswordReq"),
					hint: "lbl_PasswordTooltip",
					isShowHint: false
				}
			});
		}
	};

	useEffect(() => {
		const openPanel =
			pathname === `/${path.login.root}` || nav === defNavPanel.login;

		if (openPanel && isShieldLoaded) {
			getShieldData();
		}
	}, [nav]);

	return (
		<div className={`login-module popup ${classNames({ active: isShow })}`}>
			<div>
				<button
					className="icon-close-white-bg"
					onClick={() => {
						setNav(null);
						navigate("/");
						setUserValue(initUserValue);
						setInputStatus(initStatus);
					}}
				/>
				<img
					className="login-logo"
					src={`${bannerImgUrl}/h5/img/4.0/logo.png`}
					alt=""
				/>
				<img
					className="login-banner"
					src={`${bannerImgUrl}/h5/img/4.0/login-banner.png`}
					alt=""
				/>
				<div className="login-title">{t("lbl_Login")}</div>

				<Inputbox
					icon="icon-profile"
					placeholder={t("lbl_Username")}
					onBlur={checkValue.bind(null, { col: "UserName" })}
					onChange={EditField.bind(null, { col: "UserName" })}
					value={userValue.UserName}
					btnStatus={inputStatus.UserName.checked}
					tip={inputStatus.UserName.msg}
					clickInfo={() => clickInfo("UserName")}
					testAttr="Username"
					inputBoxNewClass="inputbox-item primary"
					border={false}
					hint={inputStatus.UserName.hint}
					isShowHint={inputStatus.UserName.isShowHint}
				/>

				<InputboxPWD
					placeholder={t("lbl_Password")}
					onBlur={checkValue.bind(null, { col: "Password" })}
					onChange={EditField.bind(null, { col: "Password" })}
					value={userValue.Password}
					btnStatus={inputStatus.Password.checked}
					tip={inputStatus.Password.msg}
					clickInfo={() => clickInfo("Password")}
					testAttr="Password"
					icon="icon-password"
					inputBoxNewClass="inputbox-item primary"
					border={false}
					hint={inputStatus.Password.hint}
					isShowHint={inputStatus.Password.isShowHint}
					hideInfoBtn={false}
				/>

				<Link
					className="login-forget"
					to={`/${path.forgetPassword.root}`}
					onClick={() => setNav(null)}>
					{t("lbl_ForgetPassword")}
				</Link>
				<div onClick={handleLogin} className="btn-group">
					<button className="btn-primary"> {t("lbl_Login")}</button>
				</div>
				<div className="login-message">
					{t("lbl_DontHaveAccount")}
					<a onClick={() => setNav(defNavPanel.join)}>
						{t("lbl_SignUp")}
					</a>
				</div>
			</div>
			<div className="join-bottominfo">{t("lbl_PoweredBy")} Bong88</div>
		</div>
	);
};

export default Login;
