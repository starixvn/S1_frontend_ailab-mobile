import React from "react";
import no1 from "../../styles/img/no1.png";
import no2 from "../../styles/img/no2.png";
import no3 from "../../styles/img/no3.png";
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

	return defPrize[currency][category];
};

const PrizeList = ({ userInfo, category, i18n }) => {
	const { currencyId, langId } = userInfo;
	const getPrize = Prize({ currencyId, langId, category, i18n });

	const rows = Object.values(getPrize).map((prize, pIdx) => {
		let rank = pIdx + 1;
		return (
			<ul key={`prize-${category}-${currencyId}-${langId}-${rank}`}>
				<li>
					{rank === 1 ? (
						<img src={no1} alt="no1" />
					) : rank === 2 ? (
						<img src={no2} alt="no2" />
					) : rank === 3 ? (
						<img src={no3} alt="no3" />
					) : null}
					{`${i18n.lbl_Top} ${rank}`}
				</li>
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

export default PrizeList;
