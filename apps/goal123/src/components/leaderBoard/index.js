import React, { useContext } from "react";
import { LeaderboardProvider } from "@ailab-mobile/common";
import LeaderBoardBanner from "./LeaderBoardBanner";
import LeaderBoardReward from "./LeaderBoardReward";
import LeaderBoardRanking from "./leaderboardRankingList/LeaderBoardRanking";
import LeaderBoardInfo from "./LeaderBoardInfo";
import { userInfoContext } from "../common/context";
import { siteId } from "../../config";

const LeaderBoard = () => {
	const { userInfo } = useContext(userInfoContext);
	return (
		<LeaderboardProvider userInfo={userInfo} siteId={siteId}>
			<LeaderBoardBanner />
			<div className="leaderboard-wrapper">
				<LeaderBoardReward />
				<LeaderBoardRanking />
				<LeaderBoardInfo />
			</div>
		</LeaderboardProvider>
	);
};

export default LeaderBoard;
