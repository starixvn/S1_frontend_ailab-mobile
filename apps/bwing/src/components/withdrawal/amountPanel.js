import React from "react";
import { number_format } from "../common/common";
import Inputbox from "../common/inputbox.hint";
// import CashBar from "./cashBar";

export default ({
	i18n,
	_isConvert,
	amount,
	balanceInfo,
	EditAmount,
	ClickSubmit,
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
						title={i18n["lbl_Amount"]}
						value={amount}
						numberConvert={_isConvert}
						inputType="tel"
						onChange={e => EditAmount(e.target.value)}
						btnStatus={warning.status}
					/>
					<div className="btn-group">
						<button className="submit" onClick={ClickSubmit}>
							{i18n["lbl_withdraw_submit"]}
						</button>
					</div>
				</div>
				{warning.msg ? (
					<div className={`tip${warning.msg ? " open" : ""}`}>
						{warning.msg}
					</div>
				) : null}
			</div>
		</div>
	);
};
