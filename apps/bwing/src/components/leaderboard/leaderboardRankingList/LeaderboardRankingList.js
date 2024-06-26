import React from "react";
import { useTranslation } from "react-i18next";
import { useLeaderBoard } from "../leaderboardContext";
import LeaderboardDateCountdown from "./LeaderboardDateCountdown";
import LeaderboardDateSelection from "./LeaderboardDateSelection";
import LeaderboardUserRanking from "./LeaderboardUserRanking";
import LeaderboardItem from "./LeaderboardItem";
import Loading from "../../common/loading";

/** 排行榜單 */
const LeaderboardRankingList = () => {
	const {
		getFormattedUpdateTime,
		isLogin,

		rankList,
		loading
	} = useLeaderBoard();

	const { t } = useTranslation();

	return (
		<div className="leaderboard-ranking">
			<LeaderboardDateCountdown />
			<div className="board">
				<LeaderboardDateSelection />
				<div className="winner-total">
					{loading ? (
						<Loading />
					) : (
						<LeaderboardItem rankList={rankList} />
					)}

					{/* 確認登入並且有 userRank 資料才顯示使用者排名 */}
					{isLogin ? <LeaderboardUserRanking /> : null}
				</div>
				{/* 每 30 entries 刷新一次 */}
				<div className="board-refresh">
					{t("lbl_lastUpdateOn")}
					<span className="data">{getFormattedUpdateTime()}</span>
					{t("lbl_updateEvery30Minutes")}
				</div>
			</div>
		</div>
	);
};

/** 排行榜單 */
export default LeaderboardRankingList;
