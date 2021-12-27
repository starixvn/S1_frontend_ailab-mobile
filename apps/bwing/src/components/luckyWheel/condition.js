import React from "react";
import PropTypes from "prop-types";
import { eventTime } from "../common/eventTime";

const Condition = ({ i18n }) => {
	return (
		<div className="eventModule active">
			<div className="title">
				BWING {i18n.lbl_LuckyWheel?.toUpperCase()}
			</div>
			<div>{`${i18n.lbl_Start}： ${eventTime.luckyWheel.startDate} GMT+07:00`}</div>
			<div>{i18n.lbl_MysteryBox_MemberEligibility}</div>
			<div>
				{i18n.lbl_LuckyWheel_MinDeposit.replace("{{amount}}", "50,000")}
			</div>
			<div className="title">{i18n.lbl_AngPow_OtherConditions}</div>
			<ul>
				<li>{i18n.lbl_MysteryBox_OtherConditions1}</li>
				<li>{i18n.lbl_MysteryBox_OtherConditions2}</li>
				<li>{i18n.lbl_MysteryBox_OtherConditions3}</li>
				<li>{i18n.lbl_MysteryBox_OtherConditions4}</li>
				<li>{i18n.lbl_MysteryBox_OtherConditions5}</li>
			</ul>
		</div>
	);
};

Condition.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired
};

export default Condition;
