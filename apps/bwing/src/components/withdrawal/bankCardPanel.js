import React, { useEffect, useRef, useContext, useState } from "react";
import { paymentImgUrl } from "../../config";
import { api_DelCustBankInfo } from "../../service/api/accountStrict";
import { popBoxContext } from "../common/context";
import path from "../../path";

export default ({
	i18n,
	accountName,
	custBankInfo,
	selBank,
	setSelBank,
	setRedirectPath,
	GetCustBankInfo,
	SelectBank
}) => {
	const { setPopBox } = useContext(popBoxContext);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const ClosePopBox = () => {
		setPopBox({ isOpen: false });
	};

	const addBankAccount = () => {
		setRedirectPath(
			`/${path.member.root}/${path.member.sub.bankInfo.root}`
		);
	};

	const delAccount = (accountNo, sysId) => {
		const delBankInfo = () => {
			api_DelCustBankInfo({
				AccountName: accountName,
				AccountNo: accountNo,
				SysId: sysId
			}).then(
				res => {
					if (isMountedRef.current) {
						if (res.data.errorCode === 0) {
							GetCustBankInfo();
							if (
								accountNo === selBank?.accountNo &&
								sysId === selBank?.sysId
							) {
								setSelBank(null);
							}
							setPopBox({ isOpen: false });
						} else {
							setPopBox({
								isOpen: true,
								content: `[${res.data.errorCode}] ${res.data.message}`
							});
						}
					}
				},
				() => {
					if (isMountedRef.current) {
						setPopBox({
							isOpen: true,
							content: i18n.msg_ApiServerError
						});
					}
				}
			);
		};

		setPopBox({
			isOpen: true,
			title: i18n.lbl_ImportantNote,
			content: i18n.lbl_CheckConfirm,
			hasBtn: true,
			btnBar: (
				<div className="btn-group">
					<button className="gray" onClick={delBankInfo}>
						{i18n.lbl_Yes}
					</button>
					<button className="blue" onClick={ClosePopBox}>
						{i18n.lbl_No}
					</button>
				</div>
			)
		});
	};

	const arr = custBankInfo?.map(item => {
		const _key = `withdrawal-bankCard-${item.sysId}-${item.accountNo}`;
		const _checked =
			item.accountNo === selBank?.accountNo &&
			item.sysId === selBank?.sysId;

		return (
			<BankCard
				key={_key}
				checkKey={`${item.sysId}-${item.accountNo}`}
				{...item}
				selectAccount={SelectBank.bind(this, item)}
				checked={_checked}
				delAccount={delAccount.bind(this, item.accountNo, item.sysId)}
			/>
		);
	});

	return (
		<div className="addBank">
			<div className="remainder">
				{i18n.lbl_NumberOfBankAccounts}:{custBankInfo?.length ?? 0}/3
			</div>
			{custBankInfo.length > 0 ? arr : null}

			{custBankInfo.length < 3 ? (
				<div className="addBankName noBank" onClick={addBankAccount}>
					<div className="icon icon-plus" />
					<div>{i18n.lbl_AddBankAccount}</div>
				</div>
			) : null}
		</div>
	);
};

const BankCard = props => {
	return (
		<div className={`addBankName ${props?.disabled ? "pending" : ""}`}>
			{props?.disabled && <div className="mask" />}
			<div className="addBankInfo">
				<div className="bankName">
					<img
						src={`${paymentImgUrl}/${props.bankLogo?.toLowerCase()}`}
						alt={props.bankName}
					/>
				</div>
				<div>
					{props.hideDelBtn ? null : (
						<button
							className="icon icon-bin"
							onClick={props.delAccount}
						/>
					)}
					<div className="checkbox">
						<input
							disabled={props.disabled}
							type="checkbox"
							id={props.checkKey}
							onChange={props.selectAccount}
							checked={props.checked}
						/>
						<label
							htmlFor={props.checkKey}
							className="icon icon-checkbox-checked"
						/>
					</div>
				</div>
			</div>
			<div className="addBankInfo">
				<div>
					<span>{props.accountNo?.slice(0, 4)}</span>
					<span>{props.accountNo?.slice(4, 8)}</span>
					<span>{props.accountNo?.slice(8, 12)}</span>
					<span>{props.accountNo?.slice(12, 16)}</span>
				</div>
			</div>
		</div>
	);
};
