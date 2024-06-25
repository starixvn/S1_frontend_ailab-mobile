import React from "react";
import LeaderboardBanner from "./LeaderboardBanner";
import LeaderboardRewards from "./leaderboardReward/LeaderboardRewards";
import LeaderboardRankingList from "./leaderboardRankingList/LeaderboardRankingList";
import LeaderboardPointConversion from "./LeaderboardPointConversion";
import LeaderboardTerm from "./LeaderboardTerm";

/** leaderboard 主組件 */
const Leaderboard = () => {
	return (
		<main className="leaderboard">
			<LeaderboardBanner />
			<div className="leaderboard-wrapper">
				<LeaderboardRewards />
				<LeaderboardRankingList />
				<div className="leaderboard-info">
					<LeaderboardPointConversion />
					<LeaderboardTerm />
				</div>
			</div>
		</main>
	);
};

/** leaderboard 主組件 */
export default Leaderboard;
