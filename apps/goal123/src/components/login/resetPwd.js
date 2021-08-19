import React, { useState, useContext, useEffect, useRef } from "react";
import { Redirect } from "@reach/router";
import { i18nContext, popBoxContext, userInfoContext } from "../common/context";
import { api_ResetPassword } from "../../service/api/accountStrict";
import { api_CheckResetPwdToken } from "../../service/api/site";
import Inputbox from "../common/inputbox.password.info";
import { getUrlParameter, passwordCheck } from "../common/common";

export default () => {
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const [newPsw, setNewPsw] = useState("");
	const [inputStatus, setInputStatus] = useState({ checked: null, msg: "" });
	const [redirectPath, setRedirectPath] = useState(null);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		if (isMountedRef.current && redirectPath !== null) {
			setRedirectPath(null);
		}
	}, [redirectPath]);

	useEffect(() => {
		const key = getUrlParameter("key");
		if (
			key &&
			userInfo.isLogin === false &&
			userInfo.loginFromResetPwd === undefined
		) {
			api_CheckResetPwdToken(key).then(
				res => {
					if (isMountedRef.current) {
						if (res.data.errorCode === 1) {
							setRedirectPath("/");
							setUserInfo(prevState => ({
								...prevState,
								isLogin: true
							}));
						} else if (res.data.errorCode === 0) {
							setUserInfo(prevState => ({
								...prevState,
								isLogin: true,
								loginFromResetPwd: true
							}));
						} else {
							setRedirectPath("/");
							setPopBox({
								isOpen: true,
								title: i18n.lbl_ImportantNote,
								content: i18n.msg_ApiServerError
							});
						}
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
		} else if (
			userInfo.isLogin &&
			!userInfo.loginFromResetPwd &&
			isMountedRef.current
		) {
			setRedirectPath("/");
		}
	}, [
		redirectPath,
		i18n,
		setPopBox,
		setUserInfo,
		userInfo.isLogin,
		userInfo.loginFromResetPwd
	]);

	const EditField = e => {
		const val = e.target.value;
		setNewPsw(val);
	};

	const checkPswHandler = e => {
		const result = passwordCheck({ val: e.target.value, i18n });
		setInputStatus(result);
	};

	const clickInfo = () => {
		const msg = inputStatus.msg === "" ? i18n.lbl_PasswordTooltip : "";
		setInputStatus({ checked: null, msg });
	};

	const clickSubmit = () => {
		if (newPsw === "") {
			setInputStatus({ checked: false, msg: i18n.msg_PasswordReq });
		} else {
			api_ResetPassword({ NewPassword: newPsw }).then(
				res => {
					if (isMountedRef.current) {
						if (res.data.errorCode !== 0) {
							setPopBox({
								isOpen: true,
								title: i18n.lbl_ImportantNote,
								content: res.data.message
							});
						} else {
							const RedirectToHome = () => {
								setRedirectPath("/");
								setPopBox({ isOpen: false });
							};
							setPopBox({
								isOpen: true,
								title: i18n.lbl_ResetPassword,
								content: (
									<>
										{i18n.msg_changePswUpdateSuccess}
										<br />
										{i18n.msg_changePswSuccessHint}
									</>
								),
								handlePopBox: RedirectToHome,
								hasBtn: true,
								btnBar: (
									<div className="btn-group">
										<button
											className="orange"
											onClick={RedirectToHome}>
											OK
										</button>
									</div>
								)
							});
						}
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
		}
	};

	return redirectPath === null ? (
		<>
			<Inputbox
				placeholder={i18n.lbl_Password}
				value={newPsw}
				onChange={EditField.bind(null)}
				onBlur={checkPswHandler.bind(null)}
				btnStatus={inputStatus.checked}
				tip={inputStatus.msg}
				clickInfo={clickInfo}
				testAttr="Password"
			/>
			<div className="btn-group">
				<button
					className="lightBlue"
					data-testid="submit_resetPwd_btn"
					onClick={clickSubmit}>
					{i18n.lbl_Submit}
				</button>
			</div>
		</>
	) : (
		<Redirect to={redirectPath} noThrow />
	);
};
