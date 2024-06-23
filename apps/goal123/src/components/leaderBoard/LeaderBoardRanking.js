import { useTranslation } from "react-i18next";
import React, { useContext, useState } from "react";
import moment from "moment";
import { products } from "@ailab-mobile/common";
import {
	useGetCustRankMonthQuery,
	useGetLeaderBoardListMonthQuery
} from "@ailab-mobile/service";
import {
	generateYearMonthList,
	getFormattedUpdateTime,
	LEADER_BOARD_EVENT_CODE,
	LEADER_BOARD_RANK_NUM
} from "./constants/generator";
import { formattedDate } from "./utils/tools";
import { useMenu } from "../hook/useMenu";
import LeaderboardDropdown from "./components/dropdown";
import { bannerImgUrl } from "../../config";
import { userInfoContext } from "../common/context";

const LeaderBoardRanking = () => {
	const { t } = useTranslation();
	const [selectedDate, setSelectedDate] = useState(
		// 最後一個物件是最接近今天的時間
		() => generateYearMonthList()?.slice(-1)[0]
	);
	const { onClickProductItem } = useMenu();
	const { userInfo } = useContext(userInfoContext);

	const {
		data: { data: usersRankingList = [] } = {}
	} = useGetLeaderBoardListMonthQuery({
		lBCategoryId: 0,
		TopNum: LEADER_BOARD_RANK_NUM.monthly,
		SelectDays: formattedDate(selectedDate),
		EventCode: LEADER_BOARD_EVENT_CODE.monthly
	});

	const { data: { data: userRankingData } = {} } = useGetCustRankMonthQuery(
		{
			lBCategoryId: 0,
			SelectDays: formattedDate(selectedDate),
			EventCode: LEADER_BOARD_EVENT_CODE.monthly
		},
		{ skip: !userInfo.isLogin }
	);

	const mergedRankingWithUserRankingData = {
		...userRankingData,
		ranking:
			userRankingData?.custRank > 999 || userRankingData?.custRank === 0
				? "999+"
				: userRankingData?.custRank
	};

	const handleSelectedDate = date => {
		setSelectedDate(prev => ({ ...prev, [date.type]: date.value }));
	};
	const daysUntilEndOfMonth = () => {
		// 當前日期和時間
		const now = moment();

		// 本月底的日期和時間
		const endOfMonth = moment().endOf("month");

		// 計算剩餘的毫秒數
		const duration = moment.duration(endOfMonth.diff(now));

		// 格式化為天、時、分、秒
		const days = Math.floor(duration.asDays());
		const hours = duration.hours();
		const minutes = duration.minutes();
		const seconds = duration.seconds();

		return { days, hours, minutes, seconds };
	};

	return (
		<div className="leaderboard-ranking">
			<div className="countdown">
				<div className="countdown-item">
					<div className="title">
						{t("lbl_Leaderboard_Remaining_Time")}
					</div>
					<div className="countdown-time">
						<div className="list">
							<span>{daysUntilEndOfMonth().days}</span>
							{t("lbl_Days")}
						</div>
						<div className="list">
							<span>{daysUntilEndOfMonth().hours}</span>
							{t("lbl_Hours")}
						</div>
						<div className="list">
							<span>{daysUntilEndOfMonth().minutes}</span>
							{t("lbl_Minutes")}
						</div>
						<div className="list">
							<span>{daysUntilEndOfMonth().seconds}</span>
							{t("lbl_Seconds")}
						</div>
					</div>
				</div>
				<button
					onClick={() => onClickProductItem(products.Soccer)}
					className="btn-bet">
					{t("lbl_BetNow")}
				</button>
			</div>
			<div className="board">
				<div className="board-top">
					<div className="title">{t("lbl_Ranking")}</div>
					<div className="select-period">
						<LeaderboardDropdown
							type="year"
							className="select-years"
							selectedDate={selectedDate}
							options={generateYearMonthList()}
							handleSelectedDate={handleSelectedDate}
						/>
						<LeaderboardDropdown
							type="month"
							className="select-month"
							selectedDate={selectedDate}
							options={generateYearMonthList()}
							handleSelectedDate={handleSelectedDate}
						/>
					</div>
				</div>
				<div className="winner-total">
					<div className="user-thead">
						<div className="left">
							<span>{t("lbl_Rank")}</span>
							<span>{t("lbl_Username")}</span>
						</div>
						<div className="right">
							<span>{t("lbl_Leaderboard_Point")}</span>
						</div>
					</div>
					<div className="user-ranking">
						{/* 前三名 */}
						{usersRankingList
							?.slice(0, 3)
							?.map((userRanking, index) => {
								return (
									<div className="user-list top">
										<div className="left">
											<div className="order">
												<img
													src={`${bannerImgUrl}/h5/img/home-page/leaderboard/winner-${
														index + 1
													}.png`}
													alt="top-winner"
												/>
											</div>
											<div className="user-id">
												{userRanking?.userName}
											</div>
										</div>
										<div className="right">
											<i className="icon-cash" />
											<span>
												${userRanking?.wTurnover}
											</span>
										</div>
									</div>
								);
							})}
						{/* 三名以後(不包含三) */}
						{usersRankingList
							?.slice(3)
							?.map((userRanking, index) => {
								return (
									<div className="user-list">
										<div className="left">
											<div className="order">
												{index + 4}
											</div>
											<div className="user-id">
												{userRanking?.userName}
											</div>
										</div>
										<div className="right">
											<i className="icon-cash" />
											<span>
												${userRanking?.wTurnover}
											</span>
										</div>
									</div>
								);
							})}
					</div>
					{userInfo?.isLogin && (
						<div className="user-themselves">
							<div className="left">
								<i className="icon-arrow" />
								<div className="order">
									{/* 前三名顯示 img 獎牌 */}
									{mergedRankingWithUserRankingData?.ranking <=
									3 ? (
										<img
											src={`${bannerImgUrl}/h5/img/home-page/leaderboard/winner-${mergedRankingWithUserRankingData?.ranking}.png`}
											alt="user-themselves"
										/>
									) : (
										mergedRankingWithUserRankingData?.ranking
									)}
								</div>
								<div className="user-id">
									{userInfo.userName}
								</div>
							</div>
							<div className="right">
								<i className="icon-cash" />
								<span>
									{" "}
									${mergedRankingWithUserRankingData?.point}
								</span>
							</div>
						</div>
					)}
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
