import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import no1 from "../../styles/img/no1.png";
import no2 from "../../styles/img/no2.png";
import no3 from "../../styles/img/no3.png";
import gold from "../../styles/img/gold.png";
import { number_format } from "../common/common";

export const RankImg = ({ Ranking }) => {
	let img = <img src={gold} alt="gold" />;
	const rank = Number(Ranking);
	if (rank === 1) img = <img src={no1} alt="no1" />;
	else if (rank === 2) img = <img src={no2} alt="no2" />;
	else if (rank === 3) img = <img src={no3} alt="no3" />;
	return img;
};

const RankItem = ({ Ranking, userName, turnover, isCurrentUser, rank }) => {
	return (
		<ul className={isCurrentUser ? "userRank" : ""}>
			<li>
				<RankImg Ranking={Ranking} />
				{rank[Ranking - 1]?.rank ?? Ranking}
			</li>
			<li>{userName}</li>
			<li>{number_format(turnover)}</li>
		</ul>
	);
};

RankItem.defaultProps = {
	rank: []
};

RankItem.propTypes = {
	rank: PropTypes.arrayOf(PropTypes.object),
	isCurrentUser: PropTypes.bool.isRequired,
	userName: PropTypes.string.isRequired,
	turnover: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
		.isRequired,
	Ranking: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
		.isRequired
};

const RankItems = ({ datas, selected, prize }) =>
	datas?.map((data, idx) => {
		const { userName, wTurnover, rank } = data;
		return (
			<RankItem
				key={`rank-${selected}-${userName}-${wTurnover}`}
				Ranking={rank ?? idx + 1}
				userName={userName}
				turnover={wTurnover}
				rank={prize}
				isCurrentUser={Boolean(rank)}
			/>
		);
	});

const RankList = ({
	loading,
	i18n = {},
	datas,
	selected,
	lastUpdTime,
	isLastEvent,
	defPrize
}) => {
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
					<RankItems
						datas={datas}
						selected={selected}
						prize={defPrize}
					/>
				</div>
			)}
			{isLastEvent ? null : (
				<div className="text">
					{i18n.lbl_LastUpdTime?.replace(
						"{{time}}",
						moment(lastUpdTime).format("YYYY-MM-DD H:mm:ss")
					)}
				</div>
			)}
		</>
	);
};

RankList.defaultProps = {
	loading: false,
	datas: [],
	selected: "",
	isLastEvent: false
};

RankList.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	loading: PropTypes.bool,
	datas: PropTypes.arrayOf(PropTypes.object),
	selected: PropTypes.string,
	lastUpdTime: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.instanceOf(Date)
	]).isRequired,
	isLastEvent: PropTypes.bool
};

export default RankList;
