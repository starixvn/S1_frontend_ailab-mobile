import React from "react";
import { defPromotionType } from "../common/def";
import { number_format, ReloadSpin } from "@ailab-mobile/common";
import PropTypes from "prop-types";

const ProcessBar = ({
	i18n,
	currencyId,
	custTurnOver,
	custRollOver,
	RefreshProcessBar,
	promotionType,
	isJoin,
	isConvert,
	divisionBy1000
}) => {
	if (
		isJoin &&
		promotionType !== defPromotionType.cashback &&
		promotionType !== defPromotionType.rebate
	) {
		let percentage =
			custTurnOver >= custRollOver
				? 100
				: ((custTurnOver / custRollOver) * 100).toFixed(2);
		return (
			<div className="progressBarModule">
				<div className="bounsName">{i18n.lbl_TurnoverAccumulated}</div>
				<div className="turnover">
					<span>
						{i18n[`Currency_${currencyId}`]}{" "}
						{number_format(custTurnOver, isConvert, divisionBy1000)}
					</span>{" "}
					/ ({i18n.lbl_Req} {i18n[`Currency_${currencyId}`]}{" "}
					{number_format(custRollOver, isConvert, divisionBy1000)})
					<ReloadSpin func={RefreshProcessBar} />
				</div>
				<div className="progressBar">
					<div className="bar">
						<div
							className="progress"
							style={{ width: `${percentage}%` }}></div>
					</div>
					<div className="percentage">{percentage}%</div>
				</div>
			</div>
		);
	} else {
		return null;
	}
};

ProcessBar.propTypes = {
	isConvert: PropTypes.bool.isRequired
};

export default ProcessBar;
