import React from "react";
import moment from "moment";
import { number_format } from "../common/common";

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
					<span>{i18n[`lbl_ReferralStatus${status}`]}</span>
				</li>
			</ul>
		</div>
	);
};

export default Detail;
