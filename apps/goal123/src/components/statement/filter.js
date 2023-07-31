import React, { useState, useContext } from "react";
import moment from "moment";
import { i18nContext } from "Context";
import Dropdown from "../common/dropdown.icon";
import { selectDateRange } from "../common/historyFilter";

const quickPickList = [
	{ displayKey: "lbl_Today" },
	{ displayKey: "lbl_YesterDay" },
	{ displayKey: "lbl_ThisWeek" },
	{ displayKey: "lbl_LastWeek" },
	{ displayKey: "lbl_ThisMonth" }
];

export const Filter = ({ submitHandler }) => {
	const { i18n } = useContext(i18nContext);
	const [selectedIdx, setSelectedIdx] = useState(0);
	const today = moment().format("YYYY-MM-DD");
	const [dateRange, setDateRange] = useState({
		startDate: today,
		endDate: today
	});

	const dropdownHandler = idx => {
		setSelectedIdx(idx);

		if (selectedIdx !== idx) {
			const result = selectDateRange({ idx });
			setDateRange({
				startDate: result.startDate,
				endDate: result.endDate
			});
		}
	};

	return (
		<>
			<div className="inputBox">
				<Dropdown
					i18n={i18n}
					mainKey="deposit-history-quickPick"
					options={quickPickList}
					selectedIdx={selectedIdx}
					icon="icon icon-calendar"
					onSelectItem={dropdownHandler}
				/>
			</div>

			<div className="btn-group">
				<button
					className="lightBlue switch"
					onClick={submitHandler.bind(
						this,
						dateRange.startDate,
						dateRange.endDate
					)}>
					{i18n.lbl_Submit}
				</button>
			</div>
		</>
	);
};
