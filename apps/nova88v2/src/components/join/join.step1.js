import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "../../route/link";
import useTip from "../hook/useTip";
import api from "../../service/api";
import Inputbox from "../common/inputbox.hint";
import InputboxPWD from "../common/inputbox.password";
import { passwordCheck, getCombineLangId } from "../common/common";
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
	setStep,
	checkAffiliate,
	urlAffiliate
}) => {
	const [showingPwd, setShowingPwd] = useState({
		Password: false,
		ConfirmPwd: false
	});

	const { showTips, showTipHandler } = useTip([]);
	const { userInfo } = useContext(userInfoContext);

	const showPswHandler = ({ col }) => {
		const pwdStatus = !showingPwd[col];
		setShowingPwd(prev => ({
			...prev,
			[col]: pwdStatus
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
		} else if (col === "ConfirmPwd") {
			const result = checkConfirmPwd({ val });
			checked = result.checked;
			msg = result.msg;
		} else if (col === "RealName") {
			const result = checkRealName({ val });
			checked = result.checked;
			msg = result.msg;
		} else if (col === "Affiliate") {
			const result = await checkAffiliate({ formAffCode: val });
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

	const checkConfirmPwd = ({ val }) => {
		let checked = false;
		let msg = "";

		if (val === "") {
			checked = false;
			msg = "msg_ConfirmPwdReq";
		} else if (val !== userValue.Password) {
			checked = false;
			msg = "msg_ConfirmPwdNotMatch";
		} else {
			checked = true;
			msg = "";
		}

		return { checked, msg };
	};

	const checkRealName = ({ val }) => {
		const checked = val !== "";
		const msg = val === "" ? i18n.msg_RealNameReq : "";
		return { checked, msg };
	};

	const checkAll = async () => {
		try {
			const _usernameCheck = await usernameCheck(userValue.UserName);
			const _passwordCheck = passwordCheck({
				val: userValue.Password
			});
			const _confirmPwdCheck = passwordCheck({
				val: userValue.ConfirmPwd
			});
			const _realNameCheck = checkRealName({
				val: userValue.RealName
			});
			const _affiliateCheck = await checkAffiliate({
				formAffCode: userValue.Affiliate
			});

			const checked =
				_usernameCheck.checked &&
				_passwordCheck.checked &&
				_confirmPwdCheck.checked &&
				_realNameCheck.checked &&
				// affiliate is optional
				(_affiliateCheck.checked === true ||
					_affiliateCheck.checked === null);

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
					},
					ConfirmPwd: {
						checked: _confirmPwdCheck.checked,
						msg: i18n[_confirmPwdCheck.msg]
					},
					RealName: {
						checked: _realNameCheck.checked,
						msg: _realNameCheck.msg
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
					inputType={showingPwd.Password ? "text" : "password"}
					showPsw={showingPwd.Password}
					placeholder={i18n.lbl_Password}
					value={userValue.Password}
					onChange={EditField.bind(null, "Password")}
					onBlur={checkValue.bind(null, "Password")}
					showPswHandler={showPswHandler.bind(this, {
						col: "Password"
					})}
					checked={hintStatus.Password.checked}
					warningMsg={hintStatus.Password.msg}
					testAttr="Password"
				/>
				<InputboxPWD
					infoModule="infoModule"
					icon="icon-key"
					inputType={showingPwd.ConfirmPwd ? "text" : "password"}
					showPsw={showingPwd.ConfirmPwd}
					placeholder={i18n.lbl_ConfirmPassword}
					value={userValue.ConfirmPwd}
					onChange={EditField.bind(null, "ConfirmPwd")}
					onBlur={checkValue.bind(null, "ConfirmPwd")}
					showPswHandler={showPswHandler.bind(this, {
						col: "ConfirmPwd"
					})}
					checked={hintStatus.ConfirmPwd.checked}
					warningMsg={hintStatus.ConfirmPwd.msg}
					testAttr="ConfirmPwd"
				/>
				<Inputbox
					icon="icon-member"
					placeholder={i18n.lbl_RealName}
					value={userValue.RealName}
					onChange={EditField.bind(null, "RealName")}
					onBlur={checkValue.bind(null, "RealName")}
					btnStatus={hintStatus.RealName.checked}
					warningMsg={hintStatus.RealName.msg}
					infoText={i18n.lbl_RemindForName}
					clickInfo={() => showTipHandler("RealName")}
					showTips={showTips.includes("RealName")}
					testAttr="RealName"
				/>
				<Inputbox
					icon="icon-affiliate"
					placeholder={i18n.lbl_Affiliate_ID}
					value={userValue.Affiliate}
					onChange={EditField.bind(null, "Affiliate")}
					onBlur={checkValue.bind(null, "Affiliate")}
					disabled={urlAffiliate && userValue.Affiliate}
					btnStatus={hintStatus.Affiliate.checked}
					warningMsg={hintStatus.Affiliate.msg}
					infoText={i18n.lbl_Please_enter_Affiliate_ID}
					clickInfo={() => showTipHandler("Affiliate")}
					showTips={showTips.includes("Affiliate")}
					testAttr="Affiliate"
				/>
				<div className="Terms">
					{i18n.lbl_Check18TC1}
					<a
						rel="noreferrer"
						target="_blank"
						href={`${cloudBannerImgURL}/Static/${getCombineLangId(
							langId,
							userInfo.currencyId
						)}/TermsConditions.html`}>
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

JoinStep1.defaultProps = {
	checkAffiliate: () => null,
	urlAffiliate: null
};

JoinStep1.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	userValue: PropTypes.objectOf(PropTypes.any).isRequired,
	hintStatus: PropTypes.objectOf(PropTypes.object).isRequired,
	setHintStatus: PropTypes.func.isRequired,
	EditField: PropTypes.func.isRequired,
	langId: PropTypes.string.isRequired,
	setStep: PropTypes.func.isRequired,
	checkAffiliate: PropTypes.func,
	urlAffiliate: PropTypes.bool
};

export default JoinStep1;
