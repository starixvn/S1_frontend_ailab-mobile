import React from "react";
import PropTypes from "prop-types";

const Checkbox = props => {
	const { className, id, Checked, onChange, children } = props;
	return (
		<div className={className}>
			<input
				data-testid="iAgree"
				type="checkbox"
				id={id}
				checked={Checked}
				onChange={onChange}
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
	onChange: PropTypes.func.isRequired,
	children: PropTypes.node.isRequired,
	Checked: PropTypes.bool
};

export default Checkbox;
