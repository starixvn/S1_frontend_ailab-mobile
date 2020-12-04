import React from "react";
import { defPromotionType } from "../common/def";
import { number_format } from "../common/common";

const SingleRecord = ({
	i18n,
	depositId,
	depositAmount,
	canJoin,
	isJoin,
	currencyId,
	promotionType,
	formatSetting
}) => {
	return canJoin &&
		!isJoin &&
		(promotionType === defPromotionType.reDeposit ||
			promotionType === defPromotionType.firstDeposit) ? (
		<div className="minAmount">
			<div>
				<div>{i18n.lbl_ID}</div>
				<div>{depositId}</div>
			</div>
			<div>
				<div>{i18n.lbl_DepositAmount}</div>
				<div>{`${i18n[`Currency_${currencyId}`]} ${number_format(
					depositAmount,
					formatSetting
				)}`}</div>
			</div>
		</div>
	) : null;
};

export default SingleRecord;
