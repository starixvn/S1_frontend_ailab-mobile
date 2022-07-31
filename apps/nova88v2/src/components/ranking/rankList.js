import React, { useContext } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { userInfoContext } from "../common/context";
import { number_format } from "../common/common";
import { cloudImgURL } from "../../config";

const RankItem = ({
	Ranking,
	userName,
	wTurnover,
	isCurrentUser,
	userRank,
	status,
	i18n = {}
}) => {
	let trophy = "";
	let rankString = `${i18n.lbl_RankPrefix} ${Ranking + 1} ${
		i18n.lbl_RankPostfix
	}`;

	if (userRank === "999+") {
		rankString = userRank;
	} else if (userRank > 4 && userRank < 999) {
		rankString = `${i18n.lbl_RankPrefix} ${userRank} ${i18n.lbl_RankPostfix}`;
	} else {
		if (Ranking === 0) rankString = i18n.lbl_Champion;
		if (Ranking === 1) rankString = i18n.lbl_2nd;
		if (Ranking === 2) rankString = i18n.lbl_3rd;
		if (Ranking === 3) rankString = i18n.lbl_4th;
	}
	if (Ranking > 2) {
		trophy = `${cloudImgURL}/SiteSkin/img/gold.png`;
	} else {
		trophy = `${cloudImgURL}/SiteSkin/img/no${Ranking + 1}.png`;
	}
	let _status = "icon icon-minus";
	if (status === -1) _status = "icon icon-arrow_drop_down";
	if (status === 1) _status = "icon icon-arrow_drop_up";
	return (
		<li className={isCurrentUser ? `userRank` : ""}>
			<div>
				<img src={trophy} alt="prize" />
				{rankString}
			</div>
			<div>{userName}</div>
			<div className={_status} />
			<div>{number_format(wTurnover)}</div>
		</li>
	);
};

RankItem.defaultProps = {
	userRank: 999,
	status: null,
	i18n: null
};

RankItem.propTypes = {
	userRank: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	isCurrentUser: PropTypes.bool.isRequired,
	userName: PropTypes.string.isRequired,
	wTurnover: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
		.isRequired,
	Ranking: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
		.isRequired,
	status: PropTypes.number,
	i18n: PropTypes.objectOf(PropTypes.string)
};

const RankItems = ({ datas, i18n }) => {
	return datas?.map((data, idx) => {
		const { userName, wTurnover, status, rank } = data;
		return (
			<RankItem
				key={`rank-${userName}-${wTurnover}`}
				Ranking={idx}
				userRank={rank ?? -1}
				userName={userName}
				wTurnover={wTurnover}
				status={status}
				i18n={i18n}
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
	const monthlyEndDate = moment()
		.endOf("month")
		.format("YYYY/MM/DD HH:mm:ss");

	return (
		<>
			{!loading && (!datas || datas.length === 0) ? (
				<div className="nodata icon icon-nodata">
					<div className="txt-white">{i18n.msg_NoData}</div>
				</div>
			) : (
				<div className="rankList">
					<ul>
						<li>
							<div>{i18n.lbl_Ranking}</div>
							<div>{i18n.lbl_Username}</div>
							<div>{i18n.lbl_Status}</div>
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
				<>
					<div className="text">
						{i18n.lbl_LastUpdTime?.replace(
							"{{time}}",
							moment(lastUpdTime).format("YYYY-MM-DD HH:mm:ss")
						)}
					</div>
					<div className="text" style={{ fontWeight: 600 }}>
						{i18n.lbl_Ranking_EndDate?.replace(
							"{{time}}",
							`${monthlyEndDate} GMT+8`
						)}
					</div>
				</>
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
		PropTypes.arrayOf(PropTypes.object),
		PropTypes.objectOf(PropTypes.object)
	]),
	lastUpdTime: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.instanceOf(Date)
	]).isRequired,
	isLastEvent: PropTypes.bool
};

export default RankList;
