import React from "react";
import { defPromotionType } from "../common/def";
import { number_format } from "@ailab-mobile/common";
import PropTypes from "prop-types";

const SingleRecord = ({
	i18n,
	depositId,
	depositAmount,
	canJoin,
	isJoin,
	currencyId,
	promotionType,
	isConvert,
	divisionBy1000
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
					isConvert,
					divisionBy1000
				)}`}</div>
			</div>
		</div>
	) : null;
};

SingleRecord.propTypes = {
	isConvert: PropTypes.bool.isRequired
};

export default SingleRecord;
