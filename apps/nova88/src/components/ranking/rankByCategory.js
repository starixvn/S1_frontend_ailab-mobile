import React from "react";
import champion from "../../styles/img/champion.png";
import { defBtns, defPrize } from "./def";
import { useGetRanking } from "./hook";
import RankList from "./rankList";
import { currCustomMapping } from "./prize";

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
	const currencyName =
		currCustomMapping[currencyId] ?? i18n[`Currency_${currencyId}`];
	const prize = defPrize?.[currencyName]?.[selected]?.[1];

	return (
		<div className={`champion${isOpen ? " open" : ""}`}>
			<div className="title">{title}</div>
			<div className="eventTitle">{i18n.lbl_Ranking_Top10}</div>
			<div className="highest">
				<img src={champion} alt="champion" />
				<div className="mwt_border">
					<span className="arrow_t_int"></span>
					<span className="arrow_t_out"></span>
					<div className="text-org">{prize}</div>
				</div>
			</div>
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
