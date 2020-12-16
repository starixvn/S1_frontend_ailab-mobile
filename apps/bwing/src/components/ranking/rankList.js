import React from "react";
import no1 from "../../styles/img/ranking/trophy1.png";
import no2 from "../../styles/img/ranking/trophy2.png";
import no3 from "../../styles/img/ranking/trophy3.png";
import gold from "../../styles/img/ranking/trophy4.png";
import { number_format } from "../common/common";
import moment from "moment";

export const RankImg = ({ Ranking }) => {
	let img = <img src={gold} alt="gold" />;
	const rank = Number(Ranking);
	if (isNaN(Ranking)) {
		img = Ranking;
	} else if (rank === 1) img = <img src={no1} alt="no1" />;
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
	let className = Ranking <= 3 ? `no${Ranking}` : "";
	return (
		<li className={isCurrentUser ? `${className} myRan` : className}>
			<div>
				<RankImg Ranking={Ranking} />
				{`${lbl_Top} ${Ranking}`}
			</div>
			<div>{userName}</div>
			<div>{number_format(turnover)}</div>
		</li>
	);
};

const RankItems = ({ i18n, datas }) =>
	datas?.map((data, idx) => {
		const { userName, wTurnover, rank } = data;
		return (
			<RankItem
				key={`rank-${idx}-${userName}-${wTurnover}`}
				Ranking={rank ?? idx + 1}
				userName={userName}
				turnover={wTurnover}
				i18n={i18n}
				isCurrentUser={Boolean(rank)}
			/>
		);
	});

const RankList = ({ loading, i18n = {}, datas, lastUpdTime }) => {
	return (
		<>
			{!loading && (!datas || datas.length === 0) ? (
				<div className="nodata icon icon-nodata">
					<div className="txt-white">{i18n.msg_NoData}</div>
				</div>
			) : (
				<div className="ranlist">
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
