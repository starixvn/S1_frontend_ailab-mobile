import React from "react";
import PropTypes from "prop-types";
import { number_format } from "../common/common";

const LimitTip = ({
	minAmount,
	maxAmount,
	displayTextLimit,
	displayTextUnLimit,
	_isConvert
}) => {
	return !minAmount && !maxAmount ? (
		<div className="tip">
			<span className="text-org">{displayTextLimit} :</span>{" "}
			{displayTextUnLimit}
		</div>
	) : (
		<div className="tip">
			<span className="text-org">{displayTextLimit} :</span>{" "}
			{`${number_format(minAmount, _isConvert)} ~ ${number_format(
				maxAmount,
				_isConvert
			)}`}
		</div>
	);
};

LimitTip.defaultProps = {
	minAmount: null,
	maxAmount: null,
	displayTextLimit: "",
	displayTextUnLimit: ""
};

LimitTip.propTypes = {
	minAmount: PropTypes.number,
	maxAmount: PropTypes.number,
	displayTextLimit: PropTypes.string,
	displayTextUnLimit: PropTypes.string,
	_isConvert: PropTypes.bool.isRequired
};

export default LimitTip;
