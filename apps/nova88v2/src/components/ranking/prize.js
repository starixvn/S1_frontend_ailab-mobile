import React from "react";
import PropTypes from "prop-types";
import { defPrize, defEuroTourBtns } from "./def";
import EuroAgenda from "./euroAgenda";

const langMappingCurr = {
	en: "MYR",
	cs: "MYR",
	id: "IDR",
	th: "THB"
};

export const currCustomMapping = {
	13: "MYR"
};

export const Prize = ({ currencyId, category, langId, i18n }) => {
	const currency = currencyId
		? currCustomMapping[currencyId] ?? i18n[`Currency_${currencyId}`]
		: langMappingCurr[langId];

	const prize = defPrize();
	return prize[currency]?.[langId]?.[category] ?? prize.MYR[langId][category];
};

const PrizeList = ({ userInfo, category, i18n }) => {
	const { currencyId, langId } = userInfo;
	const getPrize = Prize({ currencyId, langId, category, i18n });

	const rows = getPrize.map((item, index) => {
		const { rank, prize } = item;
		let trophy = "";
		if (index < 3) trophy = "icon icon-trophy";

		return index < 9 ? (
			<ul key={`prize-${category}-${currencyId}-${langId}-${rank}`}>
				<li className={trophy}>{rank}</li>
				<li>{prize}</li>
			</ul>
		) : (
			""
		);
	});

	return (
		<div className="list active">
			{category === defEuroTourBtns.MonthlyTournament.value && (
				<EuroAgenda i18n={i18n} />
			)}
			{category !== defEuroTourBtns.MonthlyTournament.value && (
				<ul>
					<li>{i18n.lbl_Ranking}</li>
					<li>{i18n.lbl_Rewards}</li>
				</ul>
			)}

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
