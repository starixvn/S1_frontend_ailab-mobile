import React from "react";
import PropTypes from "prop-types";

const Condition = ({ i18n }) => {
	return (
		<div className="eventModule active">
			<div className="title">
				Ivorysport {i18n.lbl_MysteryBox_EventTitle}
			</div>
			<div className="text-gray">{`${i18n.lbl_Start}： 27-02-2021 00:00:00 GMT+08:00`}</div>
			<div>{i18n.lbl_MysteryBox_MemberEligibility}</div>
			<div className="title text-org">
				{i18n.lbl_MysteryBox_OtherConditions}
			</div>
			<div className="text-gray">
				<ul>
					<li>{i18n.lbl_MysteryBox_OtherConditions1}</li>
					<li>{i18n.lbl_MysteryBox_OtherConditions2}</li>
					<li>{i18n.lbl_MysteryBox_OtherConditions3}</li>
					<li>{i18n.lbl_MysteryBox_OtherConditions4}</li>
					<li>{i18n.lbl_MysteryBox_OtherConditions5}</li>
				</ul>
			</div>
		</div>
	);
};

Condition.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired
};

export default Condition;
