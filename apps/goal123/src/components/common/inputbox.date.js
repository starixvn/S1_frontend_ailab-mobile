import React from "react";
import PropTypes from "prop-types";

const Inputbox = props => {
	return (
		<label className="inputdate">
			<i className="icon icon-calendar" />
			<input
				type="date"
				onChange={props.onChange}
				value={
					props.value === null || props.value === undefined
						? ""
						: props.value
				}
				max={props.max ? props.max : null}
				style={{ width: "100%" }}
			/>
		</label>
	);
};

Inputbox.defaultProps = {
	value: "",
	max: null
};

Inputbox.propTypes = {
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.object
	]),
	onChange: PropTypes.func.isRequired,
	max: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default Inputbox;
