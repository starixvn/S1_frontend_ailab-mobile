import React from "react";
import PropTypes from "prop-types";

const Checkbox = ({ className, id, checkboxHandler, children, Checked, labelClassName, testAttr }) => {
	return (
		<div className={className} data-test={testAttr}>
			<input
				type="checkbox"
				id={id}
				checked={Checked}
				onChange={checkboxHandler}
			/>
			<label className={labelClassName} htmlFor={id} />
			{children}
		</div>
	);
};

Checkbox.defaultProps = {
	className: "",
	id: "",
	Checked: false,
	labelClassName: "",
	testAttr: ""
};

Checkbox.propTypes = {
	className: PropTypes.string,
	id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	checkboxHandler: PropTypes.func.isRequired,
	children: PropTypes.node.isRequired,
	Checked: PropTypes.bool,
	labelClassName: PropTypes.string,
	testAttr: PropTypes.string
};

export default Checkbox;
