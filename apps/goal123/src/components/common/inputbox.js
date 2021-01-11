import React from "react";
import PropTypes from "prop-types";

const Inputbox = props => {
	return (
		<div className="inputBox">
			{props.label ? (
				<label className="inputdate">
					<i className={`icon ${props.icon}`} />
					<input
						type={props.inputType ?? "text"}
						placeholder={props.placeholder}
						onFocus={props.onFocus}
						onBlur={props.onBlur}
						onChange={props.onChange}
						value={
							props.value === null || props.value === undefined
								? ""
								: props.value
						}
						max={props.max ? props.max : null}
						disabled={props.disabled ? props.disabled : null}
					/>
				</label>
			) : (
				<>
					<i className={`icon ${props.icon}`} />
					<input
						type={props.inputType ?? "text"}
						placeholder={props.placeholder}
						onFocus={props.onFocus}
						onBlur={props.onBlur}
						onChange={props.onChange}
						value={
							props.value === null || props.value === undefined
								? ""
								: props.value
						}
						max={props.max ? props.max : null}
						disabled={props.disabled ? props.disabled : null}
						maxLength={props.maxLength ?? null}
					/>
				</>
			)}

			{props.Warning?.status || props.WarningIcon ? (
				<div className="icon-module">
					<i className="icon icon-warning" />
				</div>
			) : null}
			{props.showTips ? (
				<div
					className={`${props.ClassName}${
						props.showTips ? " open" : ""
					}`}>
					{props.Tips}
				</div>
			) : props.WarningIcon || props.Warning?.status ? (
				<div
					className={`${props.ClassName}${
						props.WarningIcon || props.Warning?.status
							? " open"
							: ""
					}`}>
					{props.WarningIcon ? null : props.Warning.msg}
				</div>
			) : null}
		</div>
	);
};

Inputbox.defaultProps = {
	icon: "",
	value: "",
	inputType: "",
	placeholder: "",
	Warning: { status: null, msg: "" },
	showTips: false,
	label: false,
	max: null,
	disabled: null,
	maxLength: null,
	WarningIcon: null,
	ClassName: "",
	Tips: "",
	onBlur: null,
	onFocus: null
};

Inputbox.propTypes = {
	icon: PropTypes.string,
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.object
	]),
	inputType: PropTypes.string,
	placeholder: PropTypes.string,
	onFocus: PropTypes.func,
	onBlur: PropTypes.func,
	onChange: PropTypes.func.isRequired,
	Warning: PropTypes.shape({
		status: PropTypes.bool,
		msg: PropTypes.string
	}),
	showTips: PropTypes.bool,
	label: PropTypes.bool,
	max: PropTypes.number,
	disabled: PropTypes.string,
	maxLength: PropTypes.string,
	WarningIcon: PropTypes.bool,
	ClassName: PropTypes.string,
	Tips: PropTypes.string
};

export default Inputbox;
