import React, { useState } from "react";
import PropTypes from "prop-types";
import { number_format, isConvert } from "../common/common";
import { bannerImgUrl } from "../../config";

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

	let safetyKey = "";
	if (accountSafety < 2) {
		safetyKey = "lbl_Weak";
	} else if (accountSafety === 2) {
		safetyKey = "lbl_Normal";
	} else if (accountSafety > 2) {
		safetyKey = "lbl_Excellent";
	}

	const info = {
		[infoCol.profile]: {
			title: i18n.lbl_ProfileVerification,
			content: i18n.lbl_ProfileVerificationHint
		},
		[infoCol.phone]: {
			title: i18n.lbl_PhoneVerification,
			content: i18n.lbl_PhoneVerificationHint.replace(
				"{amount}",
				number_format(phoneReward, _isConvert)
			)
		},
		[infoCol.email]: {
			title: i18n.lbl_EmailVerification,
			content: i18n.lbl_EmailVerificationHint.replace(
				"{amount}",
				number_format(emailReward, _isConvert)
			)
		}
	};

	const clickInfo = col => {
		setInfoOpen(prev => (prev === col ? null : col));
	};

	return (
		<div className="profileGrade">
			<div className="grade">
				<div className="txt-lightgray">
					{i18n.lbl_ProfileModifyWarning}
				</div>
				<div className="user">
					<div className="txt-blue15">
						{i18n.lbl_AccountSafety} ：
						<span>{i18n[safetyKey]}</span>
					</div>
					<div className="level">
						<div
							className={`weak ${
								accountSafety >= 1 ? " active" : ""
							}`}
						/>
						<div
							className={`nomal ${
								accountSafety >= 2 ? " active" : ""
							}`}
						/>
						<div
							className={`good ${
								accountSafety >= 3 ? " active" : ""
							}`}
						/>
					</div>
				</div>
				<div className="user">
					<div className="txt-blue15">
						{i18n.lbl_UserVerification}
					</div>
					<div className="item">
						<button
							className={`icon icon-member${
								accountName ? " active" : ""
							}`}
							onClick={clickInfo.bind(this, infoCol.profile)}>
							<img
								src={`${bannerImgUrl}/h5/img/coinimg.png`}
								alt="coin"
							/>
						</button>
						<button
							className={`icon icon-email${
								emailVerified ? " active" : ""
							}`}
							onClick={clickInfo.bind(this, infoCol.email)}>
							<img
								src={`${bannerImgUrl}/h5/img/coinimg.png`}
								alt="coin"
							/>
						</button>
						<button
							className={`icon icon-mobile${
								phoneVerified ? " active" : ""
							}`}
							onClick={clickInfo.bind(this, infoCol.phone)}>
							<img
								src={`${bannerImgUrl}/h5/img/coinimg.png`}
								alt="coin"
							/>
						</button>
					</div>
					<div className={`hint${infoOpenCol ? " active" : ""}`}>
						<span>
							{infoOpenCol ? info[infoOpenCol].title : ""}
						</span>
						{infoOpenCol ? info[infoOpenCol].content : ""}
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
