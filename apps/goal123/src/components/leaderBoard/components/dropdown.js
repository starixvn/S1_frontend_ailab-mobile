import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { uniqueData } from "../utils/tools";

const TimeEnum = {
	YEAR: "year",
	MONTH: "month"
};

// 先暫不做共用，目前沒有發現可以共用的地方
const LeaderboardDropdown = ({
	type,
	className,
	selectedDate,
	options = [],
	handleSelectedDate
}) => {
	const { t } = useTranslation();
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef(null);

	const selectedTime = () => {
		const switchType = {
			[TimeEnum.YEAR]: () => selectedDate.year,
			[TimeEnum.MONTH]: () => t(`lbl_Month_${selectedDate.month}`),

			default: () => null
		};

		return (switchType[type] || switchType.default)();
	};

	const times = () => {
		const switchType = {
			[TimeEnum.YEAR]: () =>
				options.map(option => ({
					label: option.year,
					value: option.year,
					type: TimeEnum.YEAR
				})),
			[TimeEnum.MONTH]: () =>
				options.map(option => ({
					label: t(`lbl_Month_${option.month}`),
					value: option.month,
					type: TimeEnum.MONTH
				})),

			default: () => []
		};

		return (switchType[type] || switchType.default)();
	};

	const toggleDropdown = () => setIsOpen(!isOpen);

	const handleClickOutside = event => {
		if (
			dropdownRef.current &&
			!dropdownRef.current.contains(event.target)
		) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div className={className} ref={dropdownRef}>
			<div
				className={classNames("select-btn", { active: isOpen })}
				onClick={toggleDropdown}>
				{selectedTime()}
			</div>
			{isOpen && (
				<div className="option-menu">
					{uniqueData(times()).map(time => (
						<div
							key={time.label}
							className="option-list"
							onClick={() => {
								handleSelectedDate(time);
								toggleDropdown();
							}}>
							{time.label}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default LeaderboardDropdown;

LeaderboardDropdown.propTypes = {
	type: PropTypes.string.isRequired,
	options: PropTypes.arrayOf(PropTypes.object).isRequired,
	selectedDate: PropTypes.object.isRequired,
	className: PropTypes.string.isRequired,
	handleSelectedDate: PropTypes.func.isRequired
};
