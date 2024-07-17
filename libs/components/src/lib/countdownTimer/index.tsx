import React, { useEffect, useState } from "react";
import moment from "moment/moment";

interface ITimeLeft {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
}

interface ICountdownTimerProps {
	endTime: string;
	renderHTMLCallback: (timeLeft: ITimeLeft) => JSX.Element;
}

/**
 * 驗證是否為有效的 ISO 8601 日期字符串
 * @param dateStr 要驗證的日期字符串
 * @return 是否為有效的 ISO 8601 日期字符串
 */
const isValidISO8601 = (dateStr: string): boolean => {
	const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?(?:Z|[+-]\d{2}:\d{2})?$/;
	return iso8601Regex.test(dateStr);
};

/**
 * 倒數計時組件
 * 接收一個結束時間，並根據當前時間計算剩餘時間，每秒更新一次。
 * @param {ISO8601String} endTime - 倒數計時的結束時間，格式為 ISO 8601 (例如 "2024-12-31T23:59:59")
 * @param {function} renderHTMLCallback - 傳入一個自定義的 HTML 結構函數，用於渲染剩餘時間
 * @return 使用自定義 HTML 結構包裹的倒數計時結果
 * @example
 * 使用範例:
 * const renderHTMLCallback = (timeLeft) => (
 *   <div>
 *     {timeLeft.days}天 {timeLeft.hours}小時 {timeLeft.minutes}分鐘 {timeLeft.seconds}秒
 *   </div>
 * );
 * <CountdownTimer endTime="2024-12-31T23:59:59" renderHTMLCallback={renderHTMLCallback} />
 */
export const CountdownTimer: React.FC<ICountdownTimerProps> = ({
	endTime,
	renderHTMLCallback
}) => {
	/** 初始化倒數時間狀態 */
	const [timeLeft, setTimeLeft] = useState<ITimeLeft>({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0
	});

	const [isValidEndTime, setIsValidEndTime] = useState(true);

	useEffect(() => {
		// 檢查 endTime 是否為有效的 ISO 8601 字符串
		if (!isValidISO8601(endTime)) {
			// eslint-disable-next-line no-console
			console.warn(
				"檢查 endTime 是否符合 ISO 8601 (例如 '2024-12-31T23:59:59') 您的傳入值為:",
				endTime
			);
			setIsValidEndTime(false);
			return;
		}

		setIsValidEndTime(true);

		/** 計算剩餘時間的函數 */
		const calculateTimeLeft = () => {
			const now = moment(); // 獲取當前時間
			const end = moment(endTime); // 將結束時間轉換為 moment 對象
			const diff = end.diff(now); // 計算結束時間與當前時間的差異

			// 計算剩餘的秒、分、時、天數
			const calSeconds = Math.floor((diff / 1000) % 60);
			const calMinutes = Math.floor((diff / 1000 / 60) % 60);
			const calHours = Math.floor((diff / (1000 * 60 * 60)) % 24);
			const calDays = Math.floor(diff / (1000 * 60 * 60 * 24));

			// 更新倒數時間狀態
			setTimeLeft({
				days: calDays,
				hours: calHours,
				minutes: calMinutes,
				seconds: calSeconds
			});
		};

		calculateTimeLeft(); // 初始化時立即計算一次剩餘時間
		const interval = setInterval(calculateTimeLeft, 1000); // 每秒更新一次剩餘時間

		// eslint-disable-next-line consistent-return
		return () => clearInterval(interval);
	}, [endTime]);

	// 如果 endTime 無效，則不渲染組件
	if (!isValidEndTime) {
		return null;
	}

	// 使用傳入的 render 函數來渲染組件
	return renderHTMLCallback(timeLeft);
};
