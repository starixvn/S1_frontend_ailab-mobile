import React from "react";
import PropTypes from "prop-types";
import { defPrize, defEuroTourBtns } from "./def";
import EuroAgenda from "./euroAgenda";
import { RankImg } from "./rankList";

export const currCustomMapping = {
	13: "VND"
};

export const Prize = ({ category, langId }) => {
	const prize = defPrize();
	return prize.VND?.[langId]?.[category] ?? prize.MYR[langId][category];
};

const PrizeList = ({ userInfo, category, i18n }) => {
	const { currencyId, langId } = userInfo;
	const getPrize = Prize({ currencyId, langId, category, i18n });

	const rows = getPrize.map((item, index) => {
		const { rank, prize } = item;
		return index < 9 ? (
			<ul key={`prize-${category}-${currencyId}-${langId}-${rank}`}>
				<li>
					<RankImg Ranking={index + 1} />
					{rank}
				</li>
				<li>{prize}</li>
			</ul>
		) : (
			""
		);
	});

	return (
		<div className="rankList open">
			{category === defEuroTourBtns.MonthlyTournament.value && (
				<EuroAgenda i18n={i18n} />
			)}
			{category !== defEuroTourBtns.MonthlyTournament.value && (
				<ul>
					<div className="title xs">{i18n.lbl_AgendaTitle}</div>
					<li>{i18n.lbl_Ranking}</li>
					<li>{i18n.lbl_RewardAmount}</li>
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
