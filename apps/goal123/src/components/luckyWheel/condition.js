import React from "react";
import PropTypes from "prop-types";
import { eventTime } from "../common/eventTime";

const Condition = ({ i18n }) => {
	return (
		<>
			<div className="rewards title">
				{i18n.lbl_RewardsCondition?.toUpperCase()}
				<div className="title">GOAL123 {i18n.lbl_LuckyWheel}</div>
				<div>{`${i18n.lbl_Start}： ${eventTime.luckyWheel.startDate} GMT+07:00`}</div>
				<div>{i18n.lbl_LuckyWheel_MemberEligibility}</div>
				<div>
					{i18n.lbl_LuckyWheel_MinDeposit.replace(
						"{{amount}}",
						"50,000"
					)}
				</div>
			</div>

			<div className="other title">
				{i18n.lbl_OtherConditions?.toUpperCase()}
				<ul>
					<li>{i18n.lbl_MysteryBox_OtherConditions1}</li>
					<li>{i18n.lbl_MysteryBox_OtherConditions2}</li>
					<li>{i18n.lbl_MysteryBox_OtherConditions3}</li>
					<li>{i18n.lbl_MysteryBox_OtherConditions4}</li>
					<li>{i18n.lbl_MysteryBox_OtherConditions5}</li>
				</ul>
			</div>
		</>
	);
};

Condition.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired
};

export default Condition;
