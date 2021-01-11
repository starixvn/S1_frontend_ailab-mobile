import React from "react";
import PropTypes from "prop-types";

const Inputbox = props => {
	return (
		<div className="inputBox">
			<i className={`icon ${props.icon}`} />
			<input
				type={props.inputType}
				placeholder={props.placeholder}
				onFocus={props.onFocus}
				onBlur={props.onBlur}
				onChange={props.onChange}
				value={
					props.value === null || props.value === undefined
						? ""
						: props.value
				}
				max={props.max}
				disabled={props.disabled ? props.disabled : null}
			/>
			{props.checked === false || props.Warning?.status ? (
				<div className="icon-module">
					<i className="icon icon-warning" />
				</div>
			) : null}
			{props.Warning?.status ? (
				<div
					className={`${props.ClassName}${
						props.Warning.status ? " open" : ""
					}`}>
					{props.Warning.msg}
				</div>
			) : props.tip ? (
				<div
					className={`${props.ClassName}${props.tip ? " open" : ""}`}>
					{props.tip}
				</div>
			) : props.showTips ? (
				<div
					className={`${props.ClassName}${
						props.showTips ? " open" : ""
					}`}>
					{props.Tips}
				</div>
			) : null}
		</div>
	);
};

Inputbox.defaultProps = {
	value: "",
	inputType: "text",
	placeholder: "",
	onFocus: null,
	onBlur: null,
	Warning: {},
	showTips: false,
	checked: false,
	ClassName: "",
	tip: null,
	Tips: null,
	disabled: false,
	max: null
};

Inputbox.propTypes = {
	icon: PropTypes.string.isRequired,
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
	Warning: PropTypes.objectOf(PropTypes.any),
	showTips: PropTypes.bool,
	checked: PropTypes.bool,
	ClassName: PropTypes.string,
	tip: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
	Tips: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
	disabled: PropTypes.bool,
	max: PropTypes.number
};

export default Inputbox;
