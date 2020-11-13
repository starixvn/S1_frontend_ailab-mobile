import React from "react";
import { number_format } from "../common/common";

export default ({
	minAmount,
	maxAmount,
	displayTextLimit,
	displayTextUnLimit,
	_isConvert
}) => {
	return !minAmount && !maxAmount ? (
		<div className="tip open">
			<span className="text-org">{displayTextLimit} :</span>{" "}
			{displayTextUnLimit}
		</div>
	) : (
		<div className="tip open">
			<span className="text-org">{displayTextLimit} :</span>{" "}
			{`${number_format(minAmount, _isConvert)} ~ ${number_format(
				maxAmount,
				_isConvert
			)}`}
		</div>
	);
};
