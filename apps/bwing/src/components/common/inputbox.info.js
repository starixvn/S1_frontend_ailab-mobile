import React from "react";
import PropTypes from "prop-types";

const Inputbox = ({
	icon,
	inputType,
	placeholder,
	onBlur,
	onChange,
	value,
	max,
	disabled,
	maxLength,
	tip,
	inputStatus
}) => {
	return (
		<>
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
				<IptStatus inputStatus={inputStatus} />
			</div>
			{tip ? <div>{tip}</div> : null}
		</>
	);
};

const IptStatus = ({ inputStatus }) => {
	switch (inputStatus) {
		case false:
			return <span className="icon icon-cross textRed" />;
		case true:
			return <span className="icon icon-checkmark textGreen" />;
		default:
			return <span className="icon icon-information-solid" />;
	}
};

Inputbox.defaultProps = {
	icon: "",
	inputType: "",
	placeholder: "",
	onBlur: () => null,
	max: null,
	disabled: false,
	maxLength: null,
	tip: "",
	inputStatus: null
};

Inputbox.propTypes = {
	icon: PropTypes.string,
	inputType: PropTypes.string,
	placeholder: PropTypes.string,
	onBlur: PropTypes.func,
	onChange: PropTypes.func.isRequired,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	max: PropTypes.number,
	disabled: PropTypes.bool,
	maxLength: PropTypes.number,
	tip: PropTypes.string,
	inputStatus: PropTypes.bool
};

export default Inputbox;
