import React from "react";
import { useTranslation } from "react-i18next";
import { useLeaderBoard } from "@ailab-mobile/common";
import LeaderboardDateCountdown from "./LeaderboardDateCountdown";
import LeaderboardItem from "./LeaderboardItem";
import LeaderboardDateSelection from "./LeaderboardDateSelection";
import LeaderboardUserRanking from "./LeaderboardUserRanking";

const LeaderBoardRanking = () => {
	const { t } = useTranslation();
	const { getFormattedUpdateTime, rankList, isLogin } = useLeaderBoard();

	const hasRankList = rankList.length > 0;

	return (
		<div className="leaderboard-ranking">
			<LeaderboardDateCountdown />
			<div className="board">
				<LeaderboardDateSelection />
				<div className="winner-total">
					<LeaderboardItem />
					{isLogin && hasRankList && <LeaderboardUserRanking />}
				</div>
				<div className="board-refresh">
					{t("lbl_Leaderboard_Last_Update_On")}
					<span className="data">
						{getFormattedUpdateTime()}
					</span>{" "}
					{t("lbl_Leaderboard_Update_Every_30_Minutes")}
				</div>
			</div>
		</div>
	);
};

export default LeaderBoardRanking;
