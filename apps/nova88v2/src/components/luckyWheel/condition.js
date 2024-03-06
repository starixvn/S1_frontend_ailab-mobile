import React from "react";
import PropTypes from "prop-types";
import { eventTime } from "../common/eventTime";

const Condition = ({ i18n }) => {
	return (
		<>
			<div className="rewards title">
				<span>{i18n.lbl_MysteryBox_Conditions?.toUpperCase()}</span>
				<div className="title">NOVA88 {i18n.lbl_LuckyBox}</div>
				<div>{`${i18n.lbl_Start}： ${eventTime.luckyWheel.startDate} GMT+08:00`}</div>
				<div style={{ minWidth: "75%" }}>
					{i18n.lbl_MysteryBox_MemberEligibility}
				</div>
			</div>

			<div className="other title">
				<span>
					{i18n.lbl_Other?.toUpperCase()}
					{i18n.lbl_Conditions?.toUpperCase()}
				</span>
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
