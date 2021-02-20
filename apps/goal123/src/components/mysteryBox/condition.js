import React from "react";
import PropTypes from "prop-types";
import TandC from "../../service/t_and_c";

const Condition = ({ i18n, langId }) => {
	return (
		<div className="eventModule active">
			<div className="title">{i18n.lbl_MysteryBox_EventTitle}</div>
			<div className="text-gray">
				<ul>
					<li>{`${i18n.lbl_Start} ${i18n.lbl_From} 27-02-2021 00:00:00 GMT+07:00`}</li>
					<li>{i18n.lbl_MysteryBox_OtherConditions1}</li>
					<li>{i18n.lbl_MysteryBox_OtherConditions2}</li>
					<li>{i18n.lbl_MysteryBox_OtherConditions3}</li>
					<li>{i18n.lbl_MysteryBox_OtherConditions4}</li>
					<li>{i18n.lbl_MysteryBox_OtherConditions5}</li>
				</ul>
			</div>
			<a
				className="more"
				href={TandC(langId).AngPow}
				target="_blank"
				rel="noreferrer">
				{i18n.lbl_MoreDetails}
			</a>
		</div>
	);
};

Condition.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	langId: PropTypes.string.isRequired
};

export default Condition;
