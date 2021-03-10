import React from "react";
import PropTypes from "prop-types";
import { RankImg } from "./rankList";
import { defPrize, defEuroTourBtns } from "./def";
import EuroAgenda from "./euroAgenda";

// const langMappingCurr = {
// 	en: "MYR",
// 	cs: "MYR",
// 	id: "IDR",
// 	th: "THB"
// };

// export const currCustomMapping = {
// 	13: "MYR"
// };

// "Currency_15": "IDR"
// "Currency_2": "MYR",
// "Currency_4": "THB",

const Prize = ({ currencyId = 2, category, langId = "cs", i18n }) => {
	// const currency = currencyId
	// 	? currCustomMapping[currencyId] ?? i18n[`Currency_${currencyId}`]
	// 	: langMappingCurr[langId];

	// return defPrize({ i18n })[currency]
	// 	? defPrize({ i18n })[currency][category]
	// 	: defPrize({ i18n }).MYR[category];
	const prize = defPrize();
	return prize[i18n[`Currency_${currencyId}`]][langId][category];
};

const PrizeList = ({ userInfo, category, i18n }) => {
	const { currencyId, langId } = userInfo;
	const getPrize = Prize({ currencyId, langId, category, i18n });

	const rows = getPrize.map((item, index) => {
		const { rank, prize } = item;
		return (
			index < 9 && (
				<ul
					key={`prize-${category}-${currencyId}-${langId}-${
						index + 1
					}`}>
					<li>
						<RankImg Ranking={index + 1} />
						{rank}
					</li>
					<li>{prize}</li>
				</ul>
			)
		);
	});

	return (
		<div className="rankList open">
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
