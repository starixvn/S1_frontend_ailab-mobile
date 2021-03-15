import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

const ReloadSpin = ({ func, className }) => {
	const [spin, setSpin] = useState(false);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const clickSpin = () => {
		setSpin(true);
		if (!spin) {
			func();
		}
		setTimeout(() => {
			if (isMountedRef.current) {
				setSpin(false);
			}
		}, 1500);
	};

	return (
		<button
			className={`icon icon-spinner11${className ? ` ${className}` : ""}${
				spin ? " active" : ""
			}`}
			onClick={clickSpin}
		/>
	);
};

ReloadSpin.defaultProps = {
	className: ""
};

ReloadSpin.propTypes = {
	func: PropTypes.func.isRequired,
	className: PropTypes.string
};

export default ReloadSpin;
