import React from "react";
import PropTypes from "prop-types";
import { defIptStatus } from "./inputStatus";

const Inputbox = ({
	tip,
	value,
	title,
	pasteCol,
	required,
	inputType,
	isConvert,
	btnStatus,
	isShowPaste,
	placeholder,
	onBlur,
	onChange,
	clickInfo,
	editFieldPaste
}) => {
	const handlePaste = () => {
		navigator.clipboard
			.readText()
			.then(result => editFieldPaste({ value: result, col: pasteCol }));
	};

	return (
		<>
			{title && (
				<div className="title">
					{title && required && <span className="text-org">*</span>}
					{title}
				</div>
			)}
			<div className="selectModule">
				<div className="infoModule">
					<div className="input-group">
						<div className="inputBox">
							<input
								value={value}
								type={inputType}
								placeholder={placeholder}
								onBlur={onBlur}
								onChange={onChange}
							/>
							<div className="icon-module">
								{isConvert && <i className="icon-rate" />}
								<IptStatus
									btnStatus={btnStatus}
									clickInfo={clickInfo}
								/>
							</div>
						</div>
						{isShowPaste && (
							<button
								className="icon icon-files-empty clickBtn"
								onClick={handlePaste}
							/>
						)}
					</div>
					{tip && (
						<>
							{btnStatus === null && (
								<div className="cardinfo">{tip}</div>
							)}
							{btnStatus === false && (
								<div className="tip active">{tip}</div>
							)}
						</>
					)}
				</div>
			</div>
		</>
	);
};

Inputbox.defaultProps = {
	tip: null,
	title: null,
	pasteCol: null,
	required: null,
	inputType: "text",
	isConvert: false,
	btnStatus: null,
	isShowPaste: false,
	placeholder: null,
	onBlur: () => null,
	clickInfo: () => null,
	editFieldPaste: () => null
};

Inputbox.propTypes = {
	tip: PropTypes.string,
	value: PropTypes.string.isRequired,
	title: PropTypes.string,
	pasteCol: PropTypes.string,
	required: PropTypes.bool,
	inputType: PropTypes.string,
	isConvert: PropTypes.bool,
	btnStatus: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
	isShowPaste: PropTypes.bool,
	placeholder: PropTypes.string,
	onBlur: PropTypes.func,
	onChange: PropTypes.func.isRequired,
	clickInfo: PropTypes.func,
	editFieldPaste: PropTypes.func
};

const IptStatus = ({ btnStatus, clickInfo }) => {
	switch (btnStatus) {
		case defIptStatus.verified:
			return <i className="icon icon-checkmark" />;
		case defIptStatus.warning:
			return <i className="icon icon-errormark" />;
		default:
			return <i className="icon icon-information" onClick={clickInfo} />;
	}
};

IptStatus.defaultProps = {
	btnStatus: defIptStatus.default,
	clickInfo: () => null
};

IptStatus.propTypes = {
	btnStatus: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
	clickInfo: PropTypes.func
};

export default Inputbox;
