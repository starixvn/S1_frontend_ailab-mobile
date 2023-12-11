import React from "react";
import PropTypes from "prop-types";
import { defLevelList } from "./def";

const VipMedal = ({ i18n, langId, vipActiveTabId, setVipActiveTabId }) => {
	const rows = defLevelList.map(l => (
		<div
			className={`medal-item ${
				l.level === vipActiveTabId ? l.levelTabsName : null
			}`}
			key={`VIPLevelList-${l.levelClubName}`}
			onClick={() => setVipActiveTabId(l.level)}>
			<img src={l.imgUrl} alt={l.levelClubName} />
			{langId === "cs" || langId === "en" ? (
				<div>
					{i18n[l.levelName]}
					<span>{i18n.lbl_VIP_Club}</span>
				</div>
			) : (
				i18n[l.levelClubName]
			)}
		</div>
	));

	return <div className="medal">{rows}</div>;
};

VipMedal.propTypes = {
	langId: PropTypes.string.isRequired,
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	vipActiveTabId: PropTypes.number.isRequired,
	setVipActiveTabId: PropTypes.func.isRequired
};

export default VipMedal;
