import React, { useContext } from "react";
import ReloadSpin from "../../common/reloadSpin";
import { defPromotionType, defPromoStatus } from "../common/def";
import { number_format } from "../common/common";
import { configContext } from "../common/context";

export default ({
	custTurnOver,
	custRollOver,
	RefreshProcessBar,
	promotionType,
	isJoin,
	status
}) => {
	const { i18n, formatSetting } = useContext(configContext);

	if (
		isJoin &&
		promotionType !== defPromotionType.rebate &&
		promotionType !== defPromotionType.cashback &&
		status !== defPromoStatus.Fulfill &&
		status !== defPromoStatus.Canceled
	) {
		const percentage =
			custTurnOver >= custRollOver
				? 100
				: ((custTurnOver / custRollOver) * 100).toFixed(2);
		return (
			<div className="account">
				<div className="info">
					<span>{i18n?.lbl_TurnoverAccumulated}</span>
					<span>
						{number_format(custTurnOver, formatSetting)}/
						{number_format(custRollOver, formatSetting)}
					</span>
				</div>
				<div className="progressBarModule">
					<div className="percentage">{percentage}%</div>
					<div className="bar">
						<div
							className="progress"
							style={{ width: `${percentage}%` }}
						/>
					</div>
					<ReloadSpin func={RefreshProcessBar} />
				</div>
			</div>
		);
	}
	return null;
};
