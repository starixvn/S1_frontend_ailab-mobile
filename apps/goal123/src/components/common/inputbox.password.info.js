import React, { useState } from "react";
import PropTypes from "prop-types";

const Inputbox = ({
	placeholder,
	onBlur,
	onChange,
	value,
	tip,
	btnStatus,
	clickInfo
}) => {
	const [showingPsw, setShowingPsw] = useState(false);
	const showPswHandler = () => {
		setShowingPsw(!showingPsw);
	};

	return (
		<div className="inputBox">
			<i className="icon icon-key" />
			<input
				type={showingPsw ? "text" : "password"}
				placeholder={placeholder}
				onBlur={onBlur}
				onChange={onChange}
				value={value}
			/>
			<div className="icon-module">
				<i
					className={`icon ${
						showingPsw ? "icon-eye" : "icon-eye-blocked"
					}`}
					onClick={showPswHandler}
				/>
				<IptStatus btnStatus={btnStatus} clickInfo={clickInfo} />
			</div>
			{tip ? <div className="tip active">{tip}</div> : null}
		</div>
	);
};

Inputbox.defaultProps = {
	placeholder: "",
	onBlur: () => null,
	tip: "",
	btnStatus: null,
	clickInfo: () => null
};

Inputbox.propTypes = {
	placeholder: PropTypes.string,
	onBlur: PropTypes.func,
	onChange: PropTypes.func.isRequired,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	tip: PropTypes.string,
	btnStatus: PropTypes.bool,
	clickInfo: PropTypes.func
};

export const IptStatus = ({ btnStatus, clickInfo }) => {
	switch (btnStatus) {
		case false:
			return <i className="icon icon-cross" />;
		case true:
			return <i className="icon icon-checkmark" />;
		default:
			return (
				<i
					className="icon icon-information-solid"
					onClick={clickInfo}
				/>
			);
	}
};

IptStatus.defaultProps = {
	btnStatus: null,
	clickInfo: () => null
};

IptStatus.propTypes = {
	btnStatus: PropTypes.bool,
	clickInfo: PropTypes.func
};

export default Inputbox;
