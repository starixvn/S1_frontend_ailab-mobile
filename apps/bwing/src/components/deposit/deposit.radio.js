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
	_isConvert
}) => {
	return (
		<div className={className}>
			<input
				type="radio"
				name={radioGroup}
				id={id}
				value=""
				onChange={onChange}
				checked={isSelect}
			/>
			<label htmlFor={id}>
				<div />
			</label>
			<div className="bankName">
				<img src={imgUrl} alt={imgAlt} />
			</div>
			<BankInfo
				displayName={displayName}
				i18n={i18n}
				minAmount={minAmount}
				maxAmount={maxAmount}
				_isConvert={_isConvert}
			/>
		</div>
	);
};

Radio.defaultProps = {
	className: "",
	minAmount: null,
	maxAmount: null,
	displayName: "",
	_isConvert: false,
	i18n: {}
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
	_isConvert: PropTypes.bool
};

const BankInfo = ({ displayName, i18n, minAmount, maxAmount, _isConvert }) => {
	return displayName ? (
		<div className="bank">
			<div>{displayName}</div>
			{minAmount === null || maxAmount === null ? null : (
				<div>
					<div>
						{`${i18n.lbl_Min}: ${
							minAmount === 0
								? i18n.lbl_Unlimited
								: number_format(minAmount, _isConvert, 0)
						}`}
					</div>
					<div>
						{`${i18n.lbl_Max}: ${
							maxAmount === 0
								? i18n.lbl_Unlimited
								: number_format(maxAmount, _isConvert, 0)
						}`}
					</div>
				</div>
			)}
		</div>
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
