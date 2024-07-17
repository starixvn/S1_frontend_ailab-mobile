import React, { useState, useRef, useEffect } from "react";
import classNames from "classnames";
import { useLeaderBoard } from "@ailab-mobile/common";
import { useTranslation } from "react-i18next";

/** 月份 i18n */
const LEADER_BOARD_MONTHS = Object.freeze({
	1: "lbl_Month_1",
	2: "lbl_Month_2",
	3: "lbl_Month_3",
	4: "lbl_Month_4",
	5: "lbl_Month_5",
	6: "lbl_Month_6",
	7: "lbl_Month_7",
	8: "lbl_Month_8",
	9: "lbl_Month_9",
	10: "lbl_Month_10",
	11: "lbl_Month_11",
	12: "lbl_Month_12"
});

/** 日期選擇 */
const LeaderboardDateSelection = () => {
	const { t } = useTranslation();
	const {
		pastMonths,
		pastYears,
		onSelectedDateId,
		currentYear,
		currentMonth
	} = useLeaderBoard();

	// =================== 狀態 ===================

	/** 選擇的年份 */
	const [selectedYear, setSelectedYear] = useState(currentYear);

	/** 選擇的月份 */
	const [selectedMonth, setSelectedMonth] = useState(currentMonth);

	/** 是否開啟年份選單 */
	const [isShowYearSelect, setIsShowYearSelect] = useState(false);

	/** 是否開啟月份選單 */
	const [isShowMonthSelect, setIsShowMonthSelect] = useState(false);

	// =================== Ref ===================

	/** yearRef */
	const yearRef = useRef(null);

	/** monthRef */
	const monthRef = useRef(null);

	// =================== 函數 ===================

	/** 處理年份選擇 */
	const handleYearSelectClick = year => {
		setSelectedYear(year);
		const selectedDateId = `${year}-${currentMonth}`;
		onSelectedDateId(selectedDateId);
		setIsShowYearSelect(false);
	};

	/** 處理月份選擇 */
	const handleMonthSelectClick = month => {
		setSelectedMonth(month);
		const selectedDateId = `${selectedYear}-${month}`;
		onSelectedDateId(selectedDateId);
		setIsShowMonthSelect(false);
	};

	/** 點擊外部時收合選單 */
	const handleClickOutside = event => {
		/**
		 * 檢查是否點擊在 ref 外部
		 * @param ref 需要檢查的 ref
		 * @returns  如果點擊在 ref 外部，return true；否則 return false */
		const isOutsideClick = ref =>
			ref.current && !ref.current.contains(event.target);

		// 如果點擊在年份選擇框外部，收合年份選擇框
		if (isOutsideClick(yearRef)) {
			setIsShowYearSelect(false);
		}

		// 如果點擊在月份選擇框外部，收合月份選擇框
		if (isOutsideClick(monthRef)) {
			setIsShowMonthSelect(false);
		}
	};

	/** 監聽滑鼠點擊 */
	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div className="board-top">
			<div className="title">{t("lbl_Ranking")}</div>
			<div className="select-period">
				<div className="select-years" ref={yearRef}>
					<div
						className={classNames("select-btn", {
							active: isShowYearSelect
						})}
						onClick={() => setIsShowYearSelect(!isShowYearSelect)}>
						{selectedYear}
					</div>
					{isShowYearSelect && (
						<div className="option-menu">
							{pastYears.map(year => (
								<div
									onClick={() => handleYearSelectClick(year)}
									className="option-list"
									key={year}>
									{year}
								</div>
							))}
						</div>
					)}
				</div>
				<div className="select-month" ref={monthRef}>
					<div
						className={classNames("select-btn", {
							active: isShowMonthSelect
						})}
						onClick={() =>
							setIsShowMonthSelect(!isShowMonthSelect)
						}>
						{t(LEADER_BOARD_MONTHS[selectedMonth])}
					</div>
					{isShowMonthSelect && (
						<div className="option-menu">
							{pastMonths.map(month => (
								<div
									onClick={() =>
										handleMonthSelectClick(month)
									}
									className="option-list"
									key={month}>
									{t(LEADER_BOARD_MONTHS[month])}
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

/** 日期選擇 */
export default LeaderboardDateSelection;
