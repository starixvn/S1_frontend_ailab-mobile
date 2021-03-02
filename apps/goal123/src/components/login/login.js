import React, { useState, useContext, useEffect, useRef } from "react";
import { useMatch, Link, useNavigate } from "@reach/router";
import PropTypes from "prop-types";
import Inputbox from "../common/inputbox";
import InputboxPWD from "../common/inputbox.password";
import { LOGIN } from "../../service/auth";
import {
	userInfoContext,
	i18nContext,
	navContext,
	defNavPanel
} from "../common/context";
import path from "../../path";
import Logo from "../common/logo";

const initState = {
	UserName: "",
	Password: "",
	Checkbox: false
};

const initWarningState = {
	UserName: {
		status: false,
		msg: ""
	},
	Password: {
		status: false,
		msg: ""
	},
	Checkbox: {
		status: false,
		msg: ""
	}
};

const warningLangKey = {
	UserName: "msg_UsernameReq",
	Password: "msg_PasswordReq"
};

const LoginPage = ({ ButtonTitle, hideBtn }) => {
	const navigate = useNavigate();
	const { i18n } = useContext(i18nContext);
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const { nav, setNav } = useContext(navContext);
	const [userValueState, setUserValueState] = useState(initState);
	const [pswState, setPswState] = useState(false);
	const [warningState, setWarningState] = useState(initWarningState);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const checkValueHandler = (colName, e) => {
		const val = e.target.value;
		setWarningState(prevState => {
			return {
				...prevState,
				[colName]: {
					...prevState[colName],
					status: val === "",
					msg: i18n[warningLangKey[colName]]
				}
			};
		});
	};

	const showPswHandler = () => {
		setPswState(!pswState);
	};

	const handleLogin = () => {
		const checked =
			userValueState.UserName !== "" && userValueState.Password !== "";

		setWarningState(prevState => {
			return {
				...prevState,
				UserName: {
					...prevState.UserName,
					status: userValueState.UserName === "",
					msg: i18n[warningLangKey.UserName]
				},
				Password: {
					...prevState.Password,
					status: userValueState.Password === "",
					msg: i18n[warningLangKey.Password]
				}
			};
		});

		if (checked) {
			const CallBackLogin = (errorCode, message, isLogin, userData) => {
				if (errorCode === 0) {
					if (isMountedRef.current) {
						setUserInfo(() => ({
							...userData,
							isLogin
						}));
						setNav(null);
						navigate(`/${path.deposit.root}`);
					}
				} else if (
					errorCode === 1101 ||
					errorCode === 1102 ||
					errorCode === 9000
				) {
					if (isMountedRef.current) {
						setWarningState(prevState => ({
							...prevState,
							UserName: { status: true, msg: message }
						}));
					}
				} else if (errorCode === 1001) {
					if (isMountedRef.current) {
						setWarningState(prevState => ({
							...prevState,
							Password: { status: true, msg: message }
						}));
					}
				}
			};

			LOGIN(
				{
					userName: userValueState.UserName,
					password: userValueState.Password,
					langId: userInfo.langId
				},
				CallBackLogin
			);
		}
	};

	const handleloginPanel = (show, reset, showBylink) => {
		if (reset) {
			setUserValueState(initState);
			setWarningState(initWarningState);
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

	const EditField = (colName, e) => {
		const { value } = e.target;
		setUserValueState(prevState => ({
			...prevState,
			[colName]: value
		}));
	};

	return (
		<>
			{hideBtn ? null : (
				<button onClick={handleloginPanel.bind(this, showPanel)}>
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
					icon="icon-member"
					inputType="text"
					placeholder={i18n.lbl_Username}
					onBlur={checkValueHandler.bind(null, "UserName")}
					onChange={EditField.bind(null, "UserName")}
					ClassName="JoinRule"
					Warning={warningState.UserName}
					value={userValueState.UserName}
				/>

				<InputboxPWD
					icon="icon-key"
					inputType={`${!pswState ? "password" : "text"}`}
					placeholder={i18n.lbl_Password}
					onBlur={checkValueHandler.bind(null, "Password")}
					onChange={EditField.bind(null, "Password")}
					showPsw={pswState}
					showPswHandler={showPswHandler}
					ClassName="JoinRule"
					Warning={warningState.Password}
					value={userValueState.Password}
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
