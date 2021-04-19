import React from "react";
import PropTypes from "prop-types";

const Inputbox = ({
	icon,
	inputType,
	placeholder,
	onFocus,
	onBlur,
	onChange,
	value,
	showPsw,
	showPswHandler,
	Warning,
	warningIcon,
	showTips,
	tip,
	ClassName,
	Tips
}) => {
	return (
		<div className="inputBox">
			<i className={`icon ${icon}`} />
			<input
				type={inputType}
				placeholder={placeholder}
				onFocus={onFocus}
				onBlur={onBlur}
				onChange={onChange}
				value={value}
			/>
			<div className="icon-module">
				<i
					className={`icon ${
						!showPsw ? "icon-eye-blocked" : "icon-eye"
					}`}
					onClick={showPswHandler}
				/>
				{Warning?.status || warningIcon ? (
					<i className="icon icon-warning" />
				) : null}
			</div>
			{showTips || tip ? (
				<div className={`${ClassName}${showTips ? " open" : ""}`}>
					{Tips || tip}
				</div>
			) : Warning?.status ? (
				<div className={`${ClassName}${Warning.status ? " open" : ""}`}>
					{Warning.msg}
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
