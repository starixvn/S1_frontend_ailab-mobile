import React from "react";
import PropTypes from "prop-types";
import { number_format } from "../common/common";

const Radio = ({
	radioGroup,
	id,
	imgUrl,
	imgAlt,
	onChange,
	isSelect,
	className,
	displayName,
	minAmount,
	maxAmount,
	i18n,
	_isConvert,
	canSubmit
}) => {
	return (
		<div className={className}>
			<label htmlFor={id}>
				<input
					type="radio"
					name={radioGroup}
					id={id}
					value=""
					onChange={onChange}
					checked={isSelect}
				/>
				<div
					className={`bankName${canSubmit ? "" : " pending"}${
						isSelect ? " active" : ""
					}`}>
					<img src={imgUrl} alt={imgAlt} />
					{isSelect && <i className="icon icon-icon32px_check" />}
					{canSubmit ? "" : <div className="mask" />}
				</div>
				<BankInfo
					displayName={displayName}
					i18n={i18n}
					minAmount={minAmount}
					maxAmount={maxAmount}
					_isConvert={_isConvert}
				/>
			</label>
		</div>
	);
};

Radio.defaultProps = {
	className: "",
	minAmount: null,
	maxAmount: null,
	displayName: "",
	_isConvert: false,
	i18n: {},
	canSubmit: true
};

Radio.propTypes = {
	id: PropTypes.string.isRequired,
	imgUrl: PropTypes.string.isRequired,
	imgAlt: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	isSelect: PropTypes.bool.isRequired,
	radioGroup: PropTypes.string.isRequired,
	className: PropTypes.string,
	displayName: PropTypes.string,
	minAmount: PropTypes.number,
	maxAmount: PropTypes.number,
	i18n: PropTypes.objectOf(PropTypes.string),
	_isConvert: PropTypes.bool,
	canSubmit: PropTypes.bool
};

const BankInfo = ({ displayName, i18n, minAmount, maxAmount, _isConvert }) => {
	const min =
		minAmount === 0
			? i18n.lbl_Unlimited
			: number_format(minAmount, _isConvert, 0, false);

	const max =
		minAmount === 0
			? i18n.lbl_Unlimited
			: number_format(maxAmount, _isConvert, 0, false);

	return displayName ? (
		<>
			<div className="subtitle">{displayName}</div>
			{minAmount === null || maxAmount === null ? null : (
				<div className="subinfo">
					<span>{`${min} ~ ${max}`}</span>
				</div>
			)}
		</>
	) : null;
};

BankInfo.defaultProps = {
	minAmount: null,
	maxAmount: null,
	displayName: "",
	_isConvert: false,
	i18n: {}
};

BankInfo.propTypes = {
	displayName: PropTypes.string,
	minAmount: PropTypes.number,
	maxAmount: PropTypes.number,
	i18n: PropTypes.objectOf(PropTypes.string),
	_isConvert: PropTypes.bool
};

export default Radio;
