import React, { useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "@reach/router";
import { Link } from "@Router";
import { i18nContext, popBoxContext, userInfoContext } from "Context";
import path from "../../path";
import useTip from "../hook/useTip";
import Inputbox from "../common/inputbox.password";
import api from "../../service/api";
import Layout from "../common/layout";
import { passwordCheck } from "../common/common";
import Header from "../header/header";

const initState = {
	oldPsw: "",
	newPsw: ""
};

const initWarningState = {
	oldPsw: {
		status: null,
		msg: ""
	},
	newPsw: {
		status: null,
		msg: ""
	}
};

const initPswState = {
	oldPsw: false,
	newPsw: false
};
const ChangePwd = () => {
	const navigate = useNavigate();
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const [userValueState, setUserValueState] = useState(initState);
	const { showTips, showTipHandler } = useTip();
	const [warningState, setWarningState] = useState(initWarningState);
	const [pswState, setPswState] = useState(initPswState);
	const isMountedRef = useRef(null);

	useEffect(() => {
		if (!userInfo.isLogin) {
			navigate(`/${userInfo.langId}`);
		}
	}, [userInfo.isLogin]);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const showPswHandler = col => {
		setPswState(prevState => ({
			...prevState,
			[col]: !pswState[col]
		}));
	};

	const checkPswHandler = (colName, e) => {
		const _val = e.target.value;

		const result =
			colName === "oldPsw"
				? pwdEmptyCheck({ val: _val })
				: passwordCheck({ val: _val });

		setWarningState(prevState => {
			return {
				...prevState,
				[colName]: {
					status: result.checked,
					msg: i18n[result.msg]
				}
			};
		});
	};

	const pwdEmptyCheck = ({ val }) => {
		let msg = "";
		let checked = true;
		if (!val) {
			checked = false;
			msg = "msg_PasswordReq";
		}
		return { checked, msg };
	};

	const EditField = (colName, e) => {
		const { value } = e.target;

		setUserValueState(prevState => ({
			...prevState,
			[colName]: value
		}));
	};

	const clickSubmit = () => {
		const oldPsw = pwdEmptyCheck({ val: userValueState.oldPsw });
		const newPsw = passwordCheck({ val: userValueState.newPsw });

		if (oldPsw.checked && newPsw.checked) {
			const closePopbox = isSuccess => {
				setPopBox({ isOpen: false });
				setUserInfo(prev => ({
					...prev,
					isResetPwd: false
				}));
				if (isSuccess === true) {
					navigate(`/${userInfo.langId}/${path.profile.root}`);
				}
			};

			api.account
				.ChangePassword({
					OldPassword: userValueState.oldPsw,
					NewPassword: userValueState.newPsw
				})
				.then(
					res => {
						if (isMountedRef.current) {
							setWarningState({
								oldPsw: {
									status: null,
									msg: ""
								},
								newPsw: {
									status: null,
									msg: ""
								}
							});
							if (res.data.errorCode === 0) {
								setPopBox({
									isOpen: true,
									title: i18n.lbl_ImportantNote,
									content: res.data.message,
									hasBtn: true,
									btnBar: (
										<div className="btn-group">
											<button
												className="orange"
												onClick={closePopbox.bind(
													null,
													true
												)}>
												{i18n.lbl_Confirm}
											</button>
										</div>
									)
								});
							} else {
								setPopBox({
									isOpen: true,
									content: `[${res.data.errorCode}] ${res.data.message}`
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
		} else {
			setWarningState({
				oldPsw: {
					status: oldPsw.checked,
					msg: i18n[oldPsw.msg]
				},
				newPsw: { status: newPsw.checked, msg: i18n[newPsw.msg] }
			});
		}
	};

	return (
		<>
			<Inputbox
				icon="icon-key"
				inputType={`${!pswState.oldPsw ? "password" : "text"}`}
				placeholder={i18n.lbl_OldPassword}
				onBlur={checkPswHandler.bind(null, "oldPsw")}
				onChange={EditField.bind(null, "oldPsw")}
				showPsw={pswState.oldPsw}
				showPswHandler={showPswHandler.bind(null, "oldPsw")}
				checked={warningState.oldPsw.status}
				tips={i18n.msg_PasswordVaildate}
				warningMsg={warningState.oldPsw.msg}
				clickInfo={() => showTipHandler("oldPsw")}
				showTips={showTips.includes("oldPsw")}
				value={userValueState.oldPsw}
				showInfoIcon={false}
				testAttr="OldPWD"
			/>
			<Inputbox
				icon="icon-key"
				inputType={`${!pswState.newPsw ? "password" : "text"}`}
				placeholder={i18n.lbl_NewPassword}
				onBlur={checkPswHandler.bind(null, "newPsw")}
				onChange={EditField.bind(null, "newPsw")}
				showPsw={pswState.newPsw}
				showPswHandler={showPswHandler.bind(null, "newPsw")}
				checked={warningState.newPsw.status}
				tips={i18n.msg_PasswordVaildate}
				warningMsg={warningState.newPsw.msg}
				clickInfo={() => showTipHandler("newPsw")}
				showTips={showTips.includes("newPsw")}
				value={userValueState.newPsw}
				showInfoIcon={true}
				testAttr="NewPWD"
			/>
			<div className="btn-group">
				<Link className="white" to={`${path.profile.root}`}>
					{i18n.lbl_Back}
				</Link>
				<button
					className="orange"
					onClick={clickSubmit}
					data-testid="submit_changePWD_btn">
					{i18n.lbl_Submit}
				</button>
			</div>
		</>
	);
};

const IndexPage = () => {
	const { i18n } = useContext(i18nContext);
	const header = <Header title={i18n.lbl_ChangePassword} hideLogo={true} />;
	return (
		<Layout mainClass="main" header={header}>
			<ChangePwd />
		</Layout>
	);
};

export default IndexPage;
