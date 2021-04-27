import React from "react";
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
	maxLength,
	tip,
	warningIcon
}) => {
	return (
		<div className="inputBoxText">
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
			{tip ? <div className="tip open">{tip}</div> : null}
			{warningIcon ? (
				<div className="icon-module">
					<i className="icon icon-warning" />
				</div>
			) : null}
		</div>
	);
};

const IptStatus = ({ btnStatus }) => {
	switch (btnStatus) {
		case false:
		// return
	}
};

Inputbox.defaultProps = {
	icon: "",
	inputType: "",
	placeholder: "",
	onFocus: () => null,
	onBlur: () => null,
	max: null,
	disabled: false,
	maxLength: null,
	tip: "",
	warningIcon: false
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
	maxLength: PropTypes.number,
	tip: PropTypes.string,
	warningIcon: PropTypes.bool
};

export default Inputbox;
