import React from "react";
import { bannerImgUrl } from "../../../config";
import { useLeaderBoard } from "../leaderboardContext";
import { numFormatToDigits } from "../../common/common";

/** 使用者自己的排名 */
const LeaderboardUserRanking = () => {
	const { userRank } = useLeaderBoard();
	const { rank, userName, point } = userRank ?? {};

	/** 前三名會有獎牌，其餘名次則顯示排名 */
	const randerRank = () => {
		const numberRank = Number(rank);
		const isTop3 = numberRank <= 3;
		return isTop3 ? (
			<div className="order">
				<img
					src={`${bannerImgUrl}/h5/img/leaderboard/winner-${numberRank}.png`}
					alt=""
				/>
			</div>
		) : (
			<div className="order">{rank}</div>
		);
	};

	return (
		<div className="user-themselves">
			<div className="left">
				<i className="icon-arrow" />
				{randerRank()}
				<div className="user-id">{userName}</div>
			</div>
			<div className="right">
				<i className="icon-cash" />
				<span>{numFormatToDigits(point)}</span>
			</div>
		</div>
	);
};

/** 使用者自己的排名 */
export default LeaderboardUserRanking;
