import React from "react";
import { defBtns } from "./def";
import { useGetRanking } from "./hook";
import RankList from "./rankList";
import { HighestReward } from "./prize";

const Ranking = ({
	isOpen,
	selected,
	i18n = {},
	userInfo: { isLogin, userName, currencyId }
}) => {
	const { datas, lastUpdTime } = useGetRanking({
		isOpen,
		selected,
		isLogin,
		userName
	});
	const title = i18n[defBtns[selected]?.titleKey];

	return (
		<div className={`champion${isOpen ? " open" : ""}`}>
			<div className="title">{title}</div>
			<div className="eventTitle">{i18n.lbl_Ranking_Top10}</div>
			<HighestReward
				i18n={i18n}
				currencyId={currencyId}
				selected={selected}
			/>
			<RankList
				i18n={i18n}
				datas={datas}
				selected={selected}
				lastUpdTime={lastUpdTime}
			/>
		</div>
	);
};

export default Ranking;
