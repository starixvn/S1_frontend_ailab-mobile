import React from "react";
import PropTypes from "prop-types";
import { number_format } from "../common/common";
import Inputbox from "../common/inputbox.info";
// import CashBar from "./cashBar";

const AmountPanel = ({
	i18n,
	_isConvert,
	amount,
	balanceInfo,
	EditAmount,
	ClickSubmit,
	inputStatus,
	clickInfo,
	VaildAmount
}) => {
	return (
		<div className="subModule">
			<div className="subModuleBody">
				<div className="calculation">
					<div>
						<div>{i18n.lbl_Balance}</div>
						<div>
							<div>
								{number_format(
									balanceInfo?.balance,
									_isConvert
								)}
							</div>
						</div>
					</div>
					<div>-</div>
					<div>
						<div>{i18n.lbl_Deduction}</div>
						<div>
							<div>
								{number_format(
									balanceInfo?.deduction,
									_isConvert
								)}
							</div>
						</div>
					</div>
					<div>=</div>
					<div>
						<div>{i18n.lbl_EligibleWithdrawalAmount}</div>
						<div>
							<span>
								{number_format(
									balanceInfo?.availableBalance,
									_isConvert
								)}
							</span>
						</div>
					</div>
				</div>
				{/* <CashBar
					onChangeAmount={EditAmount}
					amountValue={amount ?? 0}
					availableBalance={balanceInfo?.availableBalance}
					_isConvert={_isConvert}
				/> */}
				<Inputbox
					title={i18n.lbl_Amount}
					value={amount}
					numberConvert={_isConvert}
					inputType="tel"
					onChange={e => EditAmount(e.target.value)}
					onBlur={e => VaildAmount(e.target.value)}
					submitBtn={true}
					btnStatus={inputStatus.checked}
					tip={inputStatus.msg}
					i18n={i18n}
					clickSubmit={ClickSubmit}
					clickInfo={clickInfo}
				/>
			</div>
		</div>
	);
};

AmountPanel.defaultProps = {
	clickInfo: () => null,
	_isConvert: false,
	i18n: {},
	balanceInfo: {},
	inputStatus: {},
	VaildAmount: () => null
};

AmountPanel.propTypes = {
	clickInfo: PropTypes.func,
	_isConvert: PropTypes.bool,
	amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
		.isRequired,
	balanceInfo: PropTypes.objectOf(PropTypes.any),
	EditAmount: PropTypes.func.isRequired,
	ClickSubmit: PropTypes.func.isRequired,
	inputStatus: PropTypes.objectOf(PropTypes.any),
	i18n: PropTypes.objectOf(PropTypes.string),
	VaildAmount: PropTypes.func
};

export default AmountPanel;
