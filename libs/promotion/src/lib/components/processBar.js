import React, { useContext } from "react";
import { defPromotionType, defPromoStatus } from "../common/def";
import { number_format } from "../common/common";
import { ReloadSpin } from "@ailab-mobile/common";
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
		let percentage =
			status === defPromoStatus.Fulfill || custTurnOver >= custRollOver
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
