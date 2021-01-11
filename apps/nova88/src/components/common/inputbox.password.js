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
				value={props.value}
			/>
			<div className="icon-module">
				<i
					className={`icon ${
						!props.showPsw ? "icon-eye-blocked" : "icon-eye"
					}`}
					onClick={props.showPswHandler}
				/>
				{props.checked === false || props.Warning?.status ? (
					<i className="icon icon-warning" />
				) : null}
			</div>
			{props.showTips || props.tip ? (
				<div
					className={`${props.ClassName}${
						props.showTips || props.tip ? " open" : ""
					}`}>
					{props.tip ? props.tip : props.Tips}
				</div>
			) : props.Warning?.status ? (
				<div
					className={`${props.ClassName}${
						props.Warning.status ? " open" : ""
					}`}>
					{props.Warning.msg}
				</div>
			) : null}
		</div>
	);
};

Inputbox.defaultProps = {
	placeholder: "",
	onFocus: null,
	onBlur: null,
	Warning: {},
	showTips: false,
	checked: false,
	ClassName: "",
	tip: null,
	Tips: null
};

Inputbox.propTypes = {
	icon: PropTypes.string.isRequired,
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.object
	]).isRequired,
	inputType: PropTypes.string.isRequired,
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
	showPswHandler: PropTypes.func.isRequired,
	showPsw: PropTypes.bool.isRequired
};

export default Inputbox;
