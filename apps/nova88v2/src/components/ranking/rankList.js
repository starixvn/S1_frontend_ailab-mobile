import React, { useContext } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { userInfoContext } from "../common/context";
import { number_format } from "../common/common";

const RankItem = ({ Ranking, userName, turnover, isCurrentUser, userRank }) => {
	const rank = Number(Ranking);
	let trophy = "";
	if (rank === 1 || rank === 2 || rank === 3) trophy = "icon icon-trophy";
	return (
		<ul className={isCurrentUser ? "userRank" : ""}>
			<li className={trophy}>{userRank ?? Ranking}</li>
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

RankItem.defaultProps = {
	userRank: 999
};

RankItem.propTypes = {
	userRank: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	isCurrentUser: PropTypes.bool.isRequired,
	userName: PropTypes.string.isRequired,
	turnover: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
		.isRequired,
	Ranking: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
		.isRequired
};

const RankItems = ({ datas, defPrize }) => {
	return datas?.map((data, idx) => {
		const { userName, wTurnover, rank } = data;

		return (
			<RankItem
				key={`rank-${userName}-${wTurnover}`}
				Ranking={defPrize[idx]?.rank}
				userRank={idx === datas.length - 1 ? rank : null}
				userName={userName}
				turnover={wTurnover}
				isCurrentUser={Boolean(rank)}
			/>
		);
	});
};

const RankList = ({
	loading,
	i18n = {},
	datas,
	lastUpdTime,
	isLastEvent,
	defPrize
}) => {
	const { userInfo } = useContext(userInfoContext);

	return (
		<>
			{!loading && (!datas || datas.length === 0) ? (
				<div className="nodata icon icon-nodata">
					<div className="txt-white">{i18n.msg_NoData}</div>
				</div>
			) : (
				<div className="list active">
					<ul>
						<li>{i18n.lbl_Ranking}</li>
						<li>{i18n.lbl_Username}</li>
						<li>{i18n.lbl_Points}</li>
					</ul>
					<RankItems
						datas={datas}
						userInfo={userInfo}
						i18n={i18n}
						defPrize={defPrize}
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
	isLastEvent: false,
	defPrize: {}
};

RankList.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	loading: PropTypes.bool,
	datas: PropTypes.arrayOf(PropTypes.object),
	defPrize: PropTypes.objectOf(PropTypes.object),
	lastUpdTime: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.instanceOf(Date)
	]).isRequired,
	isLastEvent: PropTypes.bool
};

export default RankList;
