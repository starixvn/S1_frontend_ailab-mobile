import React, { useState, useContext, useEffect, useRef } from "react";
import { useMatch, Link, useNavigate } from "@reach/router";
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
import Logo from "../img/logo";
import useShieldCheck from "../hook/useShieldCheck";

const initState = {
	UserName: "",
	Password: ""
};

const initStatus = {
	UserName: {
		checked: null,
		msg: ""
	},
	Password: {
		checked: null,
		msg: ""
	}
};

const LoginPage = () => {
	const navigate = useNavigate();
	const { i18n } = useContext(i18nContext);
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const { nav, setNav } = useContext(navContext);
	const [userValue, setUserValue] = useState(initState);
	const [inputStatus, setInputStatus] = useState(initStatus);
	const isMountedRef = useRef(null);
	const { getShieldData, saveShieldData, isShieldLoaded } = useShieldCheck();

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		const showBylink = window.location.pathname === `/${path.login.root}`;
		const openPanel = showBylink || nav === defNavPanel.login;

		if (openPanel && isShieldLoaded) {
			getShieldData();
		}
	}, [nav]);

	const checkValue = ({ col }, e) => {
		const val = e.target.value;
		const _msg = col === "UserName" ? "msg_UsernameReq" : "msg_PasswordReq";
		setInputStatus(prev => ({
			...prev,
			[col]: {
				checked: val !== "",
				msg: val === "" ? i18n[_msg] : ""
			}
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
						saveShieldData();
						navigate(`/`);
					} else if (
						errorCode === 1101 ||
						errorCode === 1102 ||
						errorCode === 9000 ||
						errorCode === 1103
					) {
						setInputStatus(prev => ({
							...prev,
							UserName: { checked: false, msg: message }
						}));
					} else if (errorCode === 1001) {
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
			setUserValue(initState);
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
		let val = e.target.value;

		if (col === "UserName") {
			val = val.replace(/[\W_]/g, "");
		}

		setUserValue(prev => ({
			...prev,
			[col]: val
		}));
	};

	return (
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
			/>
			<InputboxPWD
				placeholder={i18n.lbl_Password}
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
			/>
			<div className="Terms">
				<Link
					data-testid="forgetpw"
					to={`/${path.forgetPassword.root}`}
					onClick={handleloginPanel.bind(
						this,
						showPanel,
						true,
						showBylink
					)}>
					{i18n.lbl_ForgetPassword}?
				</Link>
			</div>
			<button data-testid="login_submit" onClick={handleLogin}>
				{i18n.lbl_Login}
			</button>
		</div>
	);
};

export default LoginPage;
