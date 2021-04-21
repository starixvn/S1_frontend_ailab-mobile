/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "../../route/link";
import Dropdown from "../common/dropdown";
import useTip from "../hook/useTip";
import path from "../../path";

export const defDepChannelValue = {
	OnlineBanking: 1,
	CashDepositMachine: 2,
	ATM: 3,
	OverTheCounter: 4
};

export const defDepositChannel = [
	{
		displayKey: "lbl_DepositChannel_1",
		value: defDepChannelValue.OnlineBanking
	},
	{
		displayKey: "lbl_DepositChannel_2",
		value: defDepChannelValue.CashDepositMachine
	},
	{ displayKey: "lbl_DepositChannel_3", value: defDepChannelValue.ATM },
	{
		displayKey: "lbl_DepositChannel_4",
		value: defDepChannelValue.OverTheCounter
	}
];

const DepositChannel = ({ i18n, DepositChannelProps, BankAccountProps }) => {
	return (
		<>
			<Channel i18n={i18n} DepositChannelProps={DepositChannelProps} />
			{DepositChannelProps.selDepositChannel !== null &&
			(defDepositChannel[DepositChannelProps.selDepositChannel].value ===
				defDepChannelValue.OnlineBanking ||
				defDepositChannel[DepositChannelProps.selDepositChannel]
					.value === defDepChannelValue.ATM) ? (
				<BankAccount i18n={i18n} BankAccountProps={BankAccountProps} />
			) : null}
		</>
	);
};

const Channel = ({ i18n, DepositChannelProps }) => {
	// const { showTips, showTipHandler } = useTip();
	const {
		selDepositChannel,
		HandleDepositChannel,
		depositChannelWarning
	} = DepositChannelProps;

	return (
		<>
			<div className="title">
				<span className="text-org">*</span>
				{i18n.lbl_DepositChannel}
			</div>
			<div className="selectModule">
				<Dropdown
					mainKey="localbank-depositChannel"
					colName="Channel"
					selectedIdx={selDepositChannel}
					options={defDepositChannel}
					onSelectItem={HandleDepositChannel}
					infoText={i18n.lbl_LocalBankDepositChannelTip}
					// showTips={showTips.includes("tip")}
					// clickInfo={() => showTipHandler("tip")}
					hideInfo={true}
					checked={depositChannelWarning.status}
					warningMsg={depositChannelWarning.msg}
					i18n={i18n}
					onBlur={() => HandleDepositChannel(null)}
				/>
			</div>
		</>
	);
};

const BankAccount = ({ i18n, BankAccountProps }) => {
	// const { showTips, showTipHandler } = useTip();
	const {
		HandleBankAccount,
		selBankAccount,
		bankAccountSetWarning,
		custBankInfo
	} = BankAccountProps;

	const rightBtn =
		custBankInfo.length < 3 ? (
			<div className="btn-group">
				<Link className="orange" to={`${path.bankInfo.root}`}>
					+
				</Link>
			</div>
		) : null;

	return (
		<>
			<div className="title">
				<span className="text-org">*</span>
				{i18n.lbl_BankDetails}
			</div>
			<div className="selectModule">
				<Dropdown
					defaultOption={
						selBankAccount === null
							? i18n.lbl_LocalBankBankAccountTip
							: null
					}
					className="parts active"
					mainKey="localbank-depositBankDetails"
					colName="BankDetails"
					selectedIdx={selBankAccount}
					options={custBankInfo}
					onSelectItem={HandleBankAccount}
					infoText={i18n.lbl_LocalBankBankAccountTip}
					// showTips={showTips.includes("tip")}
					// clickInfo={() => showTipHandler("tip")}
					hideInfo={true}
					checked={bankAccountSetWarning.status}
					warningMsg={bankAccountSetWarning.msg}
					i18n={i18n}
					onBlur={() => HandleBankAccount(null)}
					rightBtn={rightBtn}
				/>
			</div>
		</>
	);
};

export default DepositChannel;
