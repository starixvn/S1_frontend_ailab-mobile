import React from "react";
import PropTypes from "prop-types";

const EuroAgenda = ({ i18n }) => {
	return (
		<ul>
			<div className="title xs">{i18n.lbl_AgendaTitle}</div>
			<div className="timeLine">
				<div>{i18n.lbl_Month3}</div>
				<div>{i18n.lbl_Month4}</div>
				<div>
					{i18n.lbl_Month5}
					<div>
						{i18n.lbl_Stage} 2<div>2021 4/13 - 5/12</div>
					</div>
				</div>
				<div>
					{i18n.lbl_Month6}
					<div>
						{i18n.lbl_Stage} 3<div>2021 5/13 - 6/12</div>
					</div>
				</div>
			</div>
			<li>{i18n.lbl_Ranking}</li>
			<li>{i18n.lbl_RewardAmount}</li>
		</ul>
	);
};

EuroAgenda.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired
};

export default EuroAgenda;
