import React from "react";
import champion from "../../styles/img/champion.png";
import { defBtns } from "./def";
import { useGetRanking } from "./hook";
import RankList from "./rankList";

const Ranking = ({ isOpen, selected, i18n = {}, isLogin }) => {
	const { datas, lastUpdTime } = useGetRanking({ isOpen, selected, isLogin });
	const title = i18n[defBtns[selected]?.displayKey];

	return (
		<div className={`champion${isOpen ? " open" : ""}`}>
			<div className="title">{title}</div>
			<div className="eventTitle">
				{title} {i18n.lbl_Ranking_Top10}
			</div>
			<div className="highest">
				<img src={champion} alt="champion" />
				{/* <div className="mwt_border">
					<span className="arrow_t_int"></span>
					<span className="arrow_t_out"></span>
					<div className="text-org">MYR 10,000,000.00</div>
				</div> */}
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
