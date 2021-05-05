import React from "react";
import PropTypes from "prop-types";
import IptStatus from "./inputStatus";

const Inputbox = props => {
	return (
		<div
			className={props.infoModule ? "infoModule" : ""}
			data-testid={props.testAttr}>
			{props.showTips && (
				<div className="inputInfo active">{props.tips}</div>
			)}
			<div
				className={`inputBox ${
					props.checked === false ? "error" : ""
				}`}>
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
					{props.Warning?.status ? (
						<i className="icon icon-errormark" />
					) : null}
					<IptStatus btnStatus={props.checked} />
					<i
						className={`icon ${
							!props.showPsw ? "icon-eye-blocked" : "icon-eye"
						}`}
						onClick={props.showPswHandler}
					/>
					{props.showInfoIcon && (
						<i
							className="icon icon-information"
							onClick={props.clickInfo}
						/>
					)}
				</div>
			</div>
			{props.checked === false ? (
				<div
					className={`tip${
						props.checked === false ? " active" : ""
					}`}>
					{props.warningMsg}
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
	checked: true,
	tips: null,
	infoModule: "",
	clickInfo: null,
	warningMsg: "",
	testAttr: "",
	showInfoIcon: true
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
	checked: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
	tips: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
	showPswHandler: PropTypes.func.isRequired,
	showPsw: PropTypes.bool.isRequired,
	infoModule: PropTypes.string,
	clickInfo: PropTypes.func,
	warningMsg: PropTypes.string,
	testAttr: PropTypes.string,
	showInfoIcon: PropTypes.bool
};

export default Inputbox;
