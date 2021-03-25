import React from "react";
import PropTypes from "prop-types";
import { number_format } from "../common/common";

const AmountInput = ({
	title,
	payType,
	channel,
	i18n,
	tip,
	_isConvert,
	amount,
	SelectAmount,
	EditAmount
}) => {
	const { amountRule, amountList, minAmount, maxAmount } = channel;
	let content = null;
	if (amountRule === 3 && amountList?.length > 0) {
		const rows = amountList.map(a => {
			const realAmount = _isConvert ? amount * 1000 : amount;
			return (
				<button
					onClick={SelectAmount.bind(this, _isConvert ? a / 1000 : a)}
					className={a === realAmount ? "open" : ""}
					key={`${payType}-fixedamount-${a}`}>
					<i className="icon icon-checkmark" />
					{number_format(a, false, 0)}
				</button>
			);
		});
		content = <div className="buttonBox">{rows}</div>;
	} else {
		content = (
			<div className="inputBox">
				<input
					type="tel"
					onChange={EditAmount}
					placeholder={
						minAmount && maxAmount
							? `${i18n.lbl_MinMaxAmount}: ${number_format(
									minAmount,
									false,
									0
							  )} / ${number_format(maxAmount, false, 0)}`
							: ""
					}
					value={amount}
				/>
				<div className="iconModule">(&apos;000)</div>
				<div className="tip">{tip}</div>
			</div>
		);
	}

	return (
		<>
			<div className="title">
				<span className="text-org">*</span>
				{title}
			</div>
			{content}
		</>
	);
};

AmountInput.defaultProps = {
	tip: ""
};

AmountInput.propTypes = {
	title: PropTypes.string.isRequired,
	channel: PropTypes.objectOf(PropTypes.any).isRequired,
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	tip: PropTypes.string,
	_isConvert: PropTypes.bool.isRequired,
	amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
		.isRequired,
	SelectAmount: PropTypes.func.isRequired,
	EditAmount: PropTypes.func.isRequired,
	payType: PropTypes.string.isRequired
};

export default AmountInput;
