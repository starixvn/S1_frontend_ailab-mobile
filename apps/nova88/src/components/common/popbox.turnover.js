import React, { useContext } from "react";
import PropTypes from "prop-types";
import { i18nContext } from "Context";
import { number_format } from "./common";

const PopBoxTurnover = ({ currencyId, turnover, rollover }) => {
	const { i18n } = useContext(i18nContext);
	const currency = i18n[`Currency_${currencyId}`];
	const percentage =
		turnover > rollover ? 100 : ((turnover / rollover) * 100).toFixed(2);

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

PopBoxTurnover.propTypes = {
	currencyId: PropTypes.number.isRequired,
	turnover: PropTypes.number.isRequired,
	rollover: PropTypes.number.isRequired
};

export default PopBoxTurnover;
