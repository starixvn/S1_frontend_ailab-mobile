import React from "react";
import no1 from "../../styles/img/no1.png";
import no2 from "../../styles/img/no2.png";
import no3 from "../../styles/img/no3.png";
import gold from "../../styles/img/gold.png";
import { number_format } from "../common/common";
import moment from "moment";

export const RankImg = ({ Ranking }) => {
	let img = <img src={gold} alt="gold" />;
	const rank = Number(Ranking);
	if (rank === 1) img = <img src={no1} alt="no1" />;
	else if (rank === 2) img = <img src={no2} alt="no2" />;
	else if (rank === 3) img = <img src={no3} alt="no3" />;
	return img;
};

const RankItem = ({
	i18n: { lbl_Top },
	Ranking,
	userName,
	turnover,
	isCurrentUser
}) => {
	return (
		<ul className={isCurrentUser ? "userRank" : ""}>
			<li>
				<RankImg Ranking={Ranking} />
				{`${lbl_Top} ${Ranking}`}
			</li>
			<li>{userName}</li>
			<li>{number_format(turnover)}</li>
		</ul>
	);
};

const RankItems = ({ i18n, datas, selected }) =>
	datas?.map((data, idx) => {
		const { userName, wTurnover, rank } = data;
		return (
			<RankItem
				key={`rank-${selected}-${idx}-${userName}-${wTurnover}`}
				Ranking={rank ?? idx + 1}
				userName={userName}
				turnover={wTurnover}
				i18n={i18n}
				isCurrentUser={Boolean(rank)}
			/>
		);
	});

const RankList = ({ loading, i18n = {}, datas, selected, lastUpdTime }) => {
	return (
		<>
			{!loading && (!datas || datas.length === 0) ? (
				<div className="nodata icon icon-nodata">
					<div className="txt-white">{i18n.msg_NoData}</div>
				</div>
			) : (
				<div className="rankList">
					<ul>
						<li>{i18n.lbl_Ranking}</li>
						<li>{i18n.lbl_Username}</li>
						<li>{i18n.lbl_Points}</li>
					</ul>
					<RankItems datas={datas} selected={selected} i18n={i18n} />
				</div>
			)}
			<div className="text">
				{i18n.lbl_LastUpdTime?.replace(
					"{{time}}",
					moment(lastUpdTime).format("YYYY-MM-DD H:mm:ss")
				)}
			</div>
		</>
	);
};

export default RankList;
