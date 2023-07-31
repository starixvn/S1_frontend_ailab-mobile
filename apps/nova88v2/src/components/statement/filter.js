import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "@reach/router";
import { i18nContext } from "Context";
import { selectDateRange } from "../common/historyFilter";
import path from "../../path";

const quickPickList = [
	{ displayKey: "lbl_Today" },
	{ displayKey: "lbl_YesterDay" },
	{ displayKey: "lbl_ThisWeek" },
	{ displayKey: "lbl_LastWeek" },
	{ displayKey: "lbl_ThisMonth" }
];

export const Filter = ({ langId, defaultValue }) => {
	const { i18n } = useContext(i18nContext);
	const defaultIdx = quickPickList.findIndex(
		obj => obj.displayKey === defaultValue
	);
	const [selectedIdx, setSelectedIdx] = useState(defaultIdx);
	const navigate = useNavigate();

	if (defaultIdx === -1 && defaultValue) {
		navigate(`/${langId}/${path.statement.root}/`);
		return null;
	}

	const submitFilter = ({ startDate, endDate }) => {
		const toDateRangePage = ({ _startDate, _endDate }) => {
			navigate(
				`/${langId}/${path.statement.root}/${_startDate}to${_endDate}`
			);
		};

		const toByDayPage = ({ selDate }) => {
			navigate(`/${langId}/${path.statement.root}/${selDate}`);
		};
		if (startDate !== endDate) {
			toDateRangePage({
				_startDate: startDate,
				_endDate: endDate
			});
		} else {
			toByDayPage({
				selDate: startDate
			});
		}
	};

	const clickQuickSelect = idx => {
		setSelectedIdx(idx);

		if (selectedIdx !== idx) {
			const result = selectDateRange({ idx });
			submitFilter({
				startDate: result.startDate,
				endDate: result.endDate
			});
		}
	};

	const quickSelectArr = quickPickList.map((item, i) => {
		return (
			<button
				key={`quickSelect-${item.displayKey}`}
				className={i === selectedIdx ? "active" : ""}
				onClick={clickQuickSelect.bind(this, i)}>
				{i18n[item.displayKey]}
			</button>
		);
	});
	return <div className="quickSelect">{quickSelectArr}</div>;
};

Filter.defaultProps = {
	langId: "",
	defaultValue: ""
};

Filter.propTypes = {
	langId: PropTypes.string,
	defaultValue: PropTypes.string
};
