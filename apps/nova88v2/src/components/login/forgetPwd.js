import React, { useState, useContext, useEffect, useRef } from "react";
import { i18nContext, popBoxContext, userInfoContext } from "Context";
import { useNavigate } from "@reach/router";
import path from "Path";
import useTip from "../hook/useTip";
import Inputbox from "../common/inputbox.hint";
import Layout from "../common/layout";
import api from "../../service/api";
import Header from "../header/header";

const ForgetPwd = () => {
	const navigate = useNavigate();
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const { userInfo } = useContext(userInfoContext);
	const [userEmail, setUserEmail] = useState("");
	const [warning, setWarning] = useState({ status: null, msg: "" });
	const { showTips, showTipHandler } = useTip();
	const isMountedRef = useRef(null);
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

		setWarning({ status: checked, msg: message });
	};

	const clickSubmit = () => {
		if (userEmail === "") {
			setWarning({ status: false, msg: i18n.msg_MailWrongFormat });
		} else if (warning.status) {
			api.site
				.ForgetPwd({
					langId: userInfo.langId,
					Email: userEmail
				})
				.then(
					res => {
						if (isMountedRef.current) {
							if (res.data.errorCode !== 0) {
								setWarning({
									status: false,
									msg: res.data.message
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

	const ClickBack = () => {
		navigate(`/${userInfo.langId}/${path.login.root}`);
	};

	return (
		<>
			<Inputbox
				icon="icon-email"
				inputType="text"
				placeholder={i18n.lbl_Email}
				value={userEmail}
				onChange={EditField.bind(null)}
				onBlur={checkEmailHandler.bind(null)}
				btnStatus={warning.status}
				warningMsg={warning.msg}
				infoText={i18n.lbl_ForgetPwdHint}
				clickInfo={() => showTipHandler("Email")}
				showTips={showTips.includes("Email")}
			/>
			<div className="btn-group">
				<button className="white" onClick={ClickBack}>
					{i18n.lbl_Back}
				</button>
				<button className="orange" onClick={clickSubmit}>
					{i18n.lbl_Submit}
				</button>
			</div>
		</>
	);
};

const IndexPage = () => {
	const { i18n } = useContext(i18nContext);
	const header = <Header title={i18n.lbl_ForgetPassword} hideLogo={true} />;
	return (
		<Layout mainClass="main" header={header}>
			<ForgetPwd />
		</Layout>
	);
};

export default IndexPage;
