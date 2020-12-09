import React from "react";
import champion from "../../styles/img/champion.png";
import { defBtns } from "./def";
import { useGetRanking } from "./hook";
import RankItems from "./rankItems";
import moment from "moment";

const Ranking = ({ isOpen, selected, i18n = {} }) => {
	const { datas, lastUpdTime } = useGetRanking({ isOpen, selected });
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
			<div className="rankList">
				<ul>
					<li>{i18n.lbl_Ranking}</li>
					<li>{i18n.lbl_Username}</li>
					<li>{i18n.lbl_Points}</li>
				</ul>
				<RankItems datas={datas} selected={selected} i18n={i18n} />
			</div>
			<div className="text">
				{i18n.lbl_LastUpdTime?.replace(
					"{{time}}",
					moment(lastUpdTime).format("YYYY-MM-DD H:mm:ss")
				)}
			</div>
		</div>
	);
};

export default Ranking;
