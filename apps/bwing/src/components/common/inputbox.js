import React from "react";
import PropTypes from "prop-types";

const Inputbox = props => {
	return (
		<div className={props.className ? props.className : "inputBox"}>
			{props.label ? (
				<label className="inputdate">
					{props.icon ? <i className={`icon ${props.icon}`} /> : null}
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
					{props.iconModuleName ? (
						<div className="iconModule">
							<span className={`icon ${props.iconModuleName}`} />
							{props.iconModuleWarning ? (
								<i className="icon icon-warning" />
							) : null}
						</div>
					) : null}
				</label>
			) : (
				<>
					{props.icon ? <i className={`icon ${props.icon}`} /> : null}
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
					{props.iconModuleName ? (
						<div className="iconModule">
							<span
								className={`icon ${props.iconModuleName}`}
								onClick={props.clickInfo ?? null}
							/>
						</div>
					) : null}
				</>
			)}

			{props.Warning?.status || props.WarningIcon ? (
				<div className="icon-module">
					<i className="icon icon-warning" />
				</div>
			) : null}
			{props.WarningIcon || props.Warning?.status ? (
				<div
					className={`${props.ClassName}${
						props.WarningIcon || props.Warning?.status
							? " open"
							: ""
					}`}>
					{props.WarningIcon ? null : props.Warning.msg}
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

Inputbox.propTypes = {
	ClassName: PropTypes.string
};

Inputbox.defaultProps = {
	ClassName: "tip"
};

export default Inputbox;
