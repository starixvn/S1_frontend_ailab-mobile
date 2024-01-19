import React, { useContext } from "react";
import PropTypes from "prop-types";
import ReloadSpin from "../../common/reloadSpin";
import { defPromotionType, defPromoStatus } from "../common/def";
import { number_format } from "../common/common";
import { configContext } from "../common/context";

const ProcessBar = ({
	custTurnOver,
	custRollOver,
	RefreshProcessBar,
	promotionType,
	isJoin,
	status,
	fullFillType
}) => {
	const { i18n, formatSetting } = useContext(configContext);

	if (
		isJoin &&
		status !== defPromoStatus.Fulfill &&
		status !== defPromoStatus.Canceled &&
		promotionType !== defPromotionType.rebate &&
		promotionType !== defPromotionType.cashback
	) {
		let percentage =
			custTurnOver >= custRollOver
				? 100
				: ((custTurnOver / custRollOver) * 100).toFixed(2);

		// When turnover & rollover be 0, percentage will be NaN
		if (isNaN(percentage)) percentage = 0;

		return (
			<div className="account">
				<div className="info">
					<span>
						{fullFillType === 2
							? i18n?.lbl_WinOverAccumulated
							: i18n?.lbl_TurnoverAccumulated}
					</span>
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

ProcessBar.defaultProps = {
	custRollOver: null,
	custTurnOver: null,
	isJoin: null,
	promotionType: null,
	status: null,
	fullFillType: null,
	RefreshProcessBar: () => null
};

ProcessBar.propTypes = {
	custRollOver: PropTypes.number,
	custTurnOver: PropTypes.number,
	isJoin: PropTypes.bool,
	promotionType: PropTypes.number,
	status: PropTypes.number,
	fullFillType: PropTypes.number,
	RefreshProcessBar: PropTypes.func
};

export default ProcessBar;
