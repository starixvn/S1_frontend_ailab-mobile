import React from "react";
import LeaderBoardBanner from "./LeaderBoardBanner";
import LeaderBoardReward from "./LeaderBoardReward";
import LeaderBoardRanking from "./LeaderBoardRanking";
import LeaderBoardInfo from "./LeaderBoardInfo";

const LeaderBoard = () => {
	return (
		<>
			<LeaderBoardBanner />
			<div className="leaderboard-wrapper">
				<LeaderBoardReward />
				<LeaderBoardRanking />
				<LeaderBoardInfo />
			</div>
		</>
	);
};

export default LeaderBoard;
