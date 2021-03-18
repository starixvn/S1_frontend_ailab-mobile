import React, { useState, useContext, useEffect, useRef } from "react";
import { userInfoContext, i18nContext, navContext, defNavPanel } from "Context";
import {
	useMatch,
	useNavigate,
	useLocation,
	globalHistory
} from "@reach/router";
import { Link } from "@Router";
import useTip from "../hook/useTip";
import Inputbox from "../common/inputbox.hint";
import InputboxPWD from "../common/inputbox.password";
import { LOGIN } from "../../service/auth";
import path from "../../path";

const initState = {
	UserName: "",
	Password: ""
};

const initWarningState = {
	UserName: {
		status: null,
		msg: ""
	},
	Password: {
		status: null,
		msg: ""
	}
};

const warningLangKey = {
	UserName: "msg_UsernameReq",
	Password: "msg_PasswordReq"
};

const LoginPage = () => {
	const state = useLocation();
	const navigate = useNavigate();
	const { i18n } = useContext(i18nContext);
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const { nav, setNav } = useContext(navContext);
	const [userValueState, setUserValueState] = useState(initState);
	const [pswState, setPswState] = useState(false);
	const [warningState, setWarningState] = useState(initWarningState);
	const isMountedRef = useRef(null);
	const { showTips, showTipHandler } = useTip([]);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		if (state.state.fromHeader) {
			localStorage.setItem("previousPage", "/");
		}
	}, [globalHistory]);

	const checkValueHandler = (colName, e) => {
		let flag = "";
		if (colName === "Password") {
			if (e.target.value === "") {
				flag = false;
			}
		} else {
			flag = e.target.value !== "";
		}
		setWarningState(prevState => {
			return {
				...prevState,
				[colName]: {
					...prevState[colName],
					status: flag,
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
		let flag = "";
		if (userValueState.Password === "") {
			flag = false;
		}

		setWarningState(prevState => {
			return {
				...prevState,
				UserName: {
					...prevState.UserName,
					status: userValueState.UserName !== "",
					msg: i18n[warningLangKey.UserName]
				},
				Password: {
					...prevState.Password,
					status: flag,
					msg: i18n[warningLangKey.Password]
				}
			};
		});

		if (checked) {
			const CallBackLogin = (errorCode, message, isLogin, userData) => {
				if (errorCode === 0) {
					navigate(localStorage.getItem("previousPage"));
					if (isMountedRef.current) {
						setUserInfo(() => ({
							...userData,
							isLogin
						}));

						// setNav(null);
					}
				} else if (
					errorCode === 1101 ||
					errorCode === 1102 ||
					errorCode === 9000
				) {
					if (isMountedRef.current) {
						setWarningState(prevState => ({
							...prevState,
							UserName: { status: false, msg: message }
						}));
					}
				} else if (errorCode === 1001) {
					if (isMountedRef.current) {
						setWarningState(prevState => ({
							...prevState,
							Password: { status: false, msg: message }
						}));
					}
				}
			};

			LOGIN(
				{
					userName: userValueState.UserName,
					password: userValueState.Password
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
			navigate(`/${userInfo.langId}`);
		} else {
			setNav(() => {
				const newState = show ? null : defNavPanel.login;
				return newState;
			});
		}
	};

	const showBylink = useMatch(path.login.root) || nav === defNavPanel.login;

	const EditField = (colName, e) => {
		const { value } = e.target;
		setUserValueState(prevState => ({
			...prevState,
			[colName]: value
		}));
	};

	return (
		<div className="Login active">
			<Inputbox
				icon="icon-member"
				inputType="text"
				placeholder={i18n.lbl_Username}
				warningMsg={warningState.UserName.msg}
				value={userValueState.UserName}
				onChange={EditField.bind(null, "UserName")}
				onBlur={checkValueHandler.bind(null, "UserName")}
				btnStatus={warningState.UserName.status}
				infoText={i18n.lbl_UsernameTooltip}
				clickInfo={() => showTipHandler("UserName")}
				showTips={showTips.includes("UserName")}
			/>

			<InputboxPWD
				infoModule="infoModule"
				icon="icon-key"
				inputType={`${!pswState ? "password" : "text"}`}
				placeholder={i18n.lbl_Password}
				showPsw={pswState}
				showPswHandler={showPswHandler}
				value={userValueState.Password}
				onChange={EditField.bind(null, "Password")}
				onBlur={checkValueHandler.bind(null, "Password")}
				tips={i18n.msg_PasswordVaildate}
				warningMsg={warningState.Password.msg}
				clickInfo={() => showTipHandler("Password")}
				showTips={showTips.includes("Password")}
				checked={warningState.Password.status}
			/>

			<div className="Terms">
				<Link
					to={path.forgetPassword.root}
					onClick={handleloginPanel.bind(
						this,
						showBylink,
						true,
						showBylink
					)}>
					{i18n.lbl_ForgetPassword}?
				</Link>
			</div>
			<div className="btn-group">
				<button onClick={handleLogin}>{i18n.lbl_Login}</button>
			</div>

			<Link to="/">
				<div className="visit">
					{i18n.lbl_IWouldLikeToVisit}
					<i className="icon icon-visit" />
				</div>
			</Link>
		</div>
	);
};

export default LoginPage;
