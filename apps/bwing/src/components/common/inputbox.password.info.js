import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
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
	border,
	hideInfoBtn,
	hint,
	isShowHint
}) => {
	const [showingPsw, setShowingPsw] = useState(false);
	const { t } = useTranslation();
	const showPswHandler = () => {
		setShowingPsw(!showingPsw);
	};

	const handleIconClassNameSelected = () => {
		if (border) {
			return showingPsw ? "icon-eye" : "icon-eye-blocked";
		}
		return showingPsw ? "icon-visible" : "icon-unvisible";
	};

	return (
		<div className="input-Area">
			{title ? <div className="input-title">{title}</div> : null}
			<div className={border ? "input-group" : "inputbox-group"}>
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
						hideInfoBtn={hideInfoBtn}
						btnStatus={btnStatus}
						clickInfo={clickInfo}
						border={border}
					/>
					{isShowHint && (
						<div className="inputbox-tip-popup">{t(hint)}</div>
					)}
				</div>
			</div>
			{tip ? (
				<div
					className={border ? "tip open" : "inputbox-tip"}
					data-testid={`${testAttr}_msg`}>
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
	border: true,
	hideInfoBtn: true,
	hint: "",
	isShowHint: false
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
	border: PropTypes.bool,
	hideInfoBtn: PropTypes.bool,
	hint: PropTypes.string,
	isShowHint: PropTypes.bool
};

export default Inputbox;
