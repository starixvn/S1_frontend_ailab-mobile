import React from "react";
import PropTypes from "prop-types";
import TandC from "../../service/t_and_c";

const Condition = ({ i18n, langId }) => {
	return (
		<div className="eventModule active">
			<div className="title">{i18n.lbl_AngPow_Conditions}</div>
			<div className="text-gray">
				<ul>
					<li>{`${i18n.lbl_Start} ${i18n.lbl_From} 11-02-2021 00:00:00 GMT+07:00 ${i18n.lbl_To} 26-02-2021 23:59:59 GMT+07:00`}</li>
					<li>{i18n.lbl_AngPow_OtherConditions1}</li>
					<li>{i18n.lbl_AngPow_OtherConditions2}</li>
				</ul>
				<a
					className="more"
					href={TandC(langId).AngPow}
					target="_blank"
					rel="noreferrer">
					{i18n.lbl_MoreDetails}
				</a>
			</div>
		</div>
	);
};

Condition.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	langId: PropTypes.string.isRequired
};

export default Condition;
