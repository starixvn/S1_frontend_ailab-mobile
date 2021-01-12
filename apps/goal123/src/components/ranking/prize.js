import React from "react";
import PropTypes from "prop-types";
import { RankImg } from "./rankList";
import { defPrize } from "./def";

const PrizeList = ({ userInfo, i18n }) => {
	const { currencyId, langId } = userInfo;

	const rows = defPrize.map(item => {
		const { rank, prize } = item;
		return (
			<ul key={`prize-${currencyId}-${langId}-${rank}`}>
				<li>
					<RankImg Ranking={rank} />
					{rank}
				</li>
				<li>{prize}</li>
			</ul>
		);
	});

	return (
		<div className="rankList">
			<ul>
				<li>{i18n.lbl_Rank}</li>
				<li>{i18n.lbl_Awards}</li>
			</ul>
			{rows}
		</div>
	);
};

PrizeList.propTypes = {
	userInfo: PropTypes.objectOf(PropTypes.string).isRequired,
	i18n: PropTypes.objectOf(PropTypes.string).isRequired
};

export default PrizeList;
