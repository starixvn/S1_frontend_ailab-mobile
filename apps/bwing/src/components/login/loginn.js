import React, { useContext, useState } from "react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "@reach/router";
import { bannerImgUrl } from "../../config";
import { defNavPanel, navContext } from "../common/context";
import path from "../../path";
import Inputbox from "../common/inputbox.info";
import InputboxPWD from "../common/inputbox.password.info";

const Login = () => {
	const { t } = useTranslation();
	const { nav, setNav } = useContext(navContext);
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const [userValue, setUserValue] = useState({
		UserName: "",
		Password: ""
	});
	const [inputStatus, setInputStatus] = useState({
		UserName: {
			checked: null,
			msg: ""
		},
		Password: {
			checked: null,
			msg: ""
		}
	});

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

	const clickInfo = ({ col, info }) => {
		const _info = inputStatus[col].msg === "" ? t(info) : "";
		setInputStatus(prev => ({
			...prev,
			[col]: {
				checked: null,
				msg: _info
			}
		}));
	};

	return (
		<div className={`login-module popup ${classNames({ active: isShow })}`}>
			<div>
				<button
					className="icon-close-white-bg"
					onClick={() => {
						setNav(null);
						navigate("/");
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
					clickInfo={clickInfo.bind(this, {
						col: "UserName",
						info: "msg_UsernameReq"
					})}
					testAttr="Username"
					inputBoxNewClass="inputbox-item primary"
					border={false}
				/>

				<InputboxPWD
					placeholder={t("lbl_Password")}
					onBlur={checkValue.bind(null, { col: "Password" })}
					onChange={EditField.bind(null, { col: "Password" })}
					value={userValue.Password}
					btnStatus={inputStatus.Password.checked}
					tip={inputStatus.Password.msg}
					clickInfo={clickInfo.bind(this, {
						col: "Password",
						info: "msg_PasswordReq"
					})}
					testAttr="Password"
					icon="icon-password"
					inputBoxNewClass="inputbox-item primary"
					border={false}
				/>

				<Link
					className="login-forget"
					to={`/${path.forgetPassword.root}`}
					onClick={() => setNav(null)}>
					{t("lbl_ForgetPassword")}?
				</Link>
				<div className="btn-group">
					<button className="btn-primary">{t("lbl_Login")}</button>
				</div>
				<div className="login-message">
					{t("lbl_Dont_Have_An_Account")}
					<a href="">{t("lbl_SignUp")}</a>
				</div>
			</div>
			<div className="join-bottominfo">{t("lbl_PoweredBy")} Bong88</div>
		</div>
	);
};

export default Login;
