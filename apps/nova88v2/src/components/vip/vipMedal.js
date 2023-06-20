import React from "react";
import PropTypes from "prop-types";
import { defLevelList } from "./def";

const VipMedal = ({ i18n, vipActiveTabId, setVipActiveTabId }) => {
	const rows = defLevelList.map(l => (
		<div
			className={`medal-item ${
				l.level === vipActiveTabId ? l.levelTabsName : null
			}`}
			key={`VIPLevelList-${l.levelClubName}`}
			onClick={() => setVipActiveTabId(l.level)}>
			<img src={l.imgUrl} alt={l.levelClubName} />
			<div>
				{i18n[l.levelName]}
				<span>{i18n.lbl_VIP_Club}</span>
			</div>
		</div>
	));

	return <div className="medal">{rows}</div>;
};

VipMedal.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	vipActiveTabId: PropTypes.number.isRequired,
	setVipActiveTabId: PropTypes.func.isRequired
};

export default VipMedal;
