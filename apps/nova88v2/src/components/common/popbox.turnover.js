import React, { useContext } from "react";
import PropTypes from "prop-types";
import { i18nContext } from "Context";
import { number_format } from "./common";

const PopBoxTurnover = ({ currencyId, turnover, rollover }) => {
	const { i18n } = useContext(i18nContext);
	const currency = i18n[`Currency_${currencyId}`];
	let percentage =
		turnover > rollover ? 100 : ((turnover / rollover) * 100).toFixed(2);

	// When turnover & rollover be 0, percentage will be NaN
	if (isNaN(percentage)) percentage = 0;

	return (
		<div className="popTxt">
			<div className="account">
				<div className="info">
					<div>{i18n.lbl_TurnoverAccmulateHint}</div>
					<div className="title">{i18n.lbl_TurnoverAccumulated}</div>
					<div>
						<span className="text-org">
							{`${currency} $${number_format(turnover)} / ${
								i18n.lbl_Req
							}. ${currency} ${number_format(rollover)}`}
						</span>
					</div>
				</div>
				<div className="progressBarModule">
					<div className="percentage">{percentage}%</div>
					<div className="bar">
						<div
							className="progress"
							style={{ width: `${percentage}%` }}
						/>
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
