import React, { useState, useContext } from "react";
import { i18nContext } from "Context";
import moment from "moment";
import Dropdown from "../common/dropdown.icon";
import Inputbox from "../common/inputbox";

const quickPickList = [
	{ displayKey: "lbl_Today" },
	{ displayKey: "lbl_YesterDay" },
	{ displayKey: "lbl_ThisWeek" },
	{ displayKey: "lbl_LastWeek" },
	{ displayKey: "lbl_ThisMonth" },
	{ displayKey: "lbl_LastMonth" }
];

const Panel = ({ submitHandler }) => {
	const { i18n } = useContext(i18nContext);
	const [selectedIdx, setSelectedIdx] = useState(0);
	const today = moment().format("YYYY-MM-DD");
	const [dateRange, setDateRange] = useState({
		startDate: today,
		endDate: today
	});

	const dropdownHandler = idx => {
		if (selectedIdx !== idx) {
			setSelectedIdx(idx);

			let result = selectDateRange({ idx: idx });
			setDateRange({
				startDate: result.startDate,
				endDate: result.endDate
			});
		}
	};

	const EditField = (col, e) => {
		let val = e.target.value;
		setDateRange(prev => ({ ...prev, [col]: val }));
	};

	return (
		<>
			<div className="inputBox">
				<Dropdown
					i18n={i18n}
					mainKey="history-quickPick"
					options={quickPickList}
					selectedIdx={selectedIdx}
					icon="icon icon-calendar"
					onSelectItem={dropdownHandler}
				/>
			</div>

			<div className="inputBox parts">
				<Inputbox
					icon="icon-calendar"
					inputType="date"
					onChange={EditField.bind(null, "startDate")}
					value={dateRange.startDate}
					max={moment().format("YYYY-MM-DD")}
				/>

				<Inputbox
					icon="icon-calendar"
					inputType="date"
					onChange={EditField.bind(null, "endDate")}
					value={dateRange.endDate}
					max={moment().format("YYYY-MM-DD")}
				/>
			</div>

			<div className="btn-group">
				<button
					className="orange switch"
					onClick={submitHandler.bind(
						this,
						dateRange.startDate,
						dateRange.endDate,
						false
					)}>
					{i18n["lbl_Submit"]}
				</button>
			</div>
		</>
	);
};

export default Panel;

export const selectDateRange = ({ idx }) => {
	let _displayKey = quickPickList[idx].displayKey;

	let startDate = "";
	let endDate = "";

	if (_displayKey === "lbl_Today") {
		startDate = moment().format("YYYY-MM-DD");
		endDate = moment().format("YYYY-MM-DD");
	} else if (_displayKey === "lbl_YesterDay") {
		startDate = moment().subtract(1, "days").format("YYYY-MM-DD");
		endDate = moment().subtract(1, "days").format("YYYY-MM-DD");
	} else if (_displayKey === "lbl_ThisWeek") {
		startDate = moment().startOf("week").format("YYYY-MM-DD");
		endDate = moment().format("YYYY-MM-DD");
	} else if (_displayKey === "lbl_LastWeek") {
		startDate = moment()
			.subtract(1, "weeks")
			.startOf("week")
			.format("YYYY-MM-DD");
		endDate = moment()
			.subtract(1, "weeks")
			.endOf("week")
			.format("YYYY-MM-DD");
	} else if (_displayKey === "lbl_ThisMonth") {
		startDate = moment().startOf("month").format("YYYY-MM-DD");
		endDate = moment().format("YYYY-MM-DD");
	} else if (_displayKey === "lbl_LastMonth") {
		startDate = moment()
			.subtract(1, "months")
			.startOf("month")
			.format("YYYY-MM-DD");
		endDate = moment()
			.subtract(1, "months")
			.endOf("month")
			.format("YYYY-MM-DD");
	}

	return { startDate: startDate, endDate: endDate };
};
