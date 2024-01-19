import React from "react";
import PropTypes from "prop-types";
import { number_format } from "../common/common";

const BonusWallet = ({
	i18n,
	currencyId,
	promoCategoryId,
	bonus,
	turnover,
	rollover
}) => {
	let percentage =
		turnover > rollover ? 100 : ((turnover / rollover) * 100).toFixed(2);

	// When turnover & rollover be 0, percentage will be NaN
	if (isNaN(percentage)) percentage = 0;

	return (
		<div className="progressBarModule">
			<div className="bounsName">
				{i18n[`lbl_BonusWallet_${promoCategoryId}`]}
			</div>
			<div>
				<span className="text-org">
					{i18n[`Currency_${currencyId}`]}{" "}
				</span>{" "}
				{number_format(bonus)}
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
};

BonusWallet.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	currencyId: PropTypes.number.isRequired,
	promoCategoryId: PropTypes.number.isRequired,
	bonus: PropTypes.number.isRequired,
	turnover: PropTypes.number.isRequired,
	rollover: PropTypes.number.isRequired
};

export default BonusWallet;
