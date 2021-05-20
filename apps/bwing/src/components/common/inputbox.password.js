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
				{props.Warning?.status || props.warningIcon ? (
					<i className="icon icon-warning" />
				) : null}
			</div>
			{props.showTips || props.tip ? (
				<div
					className={`${props.ClassName}${
						props.showTips ? " open" : ""
					}`}>
					{props.Tips || props.tip}
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

Inputbox.propTypes = {
	icon: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	showPswHandler: PropTypes.func.isRequired,
	showPsw: PropTypes.bool.isRequired,
	inputType: PropTypes.string.isRequired
};

export default Inputbox;
