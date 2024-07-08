import React from "react";
import { useTranslation } from "react-i18next";
import { useLeaderBoard } from "@ailab-mobile/common";

/** 名次物件 */
const RANK = Object.freeze({
	1: "top-1",
	2: "top-2",
	3: "top-3",
	"4-11": "4-11th",
	"12-19": "12-19th",
	"20-100": "20-100th"
});

const LeaderBoardReward = () => {
	const { t } = useTranslation();
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
	const divideMillion = number => Math.floor(number / 1000000).toFixed(0);

	return (
		<div className="leaderboard-reward">
			<div className="reward-left">
				{/* 前三名 */}
				{sortedLeaderboardRankingBonus
					?.slice(0, TOP3_COUNT)
					?.map(item => {
						return (
							<div className="item">
								<img
									src={`https://banner.goal123.org/h5/img/leaderboard/top-${item?.ranking}.png`}
									alt="leaderboard-top"
								/>
								<div className="text">
									<div className="text-ranking">
										{t(
											`lbl_LeaderBoard_Reward_Ranking_${item?.ranking}`
										)}
									</div>
									<div className="data-number">
										{divideMillion(item?.bonus ?? 0)}
									</div>
									<div className="text-unit">
										{t("lbl_Leaderboard_Million_Dong")}
									</div>
								</div>
							</div>
						);
					})}
			</div>
			<div className="reward-right">
				{/* 三名以後(不包含三) */}
				{sortedLeaderboardRankingBonus?.slice(3)?.map(item => {
					return (
						<div className="item">
							<div className="text">
								<div className="text-ranking">
									{t(
										`lbl_LeaderBoard_Reward_Ranking_${item?.ranking}`
									)}
								</div>
								<div className="data-number">
									{divideMillion(item?.bonus ?? 0)}
								</div>
								<div className="text-unit">
									{t("lbl_Leaderboard_Million_Dong")}
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default LeaderBoardReward;
