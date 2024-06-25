/* eslint-disable import/no-extraneous-dependencies */
import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import { find } from "lodash";
import moment from "moment";
import {
	// RTK Query API
	useGetLeaderboardSettingQuery,
	useGetLeaderBoardListMonthQuery,
	useGetCustRankMonthQuery
} from "@ailab-mobile/service";

/** 創建上下文 */
export const LeaderboardContext = createContext(null);

/** 自定義 hook 來使用上下文 */
export const useLeaderBoard = () => {
	return useContext(LeaderboardContext);
};

// =================== 對內函數 ===================

/** 定義日期格式化函數 */
const formatDate = date => date.format("YYYY-MM-DD");

/** 檢查 currentMonth 是否小於 10，如果是，則在前面加上 '0'，否則返回原數字 */
const formatMonth = currentMonth => {
	if (currentMonth < 10) {
		return `0${currentMonth}`;
	}
	return currentMonth;
};

/**
 * 獲取兩個日期之間的月份列表
 * @param startDate 開始日期
 * @param endDate 結束日期 */
const getMonthsBetween = (startDate, endDate) => {
	const diff = endDate.diff(startDate, "months");
	return Array.from({ length: diff + 1 }, (_, index) =>
		startDate.clone().add(index, "months")
	);
};

/** 獲取今年已過的月份列表 */
const getMonthDataList = () => {
	/** 過去的資料已經不可獲取,故以現年為查詢起點 */
	const currentYear = moment().year();
	const initDate = moment(`${currentYear}-01-01`);
	const currentDate = moment();
	const months = getMonthsBetween(initDate, currentDate);
	const monthDataList = months
		.map(date => {
			const month = date.month() + 1;
			const year = date.year();
			const startDate = formatDate(date.startOf("month"));
			const endDate = formatDate(date.endOf("month"));
			return {
				id: `${year}-${month}`,
				year,
				startDate,
				endDate
			};
		})
		.sort((a, b) =>
			moment(a.startDate).isAfter(moment(b.startDate)) ? 1 : -1
		);
	return monthDataList;
};

/** 獲取排行榜列表更新時間（ 更新整點的前30分鐘 ）
 *  ex: 現在 2024/11/11 10:16:00 ＝> 2024/11/11 10:00:00 */
const getFormattedUpdateTime = () => {
	const now = moment();
	const startOfHour = moment().startOf("hour");
	const threshold = startOfHour.clone().add(30, "minutes");
	const displayTime = now.isAfter(threshold) ? threshold : startOfHour;
	return displayTime.format("YYYY/MM/DD HH:mm:ss");
};

// =================== 常數 ===================

/** 今年已過的月份列表 */
const monthDataList = getMonthDataList();

/** 當前年份 */
const currentYear = moment().year();

/** 當前月份 */
const currentMonth = moment().month() + 1;

/** 排行榜上限值 */
const MAX_RANK = 100;

/** 首頁的排行榜上限值 */
const HOME_MAX_RANK = 10;

/** bwing 的排行版種類，其他專案可能會有不同種類 */
const LEADER_BOARD_TYPE = 0;

/** 活動初始年份 */
const initYear = 2024;

/** 今年已過的月份的陣列，從小到大排序，
 *  活動是從 2024/7 開始，故只取 2024/7 之後的月份，
 *  2024 年以後就回傳已過的月份陣列，從小到大排序，
 *  ex: now 2024/9 return [7, 8, 9]
 *  ex: now 2025/5 return [1, 2, 3, 4, 5] */
const pastMonths = (() => {
	const startMonth = currentYear === initYear ? 7 : 1;
	return Array.from(
		{ length: currentMonth - startMonth + 1 },
		(_, index) => startMonth + index
	);
})();

/** 已過的年份的陣列(從 2024 開始)，從小到大排序 */
const pastYears = (() => {
	const yearsCount = currentYear - initYear + 1;
	const years = Array.from(
		{ length: yearsCount },
		(_, index) => initYear + index
	);
	return years.sort((a, b) => a - b); // 排序從小到大
})();

// =================== LeaderboardProvider ===================

/** LeaderBoard 的 context provider
 *  日期計算的邏輯,
 *  獲取排行榜列表的 API 呼叫 */
const LeaderboardProvider = ({ siteId, userInfo, children }) => {
	/** 當前選中月份跟日期 ID ex: 2024-4 並初始化月份 */
	const [selectedDateId, setSelectedDateId] = useState(
		() => monthDataList[monthDataList.length - 1]?.id
	);

	const { isLogin, langId, userName } = userInfo || {};

	const args = {
		lBCategoryId: LEADER_BOARD_TYPE,
		TopNum: MAX_RANK,
		SelectDays: find(monthDataList, { id: selectedDateId })?.startDate ?? ""
	};

	// =================== api ===================

	/** 積分資料 */
	const {
		data: { data: leaderBoardSettingResponseData } = {}
	} = useGetLeaderboardSettingQuery({
		siteId,
		currencyId: 51
	});

	/** 首頁的排行榜列表 */
	const {
		data: { data: homeRankList = [] } = {}
	} = useGetLeaderBoardListMonthQuery({
		lBCategoryId: LEADER_BOARD_TYPE,
		TopNum: HOME_MAX_RANK,
		SelectDays: `${currentYear}-${formatMonth(currentMonth)}-01`
	});

	/** 排名資料 */
	const {
		data: { data: rankList = [] } = {},
		isFetching: isGetLeaderBoardListMonthFetching
	} = useGetLeaderBoardListMonthQuery(args);

	/** 使者排名資料 */
	const {
		data: { data: userRank } = {},
		isFetching: isGetCustRankFetching
	} = useGetCustRankMonthQuery(
		{
			LBCategoryId: args.lBCategoryId,
			SelectDays: args.SelectDays
		},
		{ skip: !userInfo.isLogin }
	);

	const mergedUserRankWithUserName = {
		...userRank,
		custRank:
			userRank?.custRank > MAX_RANK || userRank?.custRank === 0
				? "100+"
				: userRank?.custRank,
		userName
	};

	// =================== 對外函數 ===================

	/**
	 * 處理當前選中日期變更
	 * @param newSelectedDateId 使用者選取的日期 ex : 2024-1 */
	const onSelectedDateId = newSelectedDateId => {
		if (newSelectedDateId !== selectedDateId) {
			setSelectedDateId(newSelectedDateId);
		}
	};

	/** 加載狀態 */
	const loading = isGetLeaderBoardListMonthFetching || isGetCustRankFetching;

	/** 傳遞的資料物件 */
	const value = {
		isLogin,
		rankList,
		homeRankList,
		userRank: mergedUserRankWithUserName,
		loading,
		langId,
		currentYear,
		leaderBoardSettingResponseData,
		currentMonth,
		pastMonths,
		pastYears,
		getFormattedUpdateTime,
		onSelectedDateId
	};

	return (
		<LeaderboardContext.Provider value={value}>
			{children}
		</LeaderboardContext.Provider>
	);
};

export { LeaderboardProvider };

LeaderboardProvider.propTypes = {
	siteId: PropTypes.number.isRequired,
	userInfo: PropTypes.object.isRequired,
	children: PropTypes.node.isRequired
};
