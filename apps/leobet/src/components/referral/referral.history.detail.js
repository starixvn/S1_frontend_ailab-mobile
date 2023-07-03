import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { number_format } from "../common/common";

const defIconStatus = {
	0: "approved",
	1: "pending",
	2: "cancelled"
};

export const Detail = ({
	i18n,
	_isConvert,
	userName,
	registerDate,
	currencyId,
	totalDeposit,
	depositC,
	totalBet,
	vaildBetC,
	bonusAmount,
	status,
	timeZone
}) => {
	return (
		<div className="info infoBlack">
			<ul>
				<li>
					<span className="title">{i18n.lbl_Username}</span>
					<span>{userName}</span>
				</li>
				<li>
					<span className="title">
						{i18n.lbl_RegisterDate} ({timeZone})
					</span>
					<span>{moment(registerDate).format("MM/DD/YYYY")}</span>
				</li>
				<li>
					<span className="title">{i18n.lbl_Currency}</span>
					<span>{i18n[`Currency_${currencyId}`]}</span>
				</li>
				<li>
					<span className="title">{i18n.lbl_TotalDeposit}</span>
					<span>
						{number_format(totalDeposit, _isConvert)}/
						{number_format(depositC, _isConvert)}
					</span>
				</li>
				<li>
					<span className="title">{i18n.lbl_TotalBet}</span>
					<span>
						{number_format(totalBet, _isConvert)}/
						{number_format(vaildBetC, _isConvert)}
					</span>
				</li>
				<li>
					<span className="title">{i18n.lbl_BonusAmount}</span>
					<span>{number_format(bonusAmount, _isConvert)}</span>
				</li>
				<li>
					<span className="title">{i18n.lbl_Status}</span>
					<span className={defIconStatus[status]}>
						{i18n[`lbl_ReferralStatus${status}`]}
					</span>
				</li>
			</ul>
		</div>
	);
};

Detail.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	_isConvert: PropTypes.bool.isRequired,
	userName: PropTypes.string.isRequired,
	registerDate: PropTypes.string.isRequired,
	currencyId: PropTypes.number.isRequired,
	totalDeposit: PropTypes.number.isRequired,
	depositC: PropTypes.number.isRequired,
	totalBet: PropTypes.number.isRequired,
	vaildBetC: PropTypes.number.isRequired,
	bonusAmount: PropTypes.number.isRequired,
	status: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
		.isRequired,
	timeZone: PropTypes.string.isRequired
};

export default Detail;
