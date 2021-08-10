import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

const ReloadSpin = ({ func, className, content }) => {
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
			data-testid="reloadSpin"
			className={`${className ?? "icon icon-spinner11 clickBtn"}${
				spin ? " active" : ""
			}`}
			onClick={clickSpin}>
			{content}
		</button>
	);
};

ReloadSpin.defaultProps = {
	className: null,
	content: null
};

ReloadSpin.propTypes = {
	func: PropTypes.func.isRequired,
	className: PropTypes.string,
	content: PropTypes.node
};

export default ReloadSpin;
