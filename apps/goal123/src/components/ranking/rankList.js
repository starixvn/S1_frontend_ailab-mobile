import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import no1 from "../../styles/img/first.png";
import no2 from "../../styles/img/second.png";
import no3 from "../../styles/img/third.png";
import nbadge from "../../styles/img/nbadge.png";
import { number_format } from "../common/common";

export const RankImg = ({ Ranking }) => {
	let img = <img src={nbadge} alt="gold" />;
	const rank = Number(Ranking);
	if (rank === 1) img = <img src={no1} alt="no1" />;
	else if (rank === 2) img = <img src={no2} alt="no2" />;
	else if (rank === 3) img = <img src={no3} alt="no3" />;
	return img;
};

const RankItem = ({ Ranking, userName, turnover, isCurrentUser }) => {
	return (
		<ul className={isCurrentUser ? `mine` : ""}>
			<li>
				<RankImg Ranking={Ranking} />
				{Ranking}
			</li>
			<li>{userName}</li>
			<li>{number_format(turnover)}</li>
		</ul>
	);
};

RankItem.defaultProps = {
	isCurrentUser: null
};

RankItem.propTypes = {
	Ranking: PropTypes.number.isRequired,
	userName: PropTypes.string.isRequired,
	turnover: PropTypes.number.isRequired,
	isCurrentUser: PropTypes.bool
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

const RankList = ({ loading, i18n = {}, datas, lastUpdTime }) => {
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
					<RankItems datas={datas} i18n={i18n} />
				</div>
			)}
			<div className="message">
				{i18n.lbl_LastUpdTime?.replace(
					"{{time}}",
					moment(lastUpdTime).format("YYYY-MM-DD H:mm:ss")
				)}
			</div>
		</>
	);
};

RankList.defaultProps = {
	loading: null,
	datas: []
};

RankList.propTypes = {
	loading: PropTypes.bool,
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	datas: PropTypes.arrayOf(PropTypes.object),
	lastUpdTime: PropTypes.instanceOf(Date).isRequired
};

export default RankList;
