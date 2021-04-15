import React from "reatc";
import PropTypes from "prop-types";

const Inputbox = ({
	icon,
	inputType,
	placeholder,
	onFocus,
	onBlur,
	onChange,
	value,
	max,
	disabled,
	maxLength
}) => {
	return (
		<div className="inputBox">
			{icon ? <i className={icon} /> : null}
			<input
				type={inputType ?? "text"}
				placeholder={placeholder}
				onFocus={onFocus}
				onBlur={onBlur}
				onChange={onChange}
				value={value}
				max={max}
				disabled={disabled}
				maxLength={maxLength}
			/>
		</div>
	);
};

Inputbox.defaultProps = {
	icon: "",
	inputType: "",
	placeholder: "",
	onFocus: () => null,
	onBlur: () => null,
	max: null,
	disabled: false,
	maxLength: null
};

Inputbox.propTypes = {
	icon: PropTypes.string,
	inputType: PropTypes.string,
	placeholder: PropTypes.string,
	onFocus: PropTypes.func,
	onBlur: PropTypes.func,
	onChange: PropTypes.func.isRequired,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	max: PropTypes.number,
	disabled: PropTypes.bool,
	maxLength: PropTypes.number
};

export default Inputbox;
