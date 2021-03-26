import React, { useState, useContext, useEffect, useRef } from "react";
import { i18nContext, popBoxContext, userInfoContext } from "Context";
import { useNavigate } from "@reach/router";
import Inputbox from "../common/inputbox.password";
import useTip from "../hook/useTip";
import { LOGOUT } from "../../service/auth";
import Layout from "../common/layout";
import api from "../../service/api";
import { getUrlParameter, passwordCheck } from "../common/common";
import Header from "../header/header";

const ResetPwd = () => {
	const navigate = useNavigate();
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const [newPsw, setNewPsw] = useState("");
	const [pswState, setPswState] = useState(false);
	const { showTips, showTipHandler } = useTip();
	const [warning, setWarning] = useState({ status: null, msg: "" });
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		const key = getUrlParameter("key");

		if (key) {
			if (userInfo.isLogin === false) {
				api.site.CheckResetPwdToken(key).then(
					res => {
						if (isMountedRef.current) {
							if (res.data.errorCode === 1) {
								navigate(`/${userInfo.langId}`);
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
								navigate(`/${userInfo.langId}`);
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
			}
		} else if (isMountedRef.current) {
			navigate(`/${userInfo.langId}`);
		}
	}, [
		userInfo.isLogin,
		setPopBox,
		setUserInfo,
		i18n,
		navigate,
		userInfo.langId
	]);

	const showPswHandler = () => {
		setPswState(!pswState);
	};

	const EditField = e => {
		const val = e.target.value;
		setNewPsw(val);
	};

	const checkPswHandler = e => {
		const val = e.target.value;
		const result = passwordCheck({ val });
		setWarning({ status: result.checked, msg: i18n[result.msg] });
	};

	const clickSubmit = () => {
		if (newPsw === "") {
			setWarning({ status: false, msg: i18n.msg_PasswordReq });
		} else if (warning.status === true) {
			api.accountStrict.ResetPassword({ NewPassword: newPsw }).then(
				res => {
					if (isMountedRef.current) {
						if (res.data.errorCode !== 0) {
							setWarning({
								status: false,
								msg: res.data.message
							});
						} else {
							const RedirectToHome = () => {
								LOGOUT(() => {
									navigate(`/${userInfo.langId}`);
									setUserInfo(prevState => ({
										isLogin: false,
										langId: prevState.langId
									}));
								});

								setPopBox({ isOpen: false });
							};
							setPopBox({
								isOpen: true,
								title: i18n.lbl_ImportantNote,
								content: res.data.message,
								hideCloseBtn: true,
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

	return (
		<>
			<Inputbox
				icon="icon-key"
				inputType={`${!pswState ? "password" : "text"}`}
				placeholder={i18n.lbl_Password}
				value={newPsw}
				onChange={EditField.bind(null)}
				onBlur={checkPswHandler.bind(null)}
				showPsw={pswState}
				showPswHandler={showPswHandler}
				checked={warning.status}
				tips={i18n.msg_PasswordVaildate}
				warningMsg={warning.msg}
				clickInfo={() => showTipHandler("Password")}
				showTips={showTips.includes("Password")}
			/>
			<div className="btn-group">
				<button className="orange" onClick={clickSubmit}>
					{i18n.lbl_Submit}
				</button>
			</div>
		</>
	);
};

const IndexPage = () => {
	const header = <Header title={i18n.lbl_ResetPassword} hideLogo={true} />;
	return (
		<Layout mainClass="main" header={header}>
			<ResetPwd />
		</Layout>
	);
};

export default IndexPage;
