import { useState, useEffect } from "react";
import { isConvert, checkAmount } from "../../common/common";

export const useHandleAmount = ({ currencyId, minAmount, maxAmount, i18n }) => {
	const _isConvert = isConvert(currencyId);
	const [amount, setAmount] = useState("");
	const [inputStatus, setInputStatus] = useState({ checked: null, msg: "" });

	useEffect(() => {
		setAmount("");
		setInputStatus({ checked: null, msg: "" });
	}, [minAmount, maxAmount]);

	const SelectAmount = value => {
		if (amount !== value) {
			setAmount(() => value);
		}
	};

	const EditAmount = e => {
		const { value } = e.target;
		const _amount = String(value).replace(/^(0+)|[^\d]+/g, "");
		VaildAmount({ _amount, minAmount, maxAmount, i18n });
		setAmount(_amount);
	};

	const VaildAmount = ({ _amount, displayWarning = true }) => {
		const result = checkAmount(
			_amount,
			minAmount,
			maxAmount,
			_isConvert,
			i18n,
			0
		);
		if (displayWarning) {
			if (result.status !== 0) {
				setInputStatus({ checked: false, msg: result.msg });
			} else {
				setInputStatus({ checked: true, msg: "" });
			}
		}

		return result.status === 0;
	};

	return {
		amount,
		inputStatus,
		setInputStatus,
		SelectAmount,
		EditAmount,
		VaildAmount
	};
};
