import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, Redirect } from "@reach/router";
import { i18nContext, popBoxContext } from "../common/context";
import { api_ChangePassword } from "../../service/api/account";
import path from "../../path";
import Inputbox from "../common/inputbox.password.info";
import { passwordCheck } from "../common/common";
import Layout from "../common/layout";

const initValue = { oldPwd: "", newPwd: "" };
const initStatus = {
	oldPwd: { checked: null, msg: "" },
	newPwd: { checked: null, msg: "" }
};

export default () => {
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
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

	const checkPsw = ({ col }, e) => {
		const val = e.target.value;
		const result =
			col === "oldPwd"
				? pwdEmptyCheck({ val })
				: passwordCheck({ val, i18n });

		setInputStatus(prev => ({
			...prev,
			[col]: result
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
		const oldPwdCheck = pwdEmptyCheck({ val: userValue.oldPwd });
		const newPwdCheck = passwordCheck({ val: userValue.newPwd, i18n });

		if (oldPwdCheck.checked && newPwdCheck.checked) {
			const closePopbox = status => {
				setPopBox({ isOpen: false });
				if (status === "success") {
					setRedirectPath(`/${path.member.root}`);
				}
			};

			api_ChangePassword({
				OldPassword: userValue.oldPwd,
				NewPassword: userValue.newPwd
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
											className="orange"
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
											className="orange"
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
			setInputStatus({ oldPwd: oldPwdCheck, newPwd: newPwdCheck });
		}
	};

	return redirectPath !== null ? (
		<Redirect to={redirectPath} noThrow />
	) : (
		<Layout title={i18n.lbl_ChangePassword}>
			<Inputbox
				placeholder={i18n.lbl_OldPassword}
				onBlur={checkPsw.bind(this, { col: "oldPwd" })}
				onChange={EditField.bind(this, { col: "oldPwd" })}
				value={userValue.oldPwd}
				btnStatus={inputStatus.oldPwd.checked}
				tip={inputStatus.oldPwd.msg}
				clickInfo={clickInfo.bind(this, {
					col: "oldPwd",
					info: "msg_PasswordReq"
				})}
				testAttr="OldPWD"
			/>
			<Inputbox
				placeholder={i18n.lbl_NewPassword}
				onBlur={checkPsw.bind(this, { col: "newPwd" })}
				onChange={EditField.bind(this, { col: "newPwd" })}
				value={userValue.newPwd}
				btnStatus={inputStatus.newPwd.checked}
				tip={inputStatus.newPwd.msg}
				clickInfo={clickInfo.bind(this, {
					col: "newPwd",
					info: "lbl_PasswordTooltip"
				})}
				testAttr="NewPWD"
			/>
			<div className="btn-group">
				<Link className="blue" to={`/${path.member.root}`}>
					{i18n.lbl_Back}
				</Link>
				<button
					className="lightBlue"
					data-testid="submit_changePWD_btn"
					onClick={clickSubmit}>
					{i18n.lbl_Submit}
				</button>
			</div>
		</Layout>
	);
};
