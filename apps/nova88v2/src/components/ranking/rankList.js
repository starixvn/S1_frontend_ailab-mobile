import React, { useContext } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { userInfoContext } from "../common/context";

import { number_format } from "../common/common";

// export const RankImg = ({ Ranking }) => {
// 	let img = <img src={gold} alt="gold" />;
// 	const rank = Number(Ranking);
// 	if (rank === 1) img = <img src={no1} alt="no1" />;
// 	else if (rank === 2) img = <img src={no2} alt="no2" />;
// 	else if (rank === 3) img = <img src={no3} alt="no3" />;
// 	return img;
// };

// const RankItem = ({ Ranking, userName, turnover, isCurrentUser, rank }) => {
// 	return (
// 		<ul className={isCurrentUser ? "userRank" : ""}>
// 			<li>
// 				<RankImg Ranking={Ranking} />
// 				{rank[Ranking - 1]?.rank ?? Ranking}
// 			</li>
// 			<li>{userName}</li>
// 			<li>{number_format(turnover)}</li>
// 		</ul>
// 	);
// };

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

// const langMappingCurr = {
// 	en: "MYR",
// 	cs: "MYR",
// 	id: "IDR",
// 	th: "THB"
// };

// export const currCustomMapping = {
// 	13: "MYR"
// };

const RankItems = ({ datas, defPrize }) => {
	// const { currentId, langId  }  = userInfo

	// const currency = currencyId
	// 	? currCustomMapping[currencyId] ?? i18n[`Currency_${currencyId}`]
	// 	: langMappingCurr[langId];

	// prize[currency]?.[langId]?.[category] ?? prize.MYR[langId][category];
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

// const RankItems = ({ datas, selected, prize }) =>
// 	datas?.map((data, idx) => {
// 		const { userName, wTurnover, rank } = data;
// 		return (
// 			<RankItem
// 				key={`rank-${selected}-${userName}-${wTurnover}`}
// 				Ranking={rank ?? idx + 1}
// 				userName={userName}
// 				turnover={wTurnover}
// 				rank={prize}
// 				isCurrentUser={Boolean(rank)}
// 			/>
// 		);
// 	});

// const RankList = ({
// 	loading,
// 	i18n = {},
// 	datas,
// 	selected,
// 	lastUpdTime,
// 	isLastEvent,
// 	defPrize
// }) => {
// 	return (
// 		<>
// 			{!loading && (!datas || datas.length === 0) ? (
// 				<div className="nodata icon icon-nodata">
// 					<div className="txt-white">{i18n.msg_NoData}</div>
// 				</div>
// 			) : (
// 				<div className="list">
// 					<ul>
// 						<li>{i18n.lbl_Ranking}</li>
// 						<li>{i18n.lbl_Username}</li>
// 						<li>{i18n.lbl_Points}</li>
// 					</ul>
// 					<RankItems
// 						datas={datas}
// 						selected={selected}
// 						prize={defPrize}
// 					/>
// 				</div>
// 			)}
// 			{isLastEvent ? null : (
// 				<div className="text">
// 					{i18n.lbl_LastUpdTime?.replace(
// 						"{{time}}",
// 						moment(lastUpdTime).format("YYYY-MM-DD H:mm:ss")
// 					)}
// 				</div>
// 			)}
// 		</>
// 	);
// };
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
	// selected: "",
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
