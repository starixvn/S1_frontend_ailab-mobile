import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import moment from "moment";

const Counter = ({ setCanDrawPrize }) => {
	const end = moment().endOf("day");
	const zeroPad = (num, places) => String(num).padStart(places, "0");
	const [count, setCount] = useState("");
	const counterRef = useRef(null);

	useEffect(() => {
		const interval = setInterval(() => {
			const hour = zeroPad(
				moment.duration(end.diff(moment())).hours(),
				2
			);
			const minute = zeroPad(
				moment.duration(end.diff(moment())).minutes(),
				2
			);
			const second = zeroPad(
				moment.duration(end.diff(moment())).seconds(),
				2
			);

			setCount(`${hour}:${minute}:${second}`);
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

	return count ? <div className="time">{count}</div> : null;
};

Counter.propTypes = {
	setCanDrawPrize: PropTypes.func.isRequired
};

export default Counter;
