import React, { useContext } from "react";
import { ReloadSpin } from "@ailab-mobile/common";
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
	const {
		i18n,
		userInfo: { currencyId },
		formatSetting
	} = useContext(configContext);

	if (
		isJoin &&
		promotionType !== defPromotionType.cashback &&
		promotionType !== defPromotionType.rebate
	) {
		const percentage =
			status === defPromoStatus.Fulfill || custTurnOver >= custRollOver
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
