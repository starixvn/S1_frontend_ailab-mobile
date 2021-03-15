import React, { useState, useContext, useEffect, useRef } from "react";
import { i18nContext, popBoxContext, userInfoContext } from "Context";
import { useNavigate } from "@reach/router";
import path from "Path";
import Inputbox from "../common/inputbox.hint";
import Layout from "../common/layout";
import api from "../../service/api";

const ForgetPwd = () => {
	const navigate = useNavigate();
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const { userInfo } = useContext(userInfoContext);
	const [userEmail, setUserEmail] = useState("");
	const [showTips, setTips] = useState([]);
	const [warning, setWarning] = useState({ status: null, msg: "" });
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

	const showTip = col => {
		if (showTips.includes(col)) {
			setTips(showTips.filter(el => el !== col));
		} else {
			setTips(prev => [...prev, col]);
		}
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
				clickInfo={showTip.bind(null, "Email")}
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
	return (
		<Layout mainClass="main">
			<ForgetPwd />
		</Layout>
	);
};

export default IndexPage;
