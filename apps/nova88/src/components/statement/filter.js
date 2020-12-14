import React, { useState, useContext } from "react";
import { i18nContext } from "Context";
import moment from "moment";
import Dropdown from "../common/dropdown.icon";

const quickPickList = [
	{ displayKey: "lbl_Today" },
	{ displayKey: "lbl_YesterDay" },
	{ displayKey: "lbl_ThisWeek" },
	{ displayKey: "lbl_LastWeek" }
];

export const Filter = props => {
	const { i18n } = useContext(i18nContext);
	const [quickPickSelectedIdx, setquickPickSelectedIdx] = useState(0);

	const today = moment().format("YYYY-MM-DD");
	const [startDayState, setStartDayState] = useState(today);
	const [endDayState, setEndDatyState] = useState(today);
	const [dateRangeDisplayKey, setDateRangeDisplayKey] = useState(
		quickPickList[0].displayKey
	);

	let startDate = "";
	let endDate = "";

	const dropdownStateHandler = i => {
		setquickPickSelectedIdx(i);

		if (i === 0) {
			startDate = moment().format("YYYY-MM-DD");
			endDate = moment().format("YYYY-MM-DD");
		} else if (i === 1) {
			startDate = moment().subtract(1, "days").format("YYYY-MM-DD");
			endDate = moment().subtract(1, "days").format("YYYY-MM-DD");
		} else if (i === 2) {
			startDate = moment().startOf("week").format("YYYY-MM-DD");
			endDate = moment().format("YYYY-MM-DD");
		} else if (i === 3) {
			startDate = moment()
				.subtract(1, "weeks")
				.startOf("week")
				.format("YYYY-MM-DD");
			endDate = moment()
				.subtract(1, "weeks")
				.endOf("week")
				.format("YYYY-MM-DD");
		} else {
			startDate = moment()
				.subtract(1, "months")
				.startOf("month")
				.format("YYYY-MM-DD");
			endDate = moment()
				.subtract(1, "months")
				.endOf("month")
				.format("YYYY-MM-DD");
		}

		setStartDayState(startDate);
		setEndDatyState(endDate);
		setDateRangeDisplayKey(quickPickList[i].displayKey);
	};

	return (
		<>
			<div className="inputBox">
				<Dropdown
					i18n={i18n}
					mainKey="deposit-history-quickPick"
					options={quickPickList}
					selectedIdx={quickPickSelectedIdx}
					icon="icon icon-calendar"
					onSelectItem={dropdownStateHandler}
				/>
			</div>

			<div className="btn-group">
				<button
					className="orange switch"
					onClick={props.submitHandler.bind(
						this,
						startDayState,
						endDayState,
						dateRangeDisplayKey
					)}>
					{i18n["lbl_Submit"]}
				</button>
			</div>
		</>
	);
};

export const getDateRange = (startDate, endDate) => {
	const today = moment().format("YYYY-MM-DD");
	const thisWeekStart = moment().startOf("week").format("YYYY-MM-DD");
	const lastWeekStart = moment()
		.subtract(1, "weeks")
		.startOf("week")
		.format("YYYY-MM-DD");
	const lastWeekEnd = moment()
		.subtract(1, "weeks")
		.endOf("week")
		.format("YYYY-MM-DD");
	let idx = 0;

	if (startDate === endDate) {
		idx = startDate === today ? 0 : 1;
	} else {
		if (
			moment(startDate).isBetween(
				thisWeekStart,
				today,
				undefined,
				"[]"
			) &&
			moment(endDate).isBetween(thisWeekStart, today, undefined, "[]")
		) {
			idx = 2;
		} else if (
			moment(startDate).isBetween(
				lastWeekStart,
				lastWeekEnd,
				undefined,
				"[]"
			) &&
			moment(endDate).isBetween(
				lastWeekStart,
				lastWeekEnd,
				undefined,
				"[]"
			)
		) {
			idx = 3;
		} else {
			return "lbl_Other";
		}
	}

	return quickPickList[idx].displayKey;
};
