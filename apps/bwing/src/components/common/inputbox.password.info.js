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
	clickInfo
}) => {
	const [showingPsw, setShowingPsw] = useState(false);
	const showPswHandler = () => {
		setShowingPsw(!showingPsw);
	};

	return (
		<div className="input-Area">
			{title ? <div className="input-title">{title}</div> : null}
			<div className="input-group">
				<div className="inputBoxNew">
					<i className="icon icon-key" />
					<input
						type={showingPsw ? "text" : "password"}
						placeholder={placeholder}
						onBlur={onBlur}
						onChange={onChange}
						value={value}
					/>
					<i
						className={`icon ${
							showingPsw ? "icon-eye" : "icon-eye-blocked"
						}`}
						onClick={showPswHandler}
					/>
					<IptStatus btnStatus={btnStatus} clickInfo={clickInfo} />
				</div>
			</div>
			{tip ? <div className="tip open">{tip}</div> : null}
		</div>
	);
};

Inputbox.defaultProps = {
	placeholder: "",
	onBlur: () => null,
	tip: "",
	btnStatus: null,
	title: null,
	clickInfo: () => null
};

Inputbox.propTypes = {
	placeholder: PropTypes.string,
	onBlur: PropTypes.func,
	onChange: PropTypes.func.isRequired,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	tip: PropTypes.string,
	btnStatus: PropTypes.bool,
	title: PropTypes.string,
	clickInfo: PropTypes.func
};

export default Inputbox;
