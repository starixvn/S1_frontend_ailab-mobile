import React, { useContext } from "react";
import { LeaderboardProvider } from "@ailab-mobile/common";
import LeaderboardBanner from "./LeaderboardBanner";
import LeaderboardRewards from "./leaderboardReward/LeaderboardRewards";
import LeaderboardRankingList from "./leaderboardRankingList/LeaderboardRankingList";
import LeaderboardPointConversion from "./LeaderboardPointConversion";
import LeaderboardTerm from "./LeaderboardTerm";
import { userInfoContext } from "../common/context";
import { siteId } from "../../config";

/** leaderboard 主組件 */
const Leaderboard = () => {
	const { userInfo } = useContext(userInfoContext);

	return (
		<LeaderboardProvider userInfo={userInfo} siteId={siteId}>
			<LeaderboardBanner />
			<div className="leaderboard-wrapper">
				<LeaderboardRewards />
				<LeaderboardRankingList />
				<div className="leaderboard-info">
					<LeaderboardPointConversion />
					<LeaderboardTerm />
				</div>
			</div>
		</LeaderboardProvider>
	);
};

/** leaderboard 主組件 */
export default Leaderboard;
