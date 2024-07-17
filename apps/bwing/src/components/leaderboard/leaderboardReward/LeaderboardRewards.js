import React from "react";
import { useLeaderBoard } from "@ailab-mobile/common";
import LeaderboardRewardItem from "./LeaderboardRewardItem";
import LeaderboardRewardTop3Item from "./LeaderboardRewardTop3Item";
import { numFormatToDigits } from "../../common/common";

/** 名次物件 */
const RANK = Object.freeze({
	1: "top-1",
	2: "top-2",
	3: "top-3",
	"4-9": "4-9th",
	"10-17": "10-17th",
	"18-100": "18-100th"
});

/** 排名獎勵 */
const LeaderboardRewards = () => {
	const { leaderBoardSettingResponseData } = useLeaderBoard();

	const { leaderboardRankingBonus = [] } =
		leaderBoardSettingResponseData ?? [];

	/** 前三名數量 */
	const TOP3_COUNT = 3;

	/**
	 * 名次資料 (照名次排序)，
	 * 後端陣列沒有照名次沒有排序，需要前端自行排序 */
	const sortedLeaderboardRankingBonus = [...leaderboardRankingBonus].sort(
		(a, b) => {
			const LEADER_BOARD_REWORD_RANK_ORDER = Object.keys(RANK);
			return (
				LEADER_BOARD_REWORD_RANK_ORDER.indexOf(a.ranking) -
				LEADER_BOARD_REWORD_RANK_ORDER.indexOf(b.ranking)
			);
		}
	);

	/** 轉百萬
	 *  @param {number} number 需要轉百萬的數字 */
	const convertToMillion = number => {
		const millionResult = number / 1000000;
		const result = numFormatToDigits(millionResult, 0);
		return result;
	};

	return (
		<div className="leaderboard-reward">
			<div className="reward-left">
				{/* 取前三名 */}
				{sortedLeaderboardRankingBonus
					.slice(0, TOP3_COUNT)
					.map(item => {
						const { ranking, bonus } = item;
						return (
							<LeaderboardRewardTop3Item
								key={ranking}
								ranking={ranking}
								bonus={bonus}
								convertToMillion={convertToMillion}
								RANK={RANK}
							/>
						);
					})}
			</div>
			<div className="reward-right">
				{/* 取前三名以後的 */}
				{sortedLeaderboardRankingBonus.slice(TOP3_COUNT).map(item => {
					const { ranking, bonus } = item;
					return (
						<LeaderboardRewardItem
							key={ranking}
							ranking={ranking}
							bonus={bonus}
							convertToMillion={convertToMillion}
						/>
					);
				})}
			</div>
		</div>
	);
};

/** 排名獎勵 */
export default LeaderboardRewards;
