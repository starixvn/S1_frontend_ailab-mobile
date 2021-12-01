import React from "react";
import { defPromotionType } from "../common/def";
import { number_format } from "../common/common";

const SingleRecord = ({
	i18n = {},
	depositId,
	depositAmount,
	canJoin,
	isJoin,
	currencyId,
	promotionType,
	formatSetting
}) => {
	const _depositAmount = `${i18n?.[`Currency_${currencyId}`]} ${number_format(
		depositAmount,
		formatSetting
	)}`;

	return canJoin &&
		!isJoin &&
		(promotionType === defPromotionType.reDeposit ||
			promotionType === defPromotionType.firstDeposit) ? (
		<div className="info promotionInfo minAmount">
			<ul>
				<li>
					<span className="title">{i18n?.lbl_ID}</span>
					<span>{depositId}</span>
				</li>
				<li>
					<span className="title">{i18n?.lbl_DepositAmount}</span>
					<span>{_depositAmount}</span>
				</li>
			</ul>
		</div>
	) : null;
};

export default SingleRecord;
