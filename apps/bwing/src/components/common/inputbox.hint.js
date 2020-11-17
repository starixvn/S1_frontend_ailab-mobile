import React from "react";
import PropTypes from "prop-types";

export const defIptStatus = {
	default: "",
	warning: "icon icon-cross textRed",
	verified: "icon icon-checkmark textGreen"
};

const Inputbox = ({
	title,
	onChange,
	value,
	numberConvert = false,
	tipDisplayText = "",
	inputType = "text",
	btnStatus = defIptStatus.default
}) => {
	return (
		<>
			<div className="inputBoxText" style={{ marginTop: "4vw" }}>
				<p className="txt-blue12">{title}</p>
				<input
					type={inputType}
					className="textRight"
					value={value}
					onChange={onChange}
				/>
				<div className="iconModule">
					{numberConvert ? "('000)" : null}
					<IptStatus btnStatus={btnStatus} />
				</div>
			</div>
			<div className={`tip${tipDisplayText ? " open" : ""}`}>
				{tipDisplayText}
			</div>
		</>
	);
};

const IptStatus = ({ btnStatus }) => {
	switch (btnStatus) {
		case defIptStatus.verified:
			return <span className="icon icon-checkmark textGreen"></span>;

		case defIptStatus.warning:
			return <span className="icon icon-cross textRed"></span>;
		default:
			return null;
	}
};

Inputbox.propTypes = {
	title: PropTypes.string.isRequired,
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.object
	]),
	onChange: PropTypes.func.isRequired,
	showTips: PropTypes.bool,
	tipDisplayText: PropTypes.string,
	inputType: PropTypes.string,
	btnStatus: PropTypes.string,
	numberConvert: PropTypes.bool
};

export default Inputbox;
