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
	testAttr,
	important,
	hideInfoBtn
}) => {
	return (
		<div
			className={`inputBox ${btnStatus === false ? "error" : ""}`}
			data-testid={`${testAttr}_inputBox`}>
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
			{important && <span className="txt-red">*</span>}
			<div className="icon-module">
				{numberConvert ? "('000)" : null}
				<IptStatus
					btnStatus={btnStatus}
					clickInfo={clickInfo}
					hideInfoBtn={hideInfoBtn}
				/>
			</div>
			{tip ? (
				<div
					className={`tip ${btnStatus === false ? "error" : ""}`}
					data-testid={`${testAttr}_msg`}>
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
	clickInfo: () => null,
	testAttr: null,
	important: false,
	hideInfoBtn: false
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
	clickInfo: PropTypes.func,
	testAttr: PropTypes.string,
	important: PropTypes.bool,
	hideInfoBtn: PropTypes.bool
};

export const IptStatus = ({ btnStatus, clickInfo, hideInfoBtn }) => {
	switch (btnStatus) {
		case false:
			return <i className="icon icon-cross" />;
		case true:
			return <i className="icon icon-checkmark" />;
		default:
			if (hideInfoBtn) return null;
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
	clickInfo: () => null,
	hideInfoBtn: false
};

IptStatus.propTypes = {
	btnStatus: PropTypes.bool,
	clickInfo: PropTypes.func,
	hideInfoBtn: PropTypes.bool
};

export default Inputbox;
