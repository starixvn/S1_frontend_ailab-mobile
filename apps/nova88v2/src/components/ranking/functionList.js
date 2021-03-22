import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { useHandleSelect, useHandleSelectDay } from "./hook";
import { i18nContext, userInfoContext } from "../common/context";
import { defBtnsOfCategory, defDayBtns } from "./def";

const FunctionList = ({ displayDate, onSubmit, setSelectedGame }) => {
	const { userInfo: isLogin } = useContext(userInfoContext);
	const { selected, handleSelect } = useHandleSelect({
		defaultSelect: defBtnsOfCategory.Sports.value,
		isLogin
	});
	const { selectedDay, handleSelectDay } = useHandleSelectDay(1);
	const { i18n } = useContext(i18nContext);
	const [isOpen, setOpen] = useState(false);

	const [openDates, setOpenDates] = useState(false);
	const lang = {
		1: i18n.lbl_YesterDay,
		2: i18n.lbl_last_2_day,
		3: i18n.lbl_last_3_day,
		[defBtnsOfCategory.Sports.value]:
			i18n[defBtnsOfCategory.Sports.displayKey],
		[defBtnsOfCategory.Slots.value]:
			i18n[defBtnsOfCategory.Slots.displayKey],
		[defBtnsOfCategory.LiveCasino.value]:
			i18n[defBtnsOfCategory.LiveCasino.displayKey]
	};

	const dropdownHandler = e => {
		handleSelect(e.currentTarget.id);

		setOpen(false);
	};

	const dateHandler = e => {
		e.currentTarget.id && handleSelectDay(e.currentTarget.id);
		setOpenDates(false);
	};

	return (
		<div className="functionList">
			<div className="infoModule parts">
				<div className="inputBox">
					<button
						className="dropdown"
						onClick={() => setOpen(prev => !prev)}>
						{lang[selected]}
						<i className="icon icon-keyboard_arrow_down" />
					</button>
					<div
						className={`dropdown-container ${
							isOpen ? "active" : ""
						}`}>
						<div
							className="dropdown-item"
							id={defBtnsOfCategory.Sports.value}
							onClick={dropdownHandler}>
							{i18n.lbl_Sports}
						</div>
						<div
							className="dropdown-item"
							id={defBtnsOfCategory.Slots.value}
							onClick={dropdownHandler}>
							{i18n.lbl_Casino}
						</div>
						<div
							className="dropdown-item"
							id={defBtnsOfCategory.LiveCasino.value}
							onClick={dropdownHandler}>
							{i18n.lbl_LiveCasino}
						</div>
					</div>
				</div>
				{displayDate && (
					<div className="inputBox">
						<button
							className="dropdown"
							onClick={() => setOpenDates(prev => !prev)}>
							{lang[selectedDay]}
							<i className="icon icon-keyboard_arrow_down" />
						</button>
						<div
							className={`dropdown-container ${
								openDates ? "active" : ""
							}`}>
							<div
								className="dropdown-item"
								id={defDayBtns.Yesterday.value}
								onClick={dateHandler}>
								{i18n.lbl_YesterDay}
							</div>
							<div
								className="dropdown-item"
								id={defDayBtns.Last2Day.value}
								onClick={dateHandler}>
								{i18n.lbl_last_2_day}
							</div>
							<div
								className="dropdown-item"
								id={defDayBtns.Last3Day.value}
								onClick={dateHandler}>
								{i18n.lbl_last_3_day}
							</div>
						</div>
					</div>
				)}
				<div className="btn-group">
					<button
						onClick={
							setSelectedGame
								? setSelectedGame.bind(this, selected)
								: onSubmit.bind(this, selected, selectedDay)
						}>
						{i18n.lbl_Submit}
					</button>
				</div>
			</div>
		</div>
	);
};

FunctionList.defaultProps = {
	displayDate: false,
	onSubmit: () => null,
	setSelectedGame: false
};

FunctionList.propTypes = {
	displayDate: PropTypes.bool,
	onSubmit: PropTypes.func,
	setSelectedGame: PropTypes.oneOfType([PropTypes.func, PropTypes.bool])
};

export default FunctionList;
