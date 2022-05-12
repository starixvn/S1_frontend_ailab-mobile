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
		VaildAmount({ _amount, digits: 0 });
		setAmount(_amount);
	};

	const EditLocalBankAmount = e => {
		const { value } = e.target;
		let _amount = String(value).replace(/^(0+)|[^\d.]+/g, "");

		if (_amount.includes(".")) {
			_amount = _amount.replace(/\.{2,}/g, ".");
			_amount = _amount
				.replace(".", "$#$")
				.replace(/\./g, "")
				.replace("$#$", ".");
			_amount = _amount.replace(/^(\-)*(\d+)\.(\d\d\d).*$/, "$1$2.$3");
		}

		VaildAmount({ _amount, digits: 3 });
		setAmount(_amount);
	};

	const VaildAmount = ({ _amount, displayWarning = true, digits = 0 }) => {
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
		EditLocalBankAmount,
		VaildAmount
	};
};
