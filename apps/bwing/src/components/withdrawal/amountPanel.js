import React from "react";
import { number_format } from "../common/common";
import Inputbox from "../common/inputbox";
// import CashBar from "./cashBar";

export default ({
	i18n,
	_isConvert,
	amount,
	balanceInfo,
	EditAmount,
	ClickSubmit,
	VaildAmount,
	currencyId,
	warning
}) => {
	return (
		<div className="subModule">
			<div className="subModuleBody">
				<div className="calculation">
					<div>
						<div>{i18n["lbl_Balance"]}</div>
						<div>
							{i18n[`Currency_${currencyId}`]}
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
						<div>{i18n["lbl_Deduction"]}</div>
						<div>
							{i18n[`Currency_${currencyId}`]}
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
						<div>{i18n["lbl_EligibleWithdrawalAmount"]}</div>
						<div>
							{i18n[`Currency_${currencyId}`]}
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
				<div className="inputModuleRow">
					<Inputbox
						placeholder={i18n["lbl_Amount"]}
						value={amount}
						onChange={e => EditAmount(e.target.value)}
						_isConvert={_isConvert}
						onBlur={VaildAmount.bind(this, amount)}
						isAmount={true}
						Warning={warning}
					/>
					<div className="btn-group">
						<button className="submit" onClick={ClickSubmit}>
							{i18n["lbl_Submit"]}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
