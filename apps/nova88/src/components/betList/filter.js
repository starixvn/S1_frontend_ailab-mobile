import React, { useState, useContext } from "react";
import { i18nContext } from "Context";
import moment from "moment";
import Dropdown from "../common/dropdown.icon";

const quickPickList = [
	{ displayKey: "lbl_Today" },
	{ displayKey: "lbl_YesterDay" },
	{ displayKey: "lbl_ThisWeek" },
	{ displayKey: "lbl_LastWeek" },
	{ displayKey: "lbl_LastMonth" }
];

const Panel = props => {
	const { i18n } = useContext(i18nContext);
	const [quickPickSelectedIdx, setquickPickSelectedIdx] = useState(0);

	const today = moment().format("YYYY-MM-DD");
	const [startDayState, setStartDayState] = useState(today);
	const [endDayState, setEndDatyState] = useState(today);
	const [dateRange, setDateRange] = useState({
		displayKey: quickPickList[0].displayKey,
		path: `TimePeriod=${startDayState}To${endDayState}`
	});

	let startDate = "";
	let endDate = "";
	let betListPath = "";

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
		setDateRange({
			displayKey: quickPickList[i].displayKey
		});
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
						dateRange
					)}>
					{i18n["lbl_Submit"]}
				</button>
			</div>
		</>
	);
};

export default Panel;
