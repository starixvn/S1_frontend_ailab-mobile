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
		let Class;
		if (index === 0) {
			Class = "no1";
		} else if (index === 1) {
			Class = "no2";
		} else if (index === 2) {
			Class = "no3";
		}
		return index < 9 ? (
			<li
				key={`prize-${category}-${currencyId}-${langId}-${rank}`}
				className={Class}>
				<div>
					<RankImg Ranking={index + 1} />
				</div>
				<div>{rank}</div>
				<div>{prize}</div>
			</li>
		) : (
			""
		);
	});

	return (
		<div className="ranklist open">
			{category === defEuroTourBtns.MonthlyTournament.value && (
				<EuroAgenda i18n={i18n}>{rows}</EuroAgenda>
			)}
			{category !== defEuroTourBtns.MonthlyTournament.value && (
				<ul>
					<li className="listTitle">
						<div>{i18n.lbl_Ranking}</div>
						<div>{i18n.lbl_Prizes}</div>
					</li>
					{rows}
				</ul>
			)}
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
