import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { i18nContext } from "Context";
import moment from "moment";

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

	const clickQuickSelect = idx => {
		if (selectedIdx !== idx) {
			setSelectedIdx(idx);

			const result = selectDateRange({ idx });
			setDateRange({
				startDate: result.startDate,
				endDate: result.endDate
			});
		}
	};

	const EditField = (col, e) => {
		const val = e.target.value;
		setDateRange(prev => ({ ...prev, [col]: val }));
	};

	const scrollRight = () => {
		const quickSelect = document.querySelector(".quickSelect");
		quickSelect.scrollTo({
			left: quickSelect.scrollLeft + 80,
			behavior: "smooth"
		});
	};

	const quickSelectArr = quickPickList.map((item, i) => {
		return (
			<button
				data-testid={`quick_btn_${item.displayKey}`}
				key={`quickSelect-${item.displayKey}`}
				className={i === selectedIdx ? "active" : ""}
				onClick={clickQuickSelect.bind(this, i)}>
				{i18n[item.displayKey]}
			</button>
		);
	});

	return (
		<>
			<div className="quickSelect">
				{quickSelectArr}
				<i
					className="icon icon-keyboard_arrow_right"
					onClick={scrollRight}
				/>
			</div>

			<div className="functionList">
				<div className="infoModule parts">
					<Inputbox
						onChange={EditField.bind(null, "startDate")}
						value={dateRange.startDate}
						max={moment().format("YYYY-MM-DD")}
					/>

					<i className="icon icon-icon32px_1" />

					<Inputbox
						onChange={EditField.bind(null, "endDate")}
						value={dateRange.endDate}
						max={moment().format("YYYY-MM-DD")}
					/>

					<div className="btn-group">
						<button
							data-testid="submit-history-filter"
							onClick={submitHandler.bind(this, {
								startDay: dateRange.startDate,
								endDay: dateRange.endDate,
								isUnix: false
							})}>
							{i18n.lbl_Submit}
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

Panel.propTypes = {
	submitHandler: PropTypes.func.isRequired
};

export const selectDateRange = ({ idx }) => {
	const _displayKey = quickPickList[idx].displayKey;

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

	return { startDate, endDate };
};

const Inputbox = ({ value, onChange, max }) => {
	return (
		<div className="inputBox">
			<i className="icon icon-calendar" />
			<input
				type="date"
				data-testid="dateIpt"
				value={value}
				onChange={onChange}
				max={max}
			/>
		</div>
	);
};

Inputbox.defaultProps = {
	value: null,
	max: ""
};

Inputbox.propTypes = {
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	onChange: PropTypes.func.isRequired,
	max: PropTypes.string
};

export default Panel;
