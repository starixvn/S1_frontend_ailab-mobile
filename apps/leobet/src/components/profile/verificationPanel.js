import React, { useState } from "react";
import PropTypes from "prop-types";
import { currCustomMapping, number_format, isConvert } from "../common/common";

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
	currencyId,
	phoneReward,
	emailReward
}) => {
	const [infoOpenCol, setInfoOpen] = useState(null);
	const currencyName = currCustomMapping[currencyId];
	const _isConvert = isConvert(currencyId);

	const accountSafety = [
		Boolean(accountName),
		phoneVerified,
		emailVerified
	].filter(Boolean).length;

	let safetyKey = "";
	if (accountSafety < 2) {
		safetyKey = "lbl_Weak";
	} else if (accountSafety === 2) {
		safetyKey = "lbl_Normal";
	} else if (accountSafety > 2) {
		safetyKey = "lbl_Excellent";
	}

	const clickInfo = col => {
		setInfoOpen(prev => (prev === col ? null : col));
	};

	return (
		<>
			<div className="accountSafety">
				<div>{i18n.lbl_AccountSafety} ：</div>
				<div>{i18n[safetyKey]}</div>
			</div>
			<div className="safetyLv">
				<span className={accountSafety >= 1 ? "active" : ""} />
				<span className={accountSafety >= 2 ? "active" : ""} />
				<span className={accountSafety >= 3 ? "active" : ""} />
			</div>
			<div className="userVerification">
				<div>{i18n.lbl_UserVerification} ：</div>
				<div>
					<div
						className={`icon icon-person
                            ${accountName ? " active" : ""}
                            ${
								infoOpenCol === infoCol.profile
									? " openTip"
									: ""
							}`}
						onClick={clickInfo.bind(this, infoCol.profile)}>
						<div className="description">
							<div className="title">
								{i18n.lbl_ProfileVerification}
							</div>
							<div>{i18n.lbl_ProfileVerificationHint1}</div>
							<div>{i18n.lbl_ProfileVerificationHint2}</div>
						</div>
					</div>
					<div
						className={`icon icon-email
                            ${emailVerified ? " active" : ""}
                            ${infoOpenCol === infoCol.email ? " openTip" : ""}`}
						onClick={clickInfo.bind(this, infoCol.email)}>
						<div className="description">
							<div className="title">
								{i18n.lbl_EmailVerification}
							</div>
							<div>{i18n.lbl_EmailVerificationHint1}</div>
							<div>
								{i18n.lbl_EmailVerificationHint2
									.replace("{currency}", currencyName)
									.replace(
										"{amount}",
										number_format(emailReward, _isConvert)
									)}
							</div>
						</div>
					</div>
					<div
						className={`icon icon-mobile
                            ${phoneVerified ? " active" : ""}
                            ${infoOpenCol === infoCol.phone ? " openTip" : ""}`}
						onClick={clickInfo.bind(this, infoCol.phone)}>
						<div className="description">
							<div className="title">
								{i18n.lbl_PhoneVerification}
							</div>
							<div>{i18n.lbl_PhoneVerificationHint1}</div>
							<div>
								{i18n.lbl_PhoneVerificationHint2
									.replace("{currency}", currencyName)
									.replace(
										"{amount}",
										number_format(phoneReward, _isConvert)
									)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
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
	currencyId: PropTypes.number,
	phoneReward: PropTypes.number,
	emailReward: PropTypes.number
};

export default VerificationPanel;
