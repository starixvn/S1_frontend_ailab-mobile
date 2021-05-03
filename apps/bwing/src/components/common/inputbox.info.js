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
	inputStatus,
	numberConvert,
	title,
	clickInfo
}) => {
	return (
		<div className="input-Area">
			{title ? <div className="input-title">{title}</div> : null}
			<div className="input-group">
				<div className="inputBoxNew">
					{icon ? <i className={icon} /> : null}
					<input
						type={inputType ?? "text"}
						placeholder={placeholder}
						onBlur={onBlur}
						onChange={onChange}
						value={value}
						max={max}
						disabled={disabled}
						maxLength={maxLength}
					/>
					{numberConvert ? <span>(000)</span> : null}
					<IptStatus
						inputStatus={inputStatus}
						clickInfo={clickInfo}
					/>
				</div>
				{/* <div className="btn-group">
					<button className="blue">Submit</button>
				</div> */}
			</div>
			{tip ? <div className="tip open">{tip}</div> : null}
		</div>
	);
};

const IptStatus = ({ inputStatus, clickInfo }) => {
	switch (inputStatus) {
		case false:
			return <i className="icon icon-cross textRed" />;
		case true:
			return <i className="icon icon-checkmark textGreen" />;
		default:
			return (
				<i
					className="icon icon-information-solid"
					onClick={clickInfo}
				/>
			);
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
	inputStatus: null,
	numberConvert: false,
	title: null
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
	inputStatus: PropTypes.bool,
	numberConvert: PropTypes.bool,
	title: PropTypes.string
};

export default Inputbox;
