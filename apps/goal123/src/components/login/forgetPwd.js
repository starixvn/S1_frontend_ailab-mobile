import React, { useState, useContext, useEffect, useRef } from "react";
import { Redirect } from "@reach/router";
import {
	i18nContext,
	popBoxContext,
	userInfoContext,
	defNavPanel,
	navContext
} from "../common/context";
import { api_ForgetPwd } from "../../service/api/site";
import Inputbox from "../common/inputbox.info";
import Layout from "../common/layout";

export default () => {
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const { userInfo } = useContext(userInfoContext);
	const { setNav } = useContext(navContext);
	const [userEmail, setUserEmail] = useState("");
	const [inputStatus, setInputStatus] = useState({ checked: null, msg: "" });
	const isMountedRef = useRef(null);
	const [redirectPath, setRedirectPath] = useState(null);

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

	const checkEmailHandler = e => {
		const val = e.target.value;
		let checked = true;
		let msg = "";
		const regx = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;

		if (val === "") {
			checked = false;
			msg = i18n.msg_MailWrongFormat;
		} else if (val !== null) {
			if (!regx.test(val)) {
				checked = false;
				msg = i18n.msg_MailWrongFormat;
			}
		}
		setInputStatus({ checked, msg });
	};

	const clickInfo = () => {
		const info = inputStatus.msg === "" ? i18n.lbl_EmailRequired : "";
		setInputStatus({ checked: null, msg: info });
	};

	const clickSubmit = () => {
		const clickClose = () => {
			setPopBox({ isOpen: false });
		};

		if (userEmail === "") {
			setInputStatus({ checked: false, msg: i18n.msg_MailWrongFormat });
		} else if (inputStatus.checked) {
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
											className="orange"
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
		<Layout title={i18n.lbl_ForgetPassword}>
			<Inputbox
				icon="icon icon-email"
				placeholder={i18n.lbl_Email}
				value={userEmail}
				onChange={EditField.bind(null)}
				onBlur={checkEmailHandler.bind(null)}
				btnStatus={inputStatus.checked}
				tip={inputStatus.msg}
				clickInfo={clickInfo}
				testAttr="Email"
			/>
			<div className="btn-group">
				<button
					className="blue"
					onClick={ClickBack}
					data-testid="forgetPWD_clickback_btn">
					{i18n.lbl_Back}
				</button>
				<button
					className="lightBlue"
					onClick={clickSubmit}
					data-testid="submit_forgetPWD_btn">
					{i18n.lbl_Submit}
				</button>
			</div>
		</Layout>
	) : (
		<Redirect to={redirectPath} noThrow />
	);
};
