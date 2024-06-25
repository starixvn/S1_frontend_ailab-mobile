/* eslint-disable import/no-extraneous-dependencies */
import React, { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { find } from "lodash";
import moment from "moment";
import {
	// RTK Query API
	useGetLeaderboardSettingQuery,
	useLazyGetLeaderBoardListMonthQuery,
	useLazyGetCustRankMonthQuery
} from "@ailab-mobile/service";
import { siteId } from "../../../config";
import { userInfoContext } from "../../common/context";

/** 創建上下文 */
export const LeaderboardContext = createContext(null);

/** 自定義 hook 來使用上下文 */
export const useLeaderBoard = () => {
	return useContext(LeaderboardContext);
};

// =================== 對內函數 ===================

/** 定義日期格式化函數 */
const formatDate = date => date.format("YYYY-MM-DD");

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

/** bwing 的排行版種類，其他專案可能會有不同種類 */
const LEADER_BOARD_TYPE = 0;

/** 今年已過的月份的陣列，從小到大排序 */
const pastMonths = (() => {
	return Array.from({ length: currentMonth }, (_, index) => index + 1);
})();

/** 已過的年份的陣列(從 2024 開始)，從小到大排序 */
const pastYears = (() => {
	const initYear = 2024;
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
export const LeaderboardProvider = ({ children }) => {
	// =================== api ===================

	const [
		getLeaderBoardListMonth,
		{ isFetching: isGetLeaderBoardListMonthFetching }
	] = useLazyGetLeaderBoardListMonthQuery();

	const [
		getCustRankMonth,
		{ isFetching: isGetCustRankFetching }
	] = useLazyGetCustRankMonthQuery();

	// =================== 常數 ===================

	const { userInfo } = useContext(userInfoContext);
	const { userName, isLogin, currencyId, langId } = userInfo;

	/** 積分資料 */
	const {
		data: { data: leaderBoardSettingResponseData } = {}
	} = useGetLeaderboardSettingQuery({
		siteId,
		currencyId
	});

	/** 加載狀態 */
	const loading = isGetLeaderBoardListMonthFetching || isGetCustRankFetching;

	// =================== 狀態 ===================

	/** 本月倒數時間 */
	const [timeLeft, setTimeLeft] = useState({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0
	});

	/** 排行榜列表 */
	const [rankList, setRankList] = useState([]);

	/** 當前選中月份跟日期 ID ex: 2024-4 */
	const [selectedDateId, setSelectedDateId] = useState("");

	/** 使用者排名資料 */
	const [userRank, setUserRank] = useState({});

	// =================== 對外函數 ===================

	/**
	 * 獲取使用者選取的日期排名資料
	 * @param newSelectedDateId 使用者選取的日期 ex : 2024-1 */
	const getRankMonthData = async newSelectedDateId => {
		const args = {
			lBCategoryId: LEADER_BOARD_TYPE,
			TopNum: MAX_RANK,
			SelectDays:
				find(monthDataList, { id: newSelectedDateId })?.startDate ?? ""
		};

		try {
			const {
				data: leaderBoardListMonth
			} = await getLeaderBoardListMonth(args).unwrap();

			if (leaderBoardListMonth.length > 0) {
				setRankList(leaderBoardListMonth);

				// 未登入時，不打 getCustRankMonth
				if (!isLogin) return;
				const {
					data: { data: { custRank = 0, point = 0 } = {} } = {}
				} = await getCustRankMonth({
					LBCategoryId: args.lBCategoryId,
					SelectDays: args.SelectDays
				});

				// 使用者排名位於百名內顯示名次，超過百名顯示 100+
				const rank =
					custRank > MAX_RANK || custRank === 0 ? "100+" : custRank;

				setUserRank({ rank, userName, point });
			} else {
				setRankList([]);
			}
		} catch (error) {
			setRankList([]);
		}
	};

	/**
	 * 處理當前選中日期變更
	 * @param newSelectedDateId 使用者選取的日期 ex : 2024-1 */
	const onSelectedDateId = newSelectedDateId => {
		if (newSelectedDateId !== selectedDateId) {
			setSelectedDateId(newSelectedDateId);
			getRankMonthData(newSelectedDateId);
		}
	};

	// =================== useEffect ===================

	/** 初始化拿月份資料 */
	useEffect(() => {
		const initData = async () => {
			const initMonthId = monthDataList[monthDataList.length - 1]?.id;
			await getRankMonthData(initMonthId);
		};
		initData();
	}, [userName]);

	/** 計算離本月結算的倒數時間 */
	useEffect(() => {
		const calculateTimeLeft = () => {
			const now = moment();
			const endOfMonth = moment().endOf("month");
			const diff = endOfMonth.diff(now);
			const seconds = Math.floor((diff / 1000) % 60);
			const minutes = Math.floor((diff / 1000 / 60) % 60);
			const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
			const days = Math.floor(diff / (1000 * 60 * 60 * 24));

			setTimeLeft({
				days,
				hours,
				minutes,
				seconds
			});
		};
		const interval = setInterval(calculateTimeLeft, 1000);
		return () => clearInterval(interval);
	}, []);

	/** 傳遞的資料物件 */
	const value = {
		isLogin,
		rankList,
		userRank,
		loading,
		langId,
		currentYear,
		timeLeft,
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

LeaderboardProvider.propTypes = {
	children: PropTypes.node.isRequired
};
