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
	btnStatus,
	numberConvert,
	clickInfo,
	testAttr
}) => {
	return (
		<div className="inputBox">
			{icon ? <i className={icon} /> : null}
			<input
				data-testid={`${testAttr}_ipt`}
				type={inputType ?? "text"}
				placeholder={placeholder}
				onBlur={onBlur}
				onChange={onChange}
				value={value}
				max={max}
				disabled={disabled}
				maxLength={maxLength}
			/>
			<div className="icon-module">
				{numberConvert ? "('000)" : null}
				<IptStatus btnStatus={btnStatus} clickInfo={clickInfo} />
			</div>
			{tip ? (
				<div className="tip" data-testid={`${testAttr}_tip`}>
					{tip}
				</div>
			) : null}
		</div>
	);
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
	btnStatus: null,
	numberConvert: false,
	clickInfo: () => null
};

Inputbox.propTypes = {
	icon: PropTypes.string,
	inputType: PropTypes.string,
	placeholder: PropTypes.string,
	onBlur: PropTypes.func,
	onChange: PropTypes.func.isRequired,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	disabled: PropTypes.bool,
	maxLength: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	tip: PropTypes.string,
	btnStatus: PropTypes.bool,
	numberConvert: PropTypes.bool,
	clickInfo: PropTypes.func
};

export const IptStatus = ({ btnStatus, clickInfo }) => {
	switch (btnStatus) {
		case false:
			return <i className="icon icon-cross" />;
		case true:
			return <i className="icon icon-checkmark" />;
		default:
			return (
				<i
					className="icon icon-information-solid"
					onClick={clickInfo}
					data-testid="showTipBtn"
				/>
			);
	}
};

IptStatus.defaultProps = {
	btnStatus: null,
	clickInfo: () => null
};

IptStatus.propTypes = {
	btnStatus: PropTypes.bool,
	clickInfo: PropTypes.func
};

export default Inputbox;
