import React, { useState } from "react";
import PropTypes from "prop-types";
import profileIcon from "../../styles/img/profile.svg";
import emailIcon from "../../styles/img/email.svg";
import phoneIcon from "../../styles/img/phone.svg";
import { number_format, isConvert } from "../common/common";

const safety = {
	displayKey: "",
	bar: ""
};

const infoCol = {
	profile: "accountName",
	phone: "phone",
	email: "email"
};

const VerificationPanel = ({
	i18n,
	accountName,
	phoneVerified,
	emailVerified,
	phoneReward,
	emailReward,
	currencyId
}) => {
	const [infoOpenCol, setInfoOpen] = useState(null);
	const _isConvert = isConvert(currencyId);

	const accountSafety = [
		Boolean(accountName),
		phoneVerified,
		emailVerified
	].filter(Boolean).length;

	switch (accountSafety) {
		case 1:
			safety.displayKey = "lbl_Weak";
			safety.bar = "weak";
			break;

		case 2:
			safety.displayKey = "lbl_Normal";
			safety.bar = "normal";
			break;

		case 3:
			safety.displayKey = "lbl_Excellent";
			safety.bar = "strong";
			break;

		default:
			safety.displayKey = "lbl_Weak";
			safety.bar = "";
			break;
	}

	const clickInfo = col => {
		setInfoOpen(prev => (prev === col ? null : col));
	};

	return (
		<div className="profileInfo">
			<div className="securityRate">
				<div className={`title ${safety.bar}`}>
					{i18n.lbl_AccountSafety} ：
					<span>{i18n[safety.displayKey]}</span>
				</div>
				<div className="rateBar">
					<div />
					<div />
					<div />
				</div>
			</div>

			<div className="verification">
				<div className="title">{i18n.lbl_UserVerification} ：</div>
				<div className="items">
					<div
						className={`profile
                            ${accountName ? " active" : ""}
                            ${infoOpenCol === infoCol.profile ? " open" : ""}`}
						onClick={clickInfo.bind(this, infoCol.profile)}>
						<img src={profileIcon} alt="Profile Verification" />
						{accountName ? (
							<i className="icon icon-checkmark" />
						) : null}
						<div className="itemInfo">
							<div className="title">
								{i18n.lbl_ProfileVerification}
							</div>
							{i18n.lbl_ProfileVerificationHint}
						</div>
					</div>
					<div
						className={`email
                            ${emailVerified ? " active" : ""}
                            ${infoOpenCol === infoCol.email ? " open" : ""}`}
						onClick={clickInfo.bind(this, infoCol.email)}>
						<img src={emailIcon} alt="Email Verification" />
						{emailVerified ? (
							<i className="icon icon-checkmark" />
						) : (
							<i className="icon icon-money" />
						)}

						<div className="itemInfo">
							<div className="title">
								{i18n.lbl_EmailVerification}
							</div>
							{i18n.lbl_EmailVerificationHint.replace(
								"{amount}",
								number_format(emailReward, _isConvert)
							)}
						</div>
					</div>
					<div
						className={`phone
                            ${phoneVerified ? " active" : ""}
                            ${infoOpenCol === infoCol.phone ? " open" : ""}`}
						onClick={clickInfo.bind(this, infoCol.phone)}>
						<img src={phoneIcon} alt="Phone Number Verfication" />
						{phoneVerified ? (
							<i className="icon icon-checkmark" />
						) : (
							<i className="icon icon-money" />
						)}
						<div className="itemInfo">
							<div className="title">
								{i18n.lbl_PhoneVerification}
							</div>
							{i18n.lbl_PhoneVerificationHint.replace(
								"{amount}",
								number_format(phoneReward, _isConvert)
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

VerificationPanel.defaultProps = {
	accountName: "",
	phoneVerified: false,
	emailVerified: false,
	phoneReward: 0,
	emailReward: 0,
	currencyId: null
};

VerificationPanel.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	accountName: PropTypes.string,
	phoneVerified: PropTypes.bool,
	emailVerified: PropTypes.bool,
	phoneReward: PropTypes.number,
	emailReward: PropTypes.number,
	currencyId: PropTypes.number
};

export default VerificationPanel;
