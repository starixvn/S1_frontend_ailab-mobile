import { useState, useEffect } from "react";
import { isConvert, checkAmount } from "../../common/common";

export const useHandleAmount = ({ currencyId, minAmount, maxAmount, i18n }) => {
	const _isConvert = isConvert(currencyId);
	const [amount, setAmount] = useState("");
	const [warning, setWarning] = useState("");

	useEffect(() => {
		setAmount("");
		setWarning("");
	}, [minAmount, maxAmount]);

	const SelectAmount = value => {
		if (amount !== value) {
			setAmount(() => value);
		}
	};

	const EditAmount = e => {
		const { value } = e.target;
		VaildAmount({ _amount: value, minAmount, maxAmount, i18n });
		setAmount(value);
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
				setWarning(result.msg);
			} else {
				setWarning("");
			}
		}

		return result.status === 0;
	};

	return { amount, warning, SelectAmount, EditAmount, VaildAmount };
};
