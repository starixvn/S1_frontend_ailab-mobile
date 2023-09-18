import React, { useState } from "react";
import PropTypes from "prop-types";
import { IptStatus } from "./inputbox.info";

const Inputbox = ({
	placeholder,
	onBlur,
	onChange,
	value,
	tip,
	btnStatus,
	title,
	clickInfo,
	testAttr,
	icon,
	inputBoxNewClass,
	border
}) => {
	const [showingPsw, setShowingPsw] = useState(false);
	const showPswHandler = () => {
		setShowingPsw(!showingPsw);
	};

	const handleIconClassNameSelected = () => {
		if (border) {
			return showingPsw ? "icon-eye" : "icon-eye-blocked";
		}
		return showingPsw ? "icon-unvisible" : "icon-unvisible";
	};

	return (
		<div className="input-Area">
			{title ? <div className="input-title">{title}</div> : null}
			<div className="input-group">
				<div
					className={`${
						border ? "inputBoxNew" : ""
					} ${inputBoxNewClass}`}>
					<i className={icon} />
					<input
						data-testid={`${testAttr}_ipt`}
						type={showingPsw ? "text" : "password"}
						placeholder={placeholder}
						onBlur={onBlur}
						onChange={onChange}
						value={value}
					/>
					<i
						className={`icon ${handleIconClassNameSelected()}`}
						data-testid="showPsw"
						onClick={showPswHandler}
					/>
					<IptStatus
						hideInfoBtn
						btnStatus={btnStatus}
						clickInfo={clickInfo}
					/>
				</div>
			</div>
			{tip ? (
				<div className="tip open" data-testid={`${testAttr}_msg`}>
					{tip}
				</div>
			) : null}
		</div>
	);
};

Inputbox.defaultProps = {
	placeholder: "",
	onBlur: () => null,
	tip: "",
	btnStatus: null,
	title: null,
	clickInfo: () => null,
	testAttr: "",
	icon: "icon icon-key",
	inputBoxNewClass: "",
	border: true
};

Inputbox.propTypes = {
	placeholder: PropTypes.string,
	onBlur: PropTypes.func,
	onChange: PropTypes.func.isRequired,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	tip: PropTypes.string,
	btnStatus: PropTypes.bool,
	title: PropTypes.string,
	clickInfo: PropTypes.func,
	testAttr: PropTypes.string,
	icon: PropTypes.string,
	inputBoxNewClass: PropTypes.string,
	border: PropTypes.bool
};

export default Inputbox;
