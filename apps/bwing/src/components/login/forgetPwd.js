import React, { useState, useContext, useEffect, useRef } from "react";
import { Redirect } from "@reach/router";
import {
	i18nContext,
	popBoxContext,
	userInfoContext,
	navContext,
	defNavPanel
} from "../common/context";
import { api_ForgetPwd } from "../../service/api/site";
import Inputbox from "../common/inputbox.info";

export default () => {
	const { i18n } = useContext(i18nContext);
	const { setNav } = useContext(navContext);
	const { setPopBox } = useContext(popBoxContext);
	const { userInfo } = useContext(userInfoContext);
	const [userEmail, setUserEmail] = useState("");
	const [inputStatus, setInputStatus] = useState({ checked: null, msg: "" });
	const isMountedRef = useRef(null);
	const [redirectPath, setRedirectPath] = useState(null);

	useEffect(() => {
		if (userInfo.isLogin) {
			setRedirectPath(`/`);
		}
	}, [userInfo.isLogin]);

	useEffect(() => {
		if (isMountedRef.current && redirectPath !== null) {
			setRedirectPath(null);
		}
	}, [redirectPath]);
	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const EditField = e => {
		const val = e.target.value;
		setUserEmail(val);
	};

	const clickInfo = () => {
		const info = inputStatus.msg === "" ? i18n.lbl_EmailRequired : "";
		setInputStatus({ checked: null, msg: info });
	};

	const checkEmailHandler = e => {
		const val = e.target.value;
		let checked = true;
		let message = "";
		const regx = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;

		if (val === "") {
			checked = false;
			message = i18n.msg_MailWrongFormat;
		} else if (val !== null) {
			if (!regx.test(val)) {
				checked = false;
				message = i18n.msg_MailWrongFormat;
			}
		}

		setInputStatus({ checked, msg: message });
	};

	const clickSubmit = () => {
		const clickClose = () => {
			setPopBox({ isOpen: false });
		};

		if (userEmail === "") {
			setInputStatus({ checked: false, msg: i18n.msg_MailWrongFormat });
		} else {
			api_ForgetPwd({ Email: userEmail, langId: userInfo.langId }).then(
				res => {
					if (isMountedRef.current) {
						if (res.data.errorCode !== 0) {
							setPopBox({
								isOpen: true,
								content: `[${res.data.errorCode}] ${res.data.message}`
							});
						} else {
							setPopBox({
								isOpen: true,
								title: i18n.lbl_ImportantNote,
								content: i18n.lbl_ForgetPwdSuccess,
								hasBtn: true,
								btnBar: (
									<div className="btn-group">
										<button
											className="submit"
											onClick={clickClose}>
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
							content: i18n.msg_ApiServerError
						});
					}
				}
			);
		}
	};

	const ClickBack = () => {
		setRedirectPath("/");
		setNav(defNavPanel.login);
	};

	return redirectPath === null ? (
		<>
			<Inputbox
				icon="icon icon-email"
				placeholder={i18n.lbl_Email}
				value={userEmail}
				onChange={EditField.bind(null)}
				onBlur={checkEmailHandler.bind(null)}
				tip={inputStatus.msg}
				btnStatus={inputStatus.checked}
				clickInfo={clickInfo}
				testAttr="Email"
			/>
			<div className="btn-group">
				<button
					className="cancel"
					data-testid="forgetPWD_clickback_btn"
					onClick={ClickBack}>
					{i18n.lbl_Back}
				</button>
				<button
					className="submit"
					data-testid="submit_forgetPWD_btn"
					onClick={clickSubmit}>
					{i18n.lbl_Submit}
				</button>
			</div>
		</>
	) : (
		<Redirect to={redirectPath} noThrow />
	);
};
