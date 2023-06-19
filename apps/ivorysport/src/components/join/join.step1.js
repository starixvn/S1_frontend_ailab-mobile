import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "../../route/link";
import useTip from "../hook/useTip";
import api from "../../service/api";
import Inputbox from "../common/inputbox.hint";
import InputboxPWD from "../common/inputbox.password";
import { passwordCheck } from "../common/common";
import FeaturePanel from "./features";
import { userInfoContext } from "../common/context";
import { cloudBannerImgURL } from "../../config";

const JoinStep1 = ({
	i18n,
	userValue,
	hintStatus,
	setHintStatus,
	EditField,
	langId,
	setStep
}) => {
	const [showingPsw, setShowingPsw] = useState({
		Password: false
	});

	const { showTips, showTipHandler } = useTip([]);
	const { userInfo } = useContext(userInfoContext);

	const showPswHandler = ({ col }) => {
		const pswStatus = !showingPsw[col];
		setShowingPsw(prev => ({
			...prev,
			[col]: pswStatus
		}));
	};

	const checkValue = async (col, e) => {
		const val = e?.target?.value;
		let checked = null;
		let msg = "";
		if (col === "UserName") {
			const result = await usernameCheck(val);
			checked = result.checked;
			msg = result.msg;
		} else if (col === "Password") {
			const result = passwordCheck({ val });
			checked = result.checked;
			msg = result.msg;
		}

		setHintStatus(prev => ({
			...prev,
			[col]: {
				checked,
				msg: i18n[msg] ?? msg
			}
		}));
	};

	const usernameCheck = async val => {
		let checked = true;
		let msg = "";
		const reg = /^(?=.{6,18}$)(?=.*[a-zA-Z0-9]$)/;
		if (!val) {
			checked = false;
			msg = "msg_UsernameReq";
		} else if (val.length < 6 || val.length > 18 || !reg.test(val)) {
			checked = false;
			msg = "lbl_UsernameInvalid";
		} else {
			const res = await api.site.ExistsUserName({
				UserName: val,
				LangId: userInfo.langId
			});
			if (res.data.errorCode === 0 && res.data.data === true) {
				checked = false;
				msg = res.data.message;
			} else if (res.data.errorCode !== 0) {
				setPopBox({
					isOpen: true,
					content: `[${res.data.errorCode}] ${res.data.message}`
				});
			}
		}
		return { checked, msg };
	};

	const checkAll = async () => {
		try {
			const _usernameCheck = await usernameCheck(userValue.UserName);
			const _passwordCheck = passwordCheck({
				val: userValue.Password
			});

			const checked = _usernameCheck.checked && _passwordCheck.checked;

			if (!checked) {
				setHintStatus(prev => ({
					...prev,
					UserName: {
						checked: _usernameCheck.checked,
						msg: i18n[_usernameCheck.msg]
					},
					Password: {
						checked: _passwordCheck.checked,
						msg: i18n[_passwordCheck.msg]
					}
				}));
			}
			return checked;
		} catch (error) {
			return false;
		}
	};

	const clickSubmit = async () => {
		const checked = await checkAll();
		if (checked) {
			setStep(2);
		}
	};
	return (
		<>
			<div className="Join">
				<Inputbox
					icon="icon-member"
					placeholder={i18n.lbl_Username}
					value={userValue.UserName}
					onChange={EditField.bind(null, "UserName")}
					onBlur={checkValue.bind(null, "UserName")}
					btnStatus={hintStatus.UserName.checked}
					warningMsg={hintStatus.UserName.msg}
					infoText={i18n.lbl_UsernameTooltip}
					clickInfo={() => showTipHandler("UserName")}
					showTips={showTips.includes("UserName")}
					testAttr="UserName"
				/>
				<InputboxPWD
					infoModule="infoModule"
					icon="icon-key"
					inputType={showingPsw.Password ? "text" : "password"}
					showPsw={showingPsw.Password}
					placeholder={i18n.lbl_Password}
					value={userValue.Password}
					onChange={EditField.bind(null, "Password")}
					onBlur={checkValue.bind(null, "Password")}
					showPswHandler={showPswHandler.bind(this, {
						col: "Password"
					})}
					checked={hintStatus.Password.checked}
					tips={i18n.msg_PasswordVaildate}
					warningMsg={hintStatus.Password.msg}
					clickInfo={() => showTipHandler("Password")}
					showTips={showTips.includes("Password")}
					testAttr="Password"
				/>

				<div className="Terms">
					{i18n.lbl_Check18TC1}
					<a
						rel="noreferrer"
						target="_blank"
						href={`${cloudBannerImgURL}/Static/en/TermsConditions.html`}>
						{i18n.lbl_TermsConditions}
					</a>
					{i18n.lbl_Check18TC2}
				</div>
				<div className="btn-group">
					<button data-testid="next" onClick={clickSubmit}>
						{i18n.lbl_JoinNow}
					</button>
				</div>
				<Link to="/">
					<div className="visit">
						{i18n.lbl_IWouldLikeToVisit}
						<i className="icon icon-visit" />
					</div>
				</Link>
			</div>
			<FeaturePanel i18n={i18n} currencyId={userInfo.currencyId} />
		</>
	);
};

JoinStep1.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	userValue: PropTypes.objectOf(PropTypes.any).isRequired,
	hintStatus: PropTypes.objectOf(PropTypes.object).isRequired,
	setHintStatus: PropTypes.func.isRequired,
	EditField: PropTypes.func.isRequired,
	langId: PropTypes.string.isRequired,
	setStep: PropTypes.func.isRequired
};

export default JoinStep1;
