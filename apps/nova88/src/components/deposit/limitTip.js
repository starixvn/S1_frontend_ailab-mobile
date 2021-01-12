import React from "react";
import { number_format } from "../common/common";

export default ({
	minAmount = 0,
	maxAmount = 0,
	displayTextLimit = "",
	displayTextUnLimit = "",
	_isConvert = false
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
