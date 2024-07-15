import React from "react";
import { useLeaderBoard } from "@ailab-mobile/common";
import { bannerImgUrl } from "../../../config";
import { numFormatToDigits } from "../../common/common";

/** 使用者自己的排名 */
const LeaderboardUserRanking = () => {
	const { userRank } = useLeaderBoard();
	const { custRank, userName, point } = userRank ?? {};

	/** 前三名會有獎牌，其餘名次則顯示排名 */
	const randerRank = () => {
		const numberRank = Number(custRank);
		const isTop3 = numberRank <= 3;
		return isTop3 ? (
			<div className="order">
				<img
					src={`${bannerImgUrl}/h5/img/leaderboard/winner-${numberRank}.png`}
					alt=""
				/>
			</div>
		) : (
			<div className="order">{custRank}</div>
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
				<span>{numFormatToDigits(point, 0)}</span>
			</div>
		</div>
	);
};

/** 使用者自己的排名 */
export default LeaderboardUserRanking;
