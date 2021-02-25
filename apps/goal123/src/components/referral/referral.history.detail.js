import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { number_format } from "../common/common";

export const Detail = ({
	i18n,
	userName,
	registerDate,
	currencyId,
	totalDeposit,
	depositC,
	totalBet,
	vaildBetC,
	bonusAmount,
	status
}) => {
	return (
		<div className="info infoBlack">
			<ul>
				<li>
					<span className="title">{i18n.lbl_Username}</span>
					<span>{userName}</span>
				</li>
				<li>
					<span className="title">{i18n.lbl_RegisterDate}</span>
					<span>{moment(registerDate).format("MM/DD/YYYY (Z)")}</span>
				</li>
				<li>
					<span className="title">{i18n.lbl_Currency}</span>
					<span>{i18n[`Currency_${currencyId}`]}</span>
				</li>
				<li>
					<span className="title">{i18n.lbl_TotalDeposit}</span>
					<span>
						{number_format(totalDeposit, true)}/
						{number_format(depositC, true)}
					</span>
				</li>
				<li>
					<span className="title">{i18n.lbl_TotalBet}</span>
					<span>
						{number_format(totalBet, true)}/
						{number_format(vaildBetC, true)}
					</span>
				</li>
				<li>
					<span className="title">{i18n.lbl_BonusAmount}</span>
					<span>{number_format(bonusAmount, true)}</span>
				</li>
				<li>
					<span className="title">{i18n.lbl_Status}</span>
					<span>{i18n[`lbl_ReferralStatus${status}`]}</span>
				</li>
			</ul>
		</div>
	);
};

Detail.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	userName: PropTypes.string.isRequired,
	registerDate: PropTypes.string.isRequired,
	currencyId: PropTypes.number.isRequired,
	totalDeposit: PropTypes.number.isRequired,
	depositC: PropTypes.number.isRequired,
	totalBet: PropTypes.number.isRequired,
	vaildBetC: PropTypes.number.isRequired,
	bonusAmount: PropTypes.number.isRequired,
	status: PropTypes.number.isRequired
};

export default Detail;
