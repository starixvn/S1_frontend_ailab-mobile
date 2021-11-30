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
	status,
	config = {}
}) => {
	const {
		i18n,
		userInfo: { currencyId },
		formatSetting
	} = useContext(configContext) ?? config;

	if (
		isJoin &&
		status !== defPromoStatus.Fulfill &&
		status !== defPromoStatus.Canceled &&
		promotionType !== defPromotionType.cashback &&
		promotionType !== defPromotionType.rebate
	) {
		const percentage =
			custTurnOver >= custRollOver
				? 100
				: ((custTurnOver / custRollOver) * 100).toFixed(2);
		return (
			<div className="progressBarModule">
				<div className="bounsName">{i18n?.lbl_TurnoverAccumulated}</div>
				<div className="turnover">
					<span>
						{i18n?.[`Currency_${currencyId}`]}{" "}
						{number_format(custTurnOver, formatSetting)}
					</span>{" "}
					/ ({i18n?.lbl_Req} {i18n?.[`Currency_${currencyId}`]}{" "}
					{number_format(custRollOver, formatSetting)})
					<ReloadSpin func={RefreshProcessBar} />
				</div>
				<div className="progressBar">
					<div className="bar">
						<div
							className="progress"
							style={{ width: `${percentage}%` }}
						/>
					</div>
					<div className="percentage">{percentage}%</div>
				</div>
			</div>
		);
	}
	return null;
};
