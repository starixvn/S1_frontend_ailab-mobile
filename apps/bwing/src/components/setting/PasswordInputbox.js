import React, { useState } from "react";
import PropTypes from "prop-types";

const Inputbox = ({
	placeholder,
	onBlur,
	onChange,
	value,
	tip,
	btnStatus,
	clickInfo,
	testAttr
}) => {
	const [showingPsw, setShowingPsw] = useState(false);
	const showPswHandler = () => {
		setShowingPsw(!showingPsw);
	};

	return (
		<>
			<div className={`inputBox${btnStatus === false ? " error" : ""}`}>
				<input
					data-testid={`${testAttr}_ipt`}
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
				<div className="tip active" data-testid={`${testAttr}_msg`}>
					{tip}
				</div>
			) : null}
		</>
	);
};

Inputbox.defaultProps = {
	placeholder: "",
	onBlur: () => null,
	tip: "",
	btnStatus: null,
	clickInfo: () => null,
	testAttr: ""
};

Inputbox.propTypes = {
	placeholder: PropTypes.string,
	onBlur: PropTypes.func,
	onChange: PropTypes.func.isRequired,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	tip: PropTypes.string,
	btnStatus: PropTypes.bool,
	clickInfo: PropTypes.func,
	testAttr: PropTypes.string
};

export const IptStatus = ({ btnStatus, clickInfo, hideInfoBtn }) => {
	switch (btnStatus) {
		case false:
			return <i className="icon icon-cross" />;
		case true:
			return <i className="icon icon-checkmark" />;
		default:
			if (hideInfoBtn) return null;

			return (
				<i
					className="icon icon-information-solid"
					onClick={clickInfo}
					data-testid="showTipBtn"
				/>
			);
	}
};

IptStatus.defaultProps = {
	btnStatus: null,
	clickInfo: () => null,
	hideInfoBtn: false
};

IptStatus.propTypes = {
	btnStatus: PropTypes.bool,
	clickInfo: PropTypes.func,
	hideInfoBtn: PropTypes.bool
};

export default Inputbox;
