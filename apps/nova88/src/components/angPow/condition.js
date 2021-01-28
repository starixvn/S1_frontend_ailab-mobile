import React from "react";
import PropTypes from "prop-types";

const Condition = ({ i18n }) => {
	return (
		<div className="eventModule active">
			<div className="title">{i18n.lbl_AngPow_EventTitle}</div>
			<div className="text-gray">
				{i18n.lbl_Start}: 11-02-2021 00:00:00 GMT+8
			</div>
			<div className="text-gray">
				{i18n.lbl_End}: 26-02-2021 23:59:59 GMT+8
			</div>
			<div>{i18n.lbl_AngPow_MemberEligibility}</div>
			<div className="title">{i18n.lbl_AngPow_OtherConditions}</div>
			<div className="text-gray">
				<ul>
					<li>{i18n.lbl_AngPow_OtherConditions1}</li>
					<li>{i18n.lbl_AngPow_OtherConditions2}</li>
				</ul>
			</div>
		</div>
	);
};

Condition.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired
};

export default Condition;
