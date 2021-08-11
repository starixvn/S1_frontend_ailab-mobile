import React from "react";
import PropTypes from "prop-types";
import IptStatus from "./inputStatus";

const Inputbox = ({
	icon,
	placeholder,
	onChange,
	value,
	inputType = "text",
	btnStatus = "",
	infoText = "",
	clickInfo,
	areaCode,
	warningMsg,
	showTips,
	onBlur,
	disabled,
	testAttr,
	showInfoIcon,
	maxLength
}) => {
	return (
		<div className="infoModule">
			<div
				className={`inputInfo ${showTips ? " active" : ""}`}
				data-testid="inputInfo">
				{infoText}
			</div>

			<div className={`inputBox ${btnStatus === false ? "error" : ""}`}>
				{areaCode ? (
					<i className={`icon ${icon}`}>{areaCode}</i>
				) : icon ? (
					<i className={`icon ${icon}`} />
				) : null}
				<input
					data-testid={`${testAttr}_ipt`}
					disabled={disabled}
					onBlur={onBlur}
					placeholder={placeholder}
					type={inputType}
					className="textRight"
					value={value}
					onChange={onChange}
					data-testid={`${testAttr}_ipt`}
					maxLength={maxLength}
				/>
				<div className="icon-module">
					<IptStatus btnStatus={btnStatus} />
					{showInfoIcon && (
						<i
							data-testid="showTipBtn"
							className="icon icon-information"
							onClick={clickInfo}
						/>
					)}
				</div>
			</div>
			<div
				className={`tip${btnStatus === false ? " active" : ""}`}
				data-testid={`${testAttr}_msg`}>
				{warningMsg}
			</div>
		</div>
	);
};

Inputbox.defaultProps = {
	icon: null,
	placeholder: "",
	inputType: "text",
	infoText: "",
	clickInfo: null,
	areaCode: null,
	warningMsg: "",
	showTips: false,
	disabled: false,
	btnStatus: "",
	onBlur: () => null,
	testAttr: "",
	value: "",
	showInfoIcon: true,
	maxLength: null
};

Inputbox.propTypes = {
	icon: PropTypes.string,
	placeholder: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	inputType: PropTypes.string,
	infoText: PropTypes.string,
	clickInfo: PropTypes.func,
	areaCode: PropTypes.string,
	warningMsg: PropTypes.string,
	showTips: PropTypes.bool,
	disabled: PropTypes.bool,
	btnStatus: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
	onBlur: PropTypes.oneOfType([PropTypes.func]),
	testAttr: PropTypes.string,
	showInfoIcon: PropTypes.bool,
	maxLength: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default Inputbox;
