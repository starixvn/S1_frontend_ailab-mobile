/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { Link } from "../../route/link";
import Dropdown from "../common/dropdown";
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

const DepositChannel = ({
	i18n,
	DepositChannelProps,
	BankAccountProps,
	userPaymentData
}) => {
	return (
		<>
			<Channel
				i18n={i18n}
				DepositChannelProps={DepositChannelProps}
				userPaymentData={userPaymentData?.fromChannel}
			/>
			{DepositChannelProps.selDepositChannel !== null &&
			(defDepositChannel[DepositChannelProps.selDepositChannel].value ===
				defDepChannelValue.OnlineBanking ||
				defDepositChannel[DepositChannelProps.selDepositChannel]
					.value === defDepChannelValue.ATM) ? (
				<BankAccount
					i18n={i18n}
					BankAccountProps={BankAccountProps}
					userPaymentData={userPaymentData}
				/>
			) : null}
		</>
	);
};

const Channel = ({ i18n, DepositChannelProps, userPaymentData }) => {
	const {
		selDepositChannel,
		HandleDepositChannel,
		depositChannelWarning
	} = DepositChannelProps;

	useEffect(() => {
		if (userPaymentData) {
			const idx = Object.values(defDepChannelValue).findIndex(
				i => i === userPaymentData
			);
			HandleDepositChannel(idx);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<div className="title">
				<span>*</span>
				{i18n.lbl_DepositChannel}
			</div>
			<Dropdown
				mainKey="localbank-depositChannel"
				colName="Channel"
				selectedIdx={selDepositChannel}
				options={defDepositChannel}
				onSelectItem={HandleDepositChannel}
				infoText={i18n.lbl_LocalBankDepositChannelTip}
				hideInfo={true}
				checked={depositChannelWarning.status !== 1 ?? null}
				warningMsg={depositChannelWarning.msg}
				i18n={i18n}
				onBlur={() => HandleDepositChannel(null)}
			/>
		</>
	);
};

const BankAccount = ({ i18n, BankAccountProps, userPaymentData }) => {
	const {
		HandleBankAccount,
		selBankAccount,
		custBankInfo,
		bankAccountlWarning
	} = BankAccountProps;

	useEffect(() => {
		if (userPaymentData && custBankInfo) {
			const idx = custBankInfo.findIndex(
				obj =>
					obj.SysId === userPaymentData?.fromSysId &&
					obj.accountNo === userPaymentData?.fromAccountNum
			);
			HandleBankAccount(idx);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [custBankInfo]);

	const rightBtn =
		custBankInfo.length < 3 ? (
			<div className="btn-group">
				<Link
					className="orange"
					to={`${path.bankInfo.root}`}
					state={{ prevPage: "deposit" }}>
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
			<div className="selectModule inner">
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
					hideInfo={true}
					checked={bankAccountlWarning.status !== 1 ?? null}
					warningMsg={bankAccountlWarning.msg}
					i18n={i18n}
					onBlur={() => HandleBankAccount(null)}
					rightBtn={rightBtn}
				/>
			</div>
		</>
	);
};

export default DepositChannel;
