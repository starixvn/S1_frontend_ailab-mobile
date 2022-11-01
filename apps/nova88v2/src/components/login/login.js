import React, { useState, useContext, useEffect, useRef } from "react";
import { userInfoContext, i18nContext, navContext, defNavPanel } from "Context";
import { useMatch, useNavigate } from "@reach/router";
import { Link } from "@Router";
import useTip from "../hook/useTip";
import Inputbox from "../common/inputbox.hint";
import InputboxPWD from "../common/inputbox.password";
import { LOGIN } from "../../service/auth";
import path from "../../path";
import { siteInfo } from "../../config";
import { getUrlParameter, defCurrenyId, setCookie } from "../common/common";
import useHandleLineLogin, { defType } from "../hook/useHandleLineLogin";

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

const LoginPage = () => {
	const navigate = useNavigate();
	const { i18n } = useContext(i18nContext);
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const { nav, setNav } = useContext(navContext);
	const [userValueState, setUserValueState] = useState(initState);
	const [pswState, setPswState] = useState(false);
	const [warningState, setWarningState] = useState(initWarningState);
	const isMountedRef = useRef(null);
	const { showTips, showTipHandler } = useTip();
	const { lineLogin } = useHandleLineLogin();
	const lineUserId = getUrlParameter("line");

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const checkValueHandler = (colName, e) => {
		let flag = "";
		const val = e.target.value;
		let col = "";
		if (colName === "Password") {
			if (val === "") {
				flag = false;
				col = "msg_PasswordReq";
			}
		} else {
			const reg = /^(?=.{6,18}$)(?=.*[a-zA-Z0-9]$)/;
			if (
				(val.length < 6 || val.length > 18 || !reg.test(val)) &&
				val !== ""
			) {
				flag = false;
				col = "lbl_UsernameInvalid";
			}
			if (val === "") {
				flag = false;
				col = "msg_UsernameReq";
			}
		}
		setWarningState(prevState => {
			return {
				...prevState,
				[colName]: {
					...prevState[colName],
					status: flag,
					msg: i18n[col]
				}
			};
		});
	};

	const showPswHandler = () => {
		setPswState(!pswState);
	};

	const handleLogin = () => {
		const stat = {
			pw: { msg: "", checked: true },
			userName: { msg: "", checked: true }
		};
		const reg = /^(?=.{6,18}$)(?=.*[a-zA-Z0-9]$)/;
		if (userValueState.Password === "") {
			stat.pw.checked = false;
			stat.pw.msg = "msg_PasswordReq";
		}
		if (
			(userValueState.UserName.length < 6 ||
				userValueState.UserName.length > 18 ||
				!reg.test(userValueState.UserName)) &&
			userValueState.UserName !== ""
		) {
			stat.userName.checked = false;
			stat.userName.msg = "lbl_UsernameInvalid";
		}
		if (userValueState.UserName === "") {
			stat.userName.checked = false;
			stat.userName.msg = "msg_UsernameReq";
		}
		setWarningState(prevState => {
			return {
				...prevState,
				UserName: {
					...prevState.UserName,
					status: stat.userName.checked,
					msg: i18n[stat.userName.msg]
				},
				Password: {
					...prevState.Password,
					status: stat.pw.checked,
					msg: i18n[stat.pw.msg]
				}
			};
		});

		if (stat.pw.checked && stat.userName.checked) {
			const CallBackLogin = (errorCode, message, isLogin, userData) => {
				if (errorCode === 0) {
					if (isMountedRef.current) {
						setCookie(
							siteInfo(userData.langId).langCookie,
							userData.langId
						);
						setUserInfo(() => ({
							...userData,
							isLogin
						}));
						navigate(`/${userInfo.langId}/${path.deposit.root}`);
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

	const handleLineLogin = e => {
		e.preventDefault();
		lineLogin({ type: defType.login });
	};

	return (
		<div className="Login active">
			{(userInfo.langId === "th" ||
				userInfo.currencyId === defCurrenyId.THB) &&
				!lineUserId && (
					<div className="register-line">
						<div className="btn-group">
							<button
								className="btn-line"
								onClick={e => {
									handleLineLogin(e);
								}}>
								<i className="icon icon-line-bold" />
								{i18n.lbl_Login}
							</button>
						</div>
					</div>
				)}
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
				testAttr="UserName"
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
				testAttr="Password"
			/>

			<div className="Terms" data-testid="forgetpw">
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
				<button onClick={handleLogin} data-testid="login_submit">
					{i18n.lbl_Login}
				</button>
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
