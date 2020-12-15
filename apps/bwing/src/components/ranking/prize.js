import React from "react";
import { RankImg } from "./rankList";
import { defPrize } from "./def";

const PrizeList = ({ userInfo, i18n }) => {
	const { currencyId, langId } = userInfo;

	const rows = defPrize.map(item => {
		const { rank, prize, noOfWinners } = item;
		return (
			<li
				key={`prize-${currencyId}-${langId}-${rank}`}
				className={item.className}>
				<div>
					<RankImg Ranking={rank} />
				</div>
				<div>{prize}</div>
				<div>{noOfWinners}</div>
			</li>
		);
	});

	return (
		<div className="ranlist">
			<ul>
				<li className="listTitle">
					<div>{i18n.lbl_Ranking}</div>
					<div>{i18n.lbl_Rewards}</div>
					<div>{i18n.lbl_NoOfWinners}</div>
				</li>
				{rows}
			</ul>
		</div>
	);
};

export default PrizeList;
