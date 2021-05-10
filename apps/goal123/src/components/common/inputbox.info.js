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
	submitBtn,
	i18n,
	clickSubmit
}) => {
	return (
		<div className="inputBox">
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
			<div className="icon-module">
				{numberConvert ? "('000)" : null}
				<IptStatus btnStatus={btnStatus} clickInfo={clickInfo} />
			</div>
			{submitBtn ? (
				<SubmitBtn i18n={i18n} clickSubmit={clickSubmit} />
			) : null}
			{tip ? <div className="tip">{tip}</div> : null}
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
	submitBtn: false,
	i18n: {},
	clickSubmit: () => null
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
	submitBtn: PropTypes.bool,
	i18n: PropTypes.objectOf(PropTypes.string),
	clickSubmit: PropTypes.func
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

const SubmitBtn = ({ i18n, clickSubmit }) => {
	return (
		<div className="btn-group">
			<button className="blue" onClick={clickSubmit}>
				{i18n.lbl_Submit}
			</button>
		</div>
	);
};

SubmitBtn.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	clickSubmit: PropTypes.func.isRequired
};

export const InputboxDate = ({
	onBlur,
	onChange,
	value,
	max,
	btnStatus,
	clickInfo
}) => {
	return (
		<label className="inputdate">
			<input
				type="date"
				onBlur={onBlur}
				onChange={onChange}
				value={value}
				max={max}
			/>
			<IptStatus btnStatus={btnStatus} clickInfo={clickInfo} />
			<div className="iconModule">
				<span className="icon icon-calendar" />
			</div>
		</label>
	);
};

InputboxDate.defaultProps = {
	max: null,
	btnStatus: null,
	clickInfo: () => null
};

InputboxDate.propTypes = {
	onBlur: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
	value: PropTypes.string.isRequired,
	max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	btnStatus: PropTypes.bool,
	clickInfo: PropTypes.func
};

export default Inputbox;
