import React from "react";
import { bannerImgUrl } from "../../config";
import { useLeaderBoard } from "./leaderboardContext";

/** Banner 组件 */
const LeaderboardBanner = () => {
	const { langId } = useLeaderBoard();
	return (
		<div className="leaderboard-banner">
			<img
				src={`${bannerImgUrl}/h5/img/leaderboard/banner-${langId}.jpg`}
				alt="leaderboard-banner"
			/>
		</div>
	);
};

/** Banner 组件 */
export default LeaderboardBanner;
