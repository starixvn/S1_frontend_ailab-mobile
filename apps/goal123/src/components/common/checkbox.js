import React from "react";
import PropTypes from "prop-types";

const Checkbox = props => {
	const { className, id, Checked, checkboxHandler, children } = props;
	return (
		<div className={className}>
			<input
				type="checkbox"
				id={id}
				checked={Checked}
				onChange={checkboxHandler}
			/>
			<label htmlFor={id}>
				<div />
			</label>
			{children}
		</div>
	);
};

Checkbox.defaultProps = {
	className: "",
	id: "",
	Checked: false
};

Checkbox.propTypes = {
	className: PropTypes.string,
	id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	checkboxHandler: PropTypes.func.isRequired,
	children: PropTypes.node.isRequired,
	Checked: PropTypes.bool
};

export default Checkbox;
