import React from "react";
import PropTypes from "prop-types";
import { defPrize } from "./def";

const langMappingCurr = {
	en: "MYR",
	cs: "MYR",
	id: "IDR",
	th: "THB"
};

export const currCustomMapping = {
	13: "MYR"
};

const Prize = ({ currencyId, category, langId, i18n }) => {
	const currency = currencyId
		? currCustomMapping[currencyId] ?? i18n[`Currency_${currencyId}`]
		: langMappingCurr[langId];
	return defPrize({ i18n })[currency]
		? defPrize({ i18n })[currency][category]
		: defPrize({ i18n }).MYR[category];
};

const PrizeList = ({ userInfo, category, i18n }) => {
	const { currencyId, langId } = userInfo;
	const getPrize = Prize({ currencyId, langId, category, i18n });

	const rows = getPrize.map(item => {
		const { rank, prize } = item;
		let trophy = "";
		if (+rank === 1 || +rank === 2 || +rank === 3)
			trophy = "icon icon-trophy";
		return (
			<ul key={`prize-${category}-${currencyId}-${langId}-${rank}`}>
				<li className={trophy}>{rank}</li>
				<li>{prize}</li>
			</ul>
		);
	});

	return (
		<div className="rankList">
			<ul>
				<li>{i18n.lbl_Ranking}</li>
				<li>{i18n.lbl_Rewards}</li>
			</ul>
			{rows}
		</div>
	);
};

PrizeList.defaultProps = {
	category: ""
};

PrizeList.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	category: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default PrizeList;
