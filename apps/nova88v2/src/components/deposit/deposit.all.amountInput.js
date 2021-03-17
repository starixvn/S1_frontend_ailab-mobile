import React from "react";
import PropTypes from "prop-types";
import { number_format } from "../common/common";
import useTip from "../hook/useTip";

const AmountInput = ({
	title,
	payType,
	channel,
	i18n,
	tip,
	_isConvert,
	amount,
	SelectAmount,
	EditAmount,
	msg,
	status
}) => {
	const { showTips, showTipHandler } = useTip();
	const { amountRule, amountList, minAmount, maxAmount } = channel;
	let content = null;
	if (amountRule === 3 && amountList?.length > 0) {
		const rows = amountList.map(a => {
			const realAmount = _isConvert ? amount * 1000 : amount;
			return (
				<button
					onClick={SelectAmount.bind(this, _isConvert ? a / 1000 : a)}
					className={a === realAmount ? "active" : ""}
					key={`${payType}-fixedamount-${a}`}>
					<i className="icon icon-icon32px_check" />
					{number_format(a, _isConvert)}
				</button>
			);
		});
		content = <div className="buttonBox">{rows}</div>;
	} else {
		content = (
			<div className="infoModule">
				<div
					className={`inputInfo ${
						showTips.includes("amountInput") ? "active" : ""
					}`}>
					{tip}
				</div>
				<div className={`inputBox ${status === false ? "error" : ""}`}>
					<i className="icon icon-pencil" />
					<input
						type="tel"
						onChange={EditAmount}
						placeholder={
							minAmount && maxAmount
								? `${i18n.lbl_MinMaxAmount}: ${number_format(
										minAmount,
										_isConvert
								  )} / ${number_format(maxAmount, _isConvert)}`
								: ""
						}
						value={amount}
					/>
					<div className="icon-module">
						{status === false && (
							<i className="icon icon-errormark" />
						)}
						{status === true && (
							<i className="icon icon-checkmark" />
						)}
						<i
							className="icon icon-information"
							onClick={() => showTipHandler("amountInput")}
						/>
					</div>
				</div>
				{status === false && <div className="tip">{msg}</div>}
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
	tip: "",
	msg: "",
	status: null
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
	payType: PropTypes.string.isRequired,
	msg: PropTypes.string,
	status: PropTypes.oneOfType([null, PropTypes.bool])
};

export default AmountInput;
