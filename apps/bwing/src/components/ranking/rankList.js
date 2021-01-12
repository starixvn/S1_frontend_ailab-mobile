import React from "react";
import moment from "moment";
import no1 from "../../styles/img/ranking/trophy1.png";
import no2 from "../../styles/img/ranking/trophy2.png";
import no3 from "../../styles/img/ranking/trophy3.png";
import gold from "../../styles/img/ranking/trophy4.png";
import { number_format } from "../common/common";

export const RankImg = ({ Ranking }) => {
	let img = <img src={gold} alt="gold" />;
	const rank = Number(Ranking);
	if (isNaN(Ranking) && Ranking !== "999+") {
		img = Ranking;
	} else if (rank === 1) img = <img src={no1} alt="no1" />;
	else if (rank === 2) img = <img src={no2} alt="no2" />;
	else if (rank === 3) img = <img src={no3} alt="no3" />;
	return img;
};

const RankItem = ({ Ranking, userName, turnover, isCurrentUser }) => {
	const className = Ranking <= 3 ? `no${Ranking}` : "";
	return (
		<li className={isCurrentUser ? `${className} myRank` : className}>
			<div>
				<RankImg Ranking={Ranking} />
				{Ranking}
			</div>
			<div>{userName}</div>
			<div>{number_format(turnover)}</div>
		</li>
	);
};

const RankItems = ({ datas }) =>
	datas?.map((data, idx) => {
		const { userName, wTurnover, rank } = data;
		return (
			<RankItem
				key={`rank-${idx}-${userName}-${wTurnover}`}
				Ranking={rank ?? idx + 1}
				userName={userName}
				turnover={wTurnover}
				isCurrentUser={Boolean(rank)}
			/>
		);
	});

const RankList = ({ loading, i18n = {}, datas, lastUpdTime }) => {
	return (
		<>
			{!loading && (!datas || datas.length === 0) ? (
				<div className="nodata icon icon-nodata">{i18n.msg_NoData}</div>
			) : (
				<div className="ranklist">
					<ul>
						<li className="listTitle">
							<div>{i18n.lbl_Ranking}</div>
							<div>{i18n.lbl_Username}</div>
							<div>{i18n.lbl_Points}</div>
						</li>
						<RankItems datas={datas} i18n={i18n} />
					</ul>
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
