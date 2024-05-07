import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import classNames from "classnames";

const MatchesByDate = ({ matches, activeDate, setActiveDate }) => {
	const dateItems = Object.keys(matches).map(date => {
		const formattedDate = moment(date);
		const month = formattedDate.format("MMM");
		const day = formattedDate.format("D");
		const week = formattedDate.format("ddd");
		const isActive = date === activeDate;
		return (
			<button
				key={date}
				className={classNames("euro-match-date", {
					active: isActive
				})}
				onClick={() => setActiveDate(date)}>
				<div>{month}</div>
				<div className="date">{day}</div>
				<div>{week}</div>
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
