import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const Inputbox = ({
	icon,
	inputType,
	placeholder,
	onBlur,
	onChange,
	value,
	max,
	disabled,
	maxLength,
	tip,
	btnStatus,
	numberConvert,
	title,
	clickInfo,
	submitBtn,
	i18n,
	clickSubmit,
	isRequired,
	testAttr,
	_class,
	hideInfoBtn,
	inputBoxNewClass,
	isShowPaste,
	EditFieldPaste,
	pasteCol,
	areaCode,
	border,
	hint,
	isShowHint
}) => {
	const { t } = useTranslation();
	let Title = null;
	const handlePaste = () => {
		navigator.clipboard
			.readText()
			.then(result => EditFieldPaste({ value: result, col: pasteCol }));
	};
	if (title) {
		if (isRequired) {
			Title = (
				<div className="input-title frame">
					<span className="text-org">*</span> {title}
				</div>
			);
		} else {
			Title = <div className="input-title">{title}</div>;
		}
	}

	return (
		<div className={_class} data-testid={`${testAttr}_inputBox`}>
			{Title}
			<div className="input-group">
				<div
					className={`${border ? "inputBoxNew" : ""} ${
						inputBoxNewClass ?? ""
					}`}>
					{icon ? <i className={icon} /> : null}
					{areaCode && (
						<span
							className={border ? "countryCode" : "countrycode"}>
							{areaCode}
						</span>
					)}
					<input
						data-testid={`${testAttr}_ipt`}
						type={inputType ?? "text"}
						placeholder={placeholder}
						onBlur={onBlur}
						onChange={onChange}
						value={value}
						max={max}
						disabled={disabled}
						maxLength={maxLength}
					/>
					{numberConvert ? <span>(000)</span> : null}
					<IptStatus
						hideInfoBtn={hideInfoBtn}
						btnStatus={btnStatus}
						clickInfo={clickInfo}
						border={border}
					/>
					{isShowHint && (
						<div className="inputbox-tip-popup">{t(hint)}</div>
					)}
				</div>
				{isShowPaste && (
					<button
						onClick={handlePaste}
						className="icon icon-files-empty copyBtn"
					/>
				)}
				{submitBtn ? (
					<SubmitBtn i18n={i18n} clickSubmit={clickSubmit} />
				) : null}
			</div>

			{tip && (
				<div
					className={border ? "tip open" : "inputbox-tip"}
					data-testid={`${testAttr}_msg`}>
					{tip}
				</div>
			)}
		</div>
	);
};

Inputbox.defaultProps = {
	icon: "",
	inputType: "",
	placeholder: "",
	onBlur: () => null,
	max: null,
	disabled: false,
	maxLength: null,
	tip: "",
	btnStatus: null,
	numberConvert: false,
	title: null,
	clickInfo: () => null,
	submitBtn: false,
	i18n: {},
	clickSubmit: () => null,
	isRequired: false,
	testAttr: "",
	_class: "input-Area",
	inputBoxNewClass: "",
	isShowPaste: false,
	EditFieldPaste: null,
	pasteCol: null,
	hideInfoBtn: false,
	areaCode: null,
	border: true,
	hint: "",
	isShowHint: false
};

Inputbox.propTypes = {
	_class: PropTypes.string,
	icon: PropTypes.string,
	inputType: PropTypes.string,
	placeholder: PropTypes.string,
	onBlur: PropTypes.func,
	onChange: PropTypes.func.isRequired,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	disabled: PropTypes.bool,
	maxLength: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	tip: PropTypes.string,
	btnStatus: PropTypes.bool,
	numberConvert: PropTypes.bool,
	title: PropTypes.string,
	clickInfo: PropTypes.func,
	submitBtn: PropTypes.bool,
	i18n: PropTypes.objectOf(PropTypes.string),
	clickSubmit: PropTypes.func,
	isRequired: PropTypes.bool,
	testAttr: PropTypes.string,
	inputBoxNewClass: PropTypes.string,
	isShowPaste: PropTypes.bool,
	EditFieldPaste: PropTypes.func,
	pasteCol: PropTypes.string,
	hideInfoBtn: PropTypes.bool,
	areaCode: PropTypes.string,
	border: PropTypes.bool,
	hint: PropTypes.string,
	isShowHint: PropTypes.bool
};

export const IptStatus = ({ btnStatus, clickInfo, hideInfoBtn, border }) => {
	switch (btnStatus) {
		case false:
			return (
				<i
					className={
						border ? "icon textRed icon-cross" : "icon-error"
					}
				/>
			);
		case true:
			return (
				<i
					className={
						border ? "icon textGreen icon-checkmark" : "icon-check"
					}
				/>
			);
		default:
			if (hideInfoBtn) return null;
			return (
				<i
					className={
						border ? "icon icon-information-solid" : "icon-info"
					}
					data-testid="showTipBtn"
					onClick={clickInfo}
				/>
			);
	}
};

IptStatus.defaultProps = {
	btnStatus: null,
	clickInfo: () => null,
	hideInfoBtn: false,
	border: true
};

IptStatus.propTypes = {
	btnStatus: PropTypes.bool,
	clickInfo: PropTypes.func,
	hideInfoBtn: PropTypes.bool,
	border: PropTypes.bool
};

const SubmitBtn = ({ i18n, clickSubmit }) => {
	return (
		<div className="btn-group">
			<button className="blue" onClick={clickSubmit}>
				{i18n.lbl_Submit}
			</button>
		</div>
	);
};

SubmitBtn.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	clickSubmit: PropTypes.func.isRequired
};

export const InputboxDate = ({
	onBlur,
	onChange,
	value,
	max,
	btnStatus,
	clickInfo,
	testAttr
}) => {
	return (
		<label className="inputdate" data-testid={testAttr}>
			<input
				type="date"
				onBlur={onBlur}
				onChange={onChange}
				value={value}
				max={max}
			/>
			<IptStatus btnStatus={btnStatus} clickInfo={clickInfo} />
			<div className="iconModule">
				<span className="icon icon-calendar" />
			</div>
		</label>
	);
};

InputboxDate.defaultProps = {
	max: null,
	btnStatus: null,
	clickInfo: () => null,
	testAttr: null
};

InputboxDate.propTypes = {
	onBlur: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
	value: PropTypes.string.isRequired,
	max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	btnStatus: PropTypes.bool,
	clickInfo: PropTypes.func,
	testAttr: PropTypes.string
};

export default Inputbox;
