import React from "react";
import PropTypes from "prop-types";
import { number_format } from "../common/common";
import useTip from "../hook/useTip";

const defAmountQuickPick = {
	2: [100, 300, 500, 1000, 2000],
	4: [500, 1000, 3000, 5000, 10000],
	15: [300000, 500000, 1000000, 3000000, 5000000]
};

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
	status,
	currencyId
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
					{number_format(a, _isConvert, 0)}
				</button>
			);
		});
		content = (
			<div className="selectModule">
				<div className="buttonBox">{rows}</div>
			</div>
		);
	} else {
		const rows = defAmountQuickPick[currencyId]?.map(a => {
			const realAmount = _isConvert ? amount * 1000 : amount;
			return (
				<button
					disabled={a < minAmount || a > maxAmount}
					onClick={SelectAmount.bind(this, _isConvert ? a / 1000 : a)}
					className={a === realAmount ? "active" : ""}
					key={`${channel.sysId}-${channel.payId}-${channel.groupId}-${payType}-fixedamount-${a}`}>
					{number_format(a, _isConvert, 0, false)}
				</button>
			);
		});
		content = (
			<div className="selectModule">
				<div className="infoModule">
					<div
						className={`inputInfo${
							showTips.includes("amountInput") ? " active" : ""
						}`}>
						{tip}
					</div>
					<div
						className={`inputBox${
							status && status !== 0 ? " error" : ""
						}`}>
						<i className="icon icon-pencil" />
						<input
							type="tel"
							onChange={EditAmount}
							placeholder={
								minAmount && maxAmount
									? `${
											i18n.lbl_MinMaxAmount
									  }: ${number_format(
											minAmount,
											_isConvert,
											0
									  )} / ${number_format(
											maxAmount,
											_isConvert,
											0
									  )}`
									: ""
							}
							value={amount}
						/>
						<div className="icon-module">
							{status ? (
								<i className="icon icon-errormark" />
							) : null}
							{status === 0 ? (
								<i className="icon icon-checkmark" />
							) : null}
							<i
								className="icon icon-information"
								onClick={() => showTipHandler("amountInput")}
							/>
						</div>
					</div>
					{status ? <div className="tip">{msg}</div> : null}
				</div>
				<div className="buttonBox">{rows}</div>
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
	status: null,
	currencyId: null
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
	status: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
	currencyId: PropTypes.number
};

export default AmountInput;
