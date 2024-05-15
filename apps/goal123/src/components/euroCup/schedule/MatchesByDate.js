import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

const MatchesByDate = ({ matches, activeDate, setActiveDate }) => {
	const { t } = useTranslation();
	const dateItems = Object.keys(matches).map(date => {
		const formattedDate = moment(date);
		const month = formattedDate.month() + 1;
		const day = formattedDate.format("D");
		const week = formattedDate.day();
		const isActive = date === activeDate;
		return (
			<button
				key={date}
				className={classNames("euro-match-date", {
					active: isActive
				})}
				onClick={() => setActiveDate(date)}>
				<div>{t(`lbl_Month${month}`)}</div>
				<div className="date">{day}</div>
				<div>{t(`lbl_General_Weekday${week}`)}</div>
			</button>
		);
	});

	return <div className="euro-match-bar">{dateItems}</div>;
};

MatchesByDate.propTypes = {
	matches: PropTypes.objectOf(PropTypes.any).isRequired,
	activeDate: PropTypes.string.isRequired,
	setActiveDate: PropTypes.func.isRequired
};

export default MatchesByDate;
