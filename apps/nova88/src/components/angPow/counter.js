import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import moment from "moment";

const Counter = ({ i18n, setCanDrawPrize }) => {
	const end = moment().endOf("day");
	const zeroPad = (num, places) => String(num).padStart(places, "0");
	const [count, setCount] = useState("");
	const counterRef = useRef(null);

	useEffect(() => {
		const interval = setInterval(() => {
			const hour = moment.duration(end.diff(moment())).hours();
			const minute = moment.duration(end.diff(moment())).minutes();
			const second = moment.duration(end.diff(moment())).seconds();

			setCount(
				`${zeroPad(hour, 2)}:${zeroPad(minute, 2)}:${zeroPad(
					second,
					2
				)}`
			);
		}, 1000);
		counterRef.current = interval;

		return () => {
			clearInterval(counterRef.current);
		};
	}, [end]);

	useEffect(() => {
		if (count === "00:00:00") {
			clearInterval(counterRef.current);
			setCanDrawPrize(true);
		}
	}, [end, setCanDrawPrize, count]);

	return count ? (
		<div className="time">
			{i18n.lbl_Next}
			<div>{count}</div>
		</div>
	) : null;
};

Counter.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	setCanDrawPrize: PropTypes.func.isRequired
};

export default Counter;
