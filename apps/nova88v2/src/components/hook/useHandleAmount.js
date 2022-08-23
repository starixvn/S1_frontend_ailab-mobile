import { useState, useEffect } from "react";
import { isConvert, checkAmount, defCurrenyId } from "../common/common";

export const useHandleAmount = ({
	currencyId,
	minAmount,
	maxAmount,
	i18n,
	digits = 2,
	lastAmount
}) => {
	const _isConvert = isConvert(currencyId);
	const [amount, setAmount] = useState("");
	const [warning, setWarning] = useState({});

	useEffect(() => {
		setAmount("");
		setWarning("");

		if (lastAmount) {
			const _amount = _isConvert
				? Number(lastAmount) / 1000
				: Number(lastAmount);
			const result = VaildAmount({ _amount });
			if (result) {
				setAmount(_amount);
			}
		}
	}, [minAmount, maxAmount]);

	const SelectAmount = value => {
		VaildAmount({ _amount: value });
		if (amount !== value) {
			setAmount(() => value);
		}
	};

	const EditAmount = e => {
		const { value } = e.target;
		const _amount = String(value).replace(/^(0+)|[^\d]+/g, "");
		VaildAmount({ _amount });
		setAmount(_amount);
	};

	const VaildAmount = ({ _amount, displayWarning = true }) => {
		const result = checkAmount({
			amount: _amount,
			minAmount,
			maxAmount,
			_isConvert,
			i18n,
			digits
		});
		if (displayWarning) {
			if (result.status !== 0) {
				setWarning(result);
			} else {
				setWarning({
					...result,
					status: _amount === "" ? null : result.status
				});
			}
		}

		return result.status === 0;
	};

	return {
		amount,
		warning,
		SelectAmount,
		EditAmount,
		VaildAmount
	};
};
