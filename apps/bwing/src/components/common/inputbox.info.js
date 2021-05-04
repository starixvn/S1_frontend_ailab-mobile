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
	title,
	clickInfo,
	submitBtn,
	i18n,
	clickSubmit
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
					<IptStatus btnStatus={btnStatus} clickInfo={clickInfo} />
				</div>
				{submitBtn ? (
					<SubmitBtn i18n={i18n} clickSubmit={clickSubmit} />
				) : null}
			</div>
			{tip ? <div className="tip open">{tip}</div> : null}
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
	title: null,
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
	max: PropTypes.number,
	disabled: PropTypes.bool,
	maxLength: PropTypes.number,
	tip: PropTypes.string,
	btnStatus: PropTypes.bool,
	numberConvert: PropTypes.bool,
	title: PropTypes.string,
	clickInfo: PropTypes.func,
	submitBtn: PropTypes.bool,
	i18n: PropTypes.objectOf(PropTypes.string),
	clickSubmit: PropTypes.func
};

export const IptStatus = ({ btnStatus, clickInfo }) => {
	switch (btnStatus) {
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

export default Inputbox;
