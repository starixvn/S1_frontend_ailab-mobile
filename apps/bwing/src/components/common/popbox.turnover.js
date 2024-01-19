import React, { useContext } from "react";
import { i18nContext } from "./context";
import { number_format } from "./common";

export default ({ currencyId, turnover, rollover }) => {
	const { i18n } = useContext(i18nContext);
	const currency = i18n[`Currency_${currencyId}`];
	let percentage =
		turnover > rollover ? 100 : ((turnover / rollover) * 100).toFixed(2);

	// When turnover & rollover be 0, percentage will be NaN
	if (isNaN(percentage)) percentage = 0;

	return (
		<div className="popTxt">
			<div className="account">
				<div className="info">{i18n.lbl_TurnoverAccmulateHint}</div>
				<div className="progressBarModule">
					<div className="bounsName">
						{i18n.lbl_TurnoverAccumulated}
					</div>
					<div className="turnover">
						<span>
							{currency} ${number_format(turnover)}
						</span>{" "}
						/ (
						{`${i18n.lbl_Req}. ${currency} ${number_format(
							rollover
						)}`}
						)
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
			</div>
		</div>
	);
};
