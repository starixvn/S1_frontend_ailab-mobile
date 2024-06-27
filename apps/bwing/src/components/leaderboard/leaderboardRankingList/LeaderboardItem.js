import React from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { numFormatToDigits } from "../../common/common";
import { bannerImgUrl } from "../../../config";

/** 排名列表Item */
const LeaderboardItem = ({ rankList }) => {
	const { t } = useTranslation();

	/**
	 * 渲染前三名 Item，會有獎牌，所以前三名單獨處理
	 * @param userName 其他玩家名稱
	 * @param point point
	 * @param rank 名次 */
	const renderTop3Item = (userName, point, rank) => {
		return (
			<div className={`user-list top-${rank}`} key={rank}>
				<div className="left">
					<div className="order">
						<img
							src={`${bannerImgUrl}/h5/img/leaderboard/winner-${rank}.png`}
							alt=""
						/>
					</div>
					<div className="user-id">{userName}</div>
				</div>
				<div className="right">
					<i className="icon-cash" />
					<span>$ {numFormatToDigits(point)}</span>
				</div>
			</div>
		);
	};

	/**
	 * 渲染除了前三名以外的 Item，
	 * @param userName 其他玩家名稱
	 * @param point point
	 * @param rank 名次 */
	const renderOtherItem = (userName, point, rank) => {
		return (
			<div className="user-list" key={rank}>
				<div className="left">
					<div className="order">{rank}</div>
					<div className="user-id">{userName}</div>
				</div>
				<div className="right">
					<i className="icon-cash" />
					<span>$ {numFormatToDigits(point)}</span>
				</div>
			</div>
		);
	};
	return (
		<>
			<div className="user-thead">
				<div className="left">
					<span>{t("lbl_Rank")}</span>
					<span>{t("lbl_Username")}</span>
				</div>
				<div className="right">
					<span>{t("lbl_Points")}</span>
				</div>
			</div>
			<div className="user-ranking">
				{/* 渲染前三名 Item，會有獎牌，所以前三名跟其他 Item 處理方式不同 */}
				{rankList &&
					rankList.map(({ userName, wTurnover }, index) => {
						const isTop3 = index < 3; // 前三名
						const rank = index + 1; // 名次
						return isTop3
							? renderTop3Item(userName, wTurnover, rank)
							: renderOtherItem(userName, wTurnover, rank);
					})}
			</div>
		</>
	);
};

/** 排名列表Item */
export default LeaderboardItem;

LeaderboardItem.propTypes = {
	rankList: PropTypes.arrayOf(
		PropTypes.shape({
			userName: PropTypes.string.isRequired,
			wTurnover: PropTypes.number.isRequired
		})
	).isRequired
};
