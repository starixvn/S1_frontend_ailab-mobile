import React from "react";
import { number_format } from "../common/common";

const SingleRecord = ({
	i18n = {},
	depositId,
	depositAmount,
	currencyId,
	formatSetting
}) => {
	return (
		<div className="minAmount">
			<div>
				<div>{i18n?.lbl_ID}</div>
				<div>{depositId}</div>
			</div>
			<div>
				<div>{i18n?.lbl_DepositAmount}</div>
				<div>
					{`${i18n?.[`Currency_${currencyId}`]} ${number_format(
						depositAmount,
						formatSetting
					)}`}
				</div>
			</div>
		</div>
	);
};

export default SingleRecord;
