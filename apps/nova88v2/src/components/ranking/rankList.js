import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { number_format } from "../common/common";

const RankItem = ({ Ranking, userName, turnover, isCurrentUser }) => {
	const rank = Number(Ranking);
	let trophy = "";
	if (rank === 1 || rank === 2 || rank === 3) trophy = "icon icon-trophy";

	return (
		<ul className={isCurrentUser ? "userRank" : ""}>
			<li className={trophy}>{Ranking}</li>
			<li>{userName}</li>
			<li>{number_format(turnover)}</li>
		</ul>
	);
};

RankItem.propTypes = {
	isCurrentUser: PropTypes.bool.isRequired,
	userName: PropTypes.string.isRequired,
	turnover: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
		.isRequired,
	Ranking: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
		.isRequired
};

const RankItems = ({ datas }) =>
	datas?.map((data, idx) => {
		const { userName, wTurnover, rank } = data;
		return (
			<RankItem
				key={`rank-${userName}-${wTurnover}`}
				Ranking={rank ?? idx + 1}
				userName={userName}
				turnover={wTurnover}
				isCurrentUser={Boolean(rank)}
			/>
		);
	});
const RankList = ({ loading, i18n = {}, datas, lastUpdTime, isLastEvent }) => {
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
					<RankItems datas={datas} />
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
	datas: []
};

RankList.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	loading: PropTypes.bool,
	datas: PropTypes.arrayOf(PropTypes.object),
	lastUpdTime: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.instanceOf(Date)
	]).isRequired
};

export default RankList;
