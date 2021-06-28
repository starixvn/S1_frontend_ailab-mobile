import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, Redirect } from "@reach/router";
import { i18nContext, popBoxContext, userInfoContext } from "../common/context";
import { api_ChangePassword } from "../../service/api/account";
import path from "../../path";
import Inputbox from "../common/inputbox.password.info";
import { passwordCheck } from "../common/common";

const initValue = {
	oldPsw: "",
	newPsw: ""
};

const initStatus = {
	oldPsw: {
		status: false,
		msg: ""
	},
	newPsw: {
		status: false,
		msg: ""
	}
};

export default () => {
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const { userInfo } = useContext(userInfoContext);
	const [userValue, setUserValue] = useState(initValue);
	const [inputStatus, setInputStatus] = useState(initStatus);
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
			setRedirectPath(`/${path.member.root}`);
		}
	}, [redirectPath]);

	useEffect(() => {
		if (userInfo.isLogin === false) {
			setRedirectPath(`/`);
		}
	}, [userInfo.isLogin]);

	const checkPswHandler = ({ col }, e) => {
		const val = e.target.value;
		const { checked, msg } =
			col === "oldPsw"
				? pwdEmptyCheck({ val })
				: passwordCheck({ val, i18n });

		setInputStatus(prev => ({
			...prev,
			[col]: { checked, msg }
		}));
	};

	const pwdEmptyCheck = ({ val }) => {
		let checked = true;
		let msg = "";
		if (!val) {
			checked = false;
			msg = i18n.msg_PasswordReq;
		}
		return { checked, msg };
	};

	const EditField = ({ col }, e) => {
		const val = e.target.value;
		setUserValue(prev => ({
			...prev,
			[col]: val
		}));
	};

	const clickInfo = ({ col, info }) => {
		const _info = inputStatus[col].msg === "" ? i18n[info] : "";
		setInputStatus(prev => ({
			...prev,
			[col]: { checked: null, msg: _info }
		}));
	};

	const clickSubmit = () => {
		const oldPswCheck = pwdEmptyCheck({ val: userValue.oldPsw });
		const newPswCheck = passwordCheck({ val: userValue.newPsw, i18n });

		if (oldPswCheck.checked && newPswCheck.checked) {
			const closePopbox = status => {
				setPopBox({ isOpen: false });
				if (status === "success") {
					setRedirectPath(`/${path.member.root}`);
				}
			};

			api_ChangePassword({
				OldPassword: userValue.oldPsw,
				NewPassword: userValue.newPsw
			}).then(
				res => {
					if (isMountedRef.current) {
						if (res.data.errorCode === 0) {
							setPopBox({
								isOpen: true,
								title: i18n.lbl_ImportantNote,
								content: res.data.message,
								hasBtn: true,
								btnBar: (
									<div className="btn-group">
										<button
											className="blue"
											onClick={closePopbox.bind(
												null,
												"success"
											)}>
											{i18n.lbl_Confirm}
										</button>
									</div>
								)
							});
						} else {
							setPopBox({
								isOpen: true,
								title: i18n.lbl_ImportantNote,
								content: res.data.message,
								hasBtn: true,
								btnBar: (
									<div className="btn-group">
										<button
											className="blue"
											onClick={closePopbox}>
											{i18n.lbl_Confirm}
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
		} else {
			setInputStatus({
				oldPsw: {
					checked: oldPswCheck.checked,
					msg: oldPswCheck.msg
				},
				newPsw: {
					checked: newPswCheck.checked,
					msg: newPswCheck.msg
				}
			});
		}
	};
	return redirectPath !== null ? (
		<Redirect to={redirectPath} noThrow />
	) : (
		<>
			<Inputbox
				placeholder={i18n.lbl_OldPassword}
				onBlur={checkPswHandler.bind(null, { col: "oldPsw" })}
				onChange={EditField.bind(null, { col: "oldPsw" })}
				value={userValue.oldPsw}
				btnStatus={inputStatus.oldPsw.checked}
				tip={inputStatus.oldPsw.msg}
				clickInfo={clickInfo.bind(this, {
					col: "oldPsw",
					info: "msg_PasswordReq"
				})}
				testAttr="OldPWD"
			/>
			<Inputbox
				placeholder={i18n.lbl_NewPassword}
				onBlur={checkPswHandler.bind(null, { col: "newPsw" })}
				onChange={EditField.bind(null, { col: "newPsw" })}
				value={userValue.newPsw}
				btnStatus={inputStatus.newPsw.checked}
				tip={inputStatus.newPsw.msg}
				clickInfo={clickInfo.bind(this, {
					col: "newPsw",
					info: "msg_PasswordVaildate"
				})}
				testAttr="NewPWD"
			/>
			<div className="btn-group">
				<Link className="cancel" to={`/${path.member.root}`}>
					{i18n.lbl_Back.toUpperCase()}
				</Link>
				<button
					className="submit"
					data-testid="submit_changePWD_btn"
					onClick={clickSubmit}>
					{i18n.lbl_change_password_submit}
				</button>
			</div>
		</>
	);
};
