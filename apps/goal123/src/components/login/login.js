import React, { useState, useContext, useEffect, useRef } from "react";
import { useMatch, Link, useNavigate } from "@reach/router";
import PropTypes from "prop-types";
import Inputbox from "../common/inputbox.info";
import InputboxPWD from "../common/inputbox.password.info";
import { LOGIN } from "../../service/auth";
import {
	userInfoContext,
	i18nContext,
	navContext,
	defNavPanel
} from "../common/context";
import path from "../../path";
import Logo from "../common/logo";

const initValue = { UserName: "", Password: "" };
const initStatus = {
	UserName: { checked: null, msg: "" },
	Password: { checked: null, msg: "" }
};

const LoginPage = ({ ButtonTitle, hideBtn }) => {
	const navigate = useNavigate();
	const { i18n } = useContext(i18nContext);
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const { nav, setNav } = useContext(navContext);
	const [userValue, setUserValue] = useState(initValue);
	const [inputStatus, setInputStatus] = useState(initStatus);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const checkValue = ({ col }, e) => {
		const val = e.target.value;
		let msg = "";
		if (!val) {
			msg =
				col === "UserName"
					? i18n.msg_UsernameReq
					: i18n.msg_PasswordReq;
		}

		setInputStatus(prev => ({
			...prev,
			[col]: { checked: val !== "", msg }
		}));
	};

	const clickInfo = ({ col, info }) => {
		const _info = inputStatus[col].msg === "" ? i18n[info] : "";
		setInputStatus(prev => ({
			...prev,
			[col]: { checked: null, msg: _info }
		}));
	};

	const handleLogin = () => {
		const checked = userValue.UserName !== "" && userValue.Password !== "";

		if (checked) {
			const CallBackLogin = (errorCode, message, isLogin, userData) => {
				if (isMountedRef.current) {
					if (errorCode === 0) {
						setUserInfo(() => ({
							...userData,
							isLogin
						}));
						setNav(null);
						navigate(`/${path.deposit.root}`);
					} else if (
						errorCode === 1101 ||
						errorCode === 1102 ||
						errorCode === 9000
					) {
						setInputStatus(prev => ({
							...prev,
							UserName: { checked: false, msg: message }
						}));
					} else if (errorCode === 1001 || errorCode === 1003) {
						setInputStatus(prev => ({
							...prev,
							Password: { checked: false, msg: message }
						}));
					}
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
					msg: userNameCheck ? "" : i18n.msg_UsernameReq
				},
				Password: {
					checked: passwordCheck,
					msg: passwordCheck ? "" : i18n.msg_PasswordReq
				}
			});
		}
	};

	const handleloginPanel = (show, reset, showBylink) => {
		if (reset) {
			setUserValue(initValue);
			setInputStatus(initStatus);
		}

		if (showBylink) {
			navigate("/");
		} else {
			setNav(() => {
				const newState = show ? null : defNavPanel.login;
				return newState;
			});
		}
	};

	const showBylink = useMatch(path.login.root) !== null;
	const showPanel = showBylink || nav === defNavPanel.login;

	const EditField = ({ col }, e) => {
		const val = e.target.value;
		setUserValue(prev => ({
			...prev,
			[col]: val
		}));
	};

	return (
		<>
			{hideBtn ? null : (
				<button
					className="loginBtn"
					onClick={handleloginPanel.bind(this, showPanel)}>
					{ButtonTitle}
				</button>
			)}
			<div className={`Login${showPanel ? " open" : ""}`}>
				<div
					className={`close${showPanel ? " open" : ""}`}
					onClick={handleloginPanel.bind(
						this,
						showPanel,
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
				<div className="title">{i18n.lbl_Login}</div>
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
						info: "msg_UsernameReq"
					})}
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
						info: "msg_PasswordReq"
					})}
				/>
				<div className="Terms">
					<Link
						to={path.forgetPassword.root}
						onClick={handleloginPanel.bind(
							this,
							showPanel,
							true,
							showBylink
						)}>
						{i18n.lbl_ForgetPassword}?
					</Link>
				</div>
				<button onClick={handleLogin}>{i18n.lbl_Login}</button>
			</div>
		</>
	);
};

LoginPage.defaultProps = {
	ButtonTitle: "",
	hideBtn: null
};

LoginPage.propTypes = {
	ButtonTitle: PropTypes.string,
	hideBtn: PropTypes.bool
};

export default LoginPage;
