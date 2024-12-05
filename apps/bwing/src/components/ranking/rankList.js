import React, { useContext } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { userInfoContext } from "../common/context";
import { number_format } from "../common/common";
// import no1 from "../../styles/img/ranking/trophy1.png";
// import no2 from "../../styles/img/ranking/trophy2.png";
// import no3 from "../../styles/img/ranking/trophy3.png";
// import gold from "../../styles/img/ranking/trophy4.png";

const RankItem = ({
	Ranking,
	userName,
	turnover,
	isCurrentUser,
	userRank,
	idx
}) => {
	let Class;
	if (idx === 0) {
		Class = "no1";
	} else if (idx === 1) {
		Class = "no2";
	} else if (idx === 2) {
		Class = "no3";
	}
	return (
		<li className={isCurrentUser ? `myRank ${Class}` : Class}>
			<div>
				<RankImg Ranking={idx + 1} />
				{Ranking}
				{userRank}
			</div>
			<div>{userName}</div>
			<div>{number_format(turnover)}</div>
		</li>
	);
};

RankItem.defaultProps = {
	userRank: 999,
	Ranking: 0
};

RankItem.propTypes = {
	userRank: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	isCurrentUser: PropTypes.bool.isRequired,
	userName: PropTypes.string.isRequired,
	turnover: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
		.isRequired,
	Ranking: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export const RankImg = ({ Ranking }) => {
	let img = <img src="" alt="gold" />;
	const rank = Number(Ranking);
	if (isNaN(Ranking) && Ranking !== "999+") {
		img = Ranking;
	} else if (rank === 1) img = <img src="" alt="no1" />;
	else if (rank === 2) img = <img src="" alt="no2" />;
	else if (rank === 3) img = <img src="" alt="no3" />;
	return img || "";
};

const RankItems = ({ datas, defPrize }) => {
	return datas?.map((data, idx) => {
		const { userName, wTurnover, rank } = data;
		return (
			<RankItem
				key={`rank-${userName}-${wTurnover}`}
				Ranking={defPrize[idx]?.rank ? idx + 1 : null}
				userRank={idx === datas.length - 1 ? rank : null}
				userName={userName}
				turnover={wTurnover}
				isCurrentUser={Boolean(rank)}
				idx={idx}
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
				<div className="icon icon-nodata">{i18n.msg_NoData}</div>
			) : (
				<div className="ranklist open">
					<ul>
						<li className="listTitle">
							<div>{i18n.lbl_Ranking}</div>
							<div>{i18n.lbl_Username}</div>
							<div>{i18n.lbl_Points}</div>
						</li>

						<RankItems
							datas={datas}
							userInfo={userInfo}
							i18n={i18n}
							defPrize={defPrize}
						/>
					</ul>
				</div>
			)}
			{isLastEvent ? null : (
				<div className="remind">
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
	defPrize: PropTypes.oneOfType([
		PropTypes.objectOf(PropTypes.object),
		PropTypes.arrayOf(PropTypes.object)
	]),
	lastUpdTime: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.instanceOf(Date)
	]).isRequired,
	isLastEvent: PropTypes.bool
};

export default RankList;
