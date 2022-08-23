import React from "react";
import PropTypes from "prop-types";
import { number_format } from "../common/common";
import { IptStatus } from "../common/inputbox.info";

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
	btnStatus,
	clickInfo,
	VaildAmount
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
					{number_format(a, _isConvert, 0)}
				</button>
			);
		});
		content = <div className="buttonBox">{rows}</div>;
	} else {
		content = (
			<>
				<div className="input-group">
					<div className="inputBoxNew">
						<input
							type="tel"
							inputMode={payType === "localBank" ? "decimal" : ""}
							placeholder={
								minAmount && maxAmount
									? `${
											i18n.lbl_MinMaxAmount
									  }: ${number_format(
											minAmount,
											false,
											0
									  )} / ${number_format(
											maxAmount,
											false,
											0
									  )}`
									: ""
							}
							onChange={EditAmount}
							value={amount}
							onBlur={VaildAmount}
						/>
						<span>(000)</span>
						<IptStatus
							btnStatus={btnStatus}
							clickInfo={clickInfo}
						/>
					</div>
				</div>
				{tip ? <div className="tip open">{tip}</div> : null}
			</>
		);
	}
	return (
		<div className="input-Area">
			<div className="input-title frame">
				<span className="text-org">*</span> {title}
				{i18n.lbl_DepositAmountNote}
			</div>
			{content}
		</div>
	);
};

AmountInput.defaultProps = {
	tip: "",
	btnStatus: null,
	clickInfo: () => null,
	VaildAmount: () => null
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
	btnStatus: PropTypes.bool,
	clickInfo: PropTypes.func,
	VaildAmount: PropTypes.func
};

export default AmountInput;
