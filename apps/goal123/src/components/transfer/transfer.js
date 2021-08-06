import React, { useContext } from "react";
import { i18nContext, userInfoContext, popBoxContext } from "../common/context";
import { isConvert, number_format } from "../common/common";
import RecentDatas from "./transfer.recentDatas";
import InputBox from "../common/inputbox.info";
import Dropdown from "../common/dropdown";
import ReloadSpin from "../common/reloadSpin";
import { tpWalletsListType } from "./transfer.def";
import useGetBalance from "../hook/useGetMainBalance";
import useGetTpBalance from "../hook/useGetTpBalance";
import { useTransfer } from "./hook/useTransfer";
import useHandleAutoTransfer from "./hook/useHandleAutoTransfer";

const Panel = () => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const _isConvert = isConvert(userInfo.currencyId);

	const { mainWalletInfo, GetBalance } = useGetBalance({
		isLogin: userInfo.isLogin
	});
	const { tpWalletsList, GetTpWalletBalance } = useGetTpBalance({
		isLogin: userInfo.isLogin,
		listType: tpWalletsListType.allWallets
	});
	const { autoTransfer, setWalletTransferStatus } = useHandleAutoTransfer({
		i18n,
		setPopBox
	});

	const {
		amount,
		inputStatus,
		recentDatas,
		clickSubmit,
		EditAmount,
		allWalletsList,
		selectItem,
		selectedIdx,
		GetTransferRecent,
		setMaxAmount,
		clickInfo,
		ValidAmount
	} = useTransfer({
		GetBalance,
		GetTpWalletBalance,
		tpWalletsList,
		setPopBox,
		userInfo,
		mainWalletInfo,
		i18n,
		_isConvert
	});

	const arr = allWalletsList
		.filter(wallet => {
			return wallet.balance !== null;
		})
		.map(wallet => {
			return (
				<div className="account" key={`transfer-wallet-${wallet.id}`}>
					<div className="info">
						<span className="title">{i18n[wallet.displayKey]}</span>
						<div>{number_format(wallet.balance, false)}</div>
					</div>
					<ReloadSpin
						func={
							wallet.id !== 0
								? GetTpWalletBalance.bind(this, wallet.id)
								: GetBalance
						}
					/>
				</div>
			);
		});

	return (
		<>
			<div className="swithModule">
				{i18n.lbl_Main_Wallet_Auto_Transfer}
				<button
					className={`switchBtn${autoTransfer ? " active" : ""}`}
					onClick={setWalletTransferStatus}>
					<span>{autoTransfer ? "ON" : ""}</span>
					<span>{autoTransfer ? "" : "OFF"}</span>
					<div className={autoTransfer ? "active" : ""} />
				</button>
			</div>
			{arr}
			<div className="inputBox">
				<Dropdown
					mainKey="transfer-From"
					options={allWalletsList}
					placeholder={i18n.lbl_TransferFrom}
					selectedIdx={selectedIdx.transferFrom}
					i18n={i18n}
					onSelectItem={selectItem.bind(this, "transferFrom")}
					colName="transferFrom"
				/>
			</div>

			<div className="inputBox">
				<Dropdown
					mainKey="transfer-To"
					options={allWalletsList}
					placeholder={i18n.lbl_TransferTo}
					selectedIdx={selectedIdx.transferTo}
					onSelectItem={selectItem.bind(this, "transferTo")}
					i18n={i18n}
					colName="transferTo"
				/>
			</div>

			<InputBox
				icon="icon icon-pencil"
				value={amount}
				inputType="tel"
				onChange={EditAmount}
				btnStatus={inputStatus.checked}
				tip={inputStatus.msg}
				clickInfo={clickInfo}
				onBlur={ValidAmount.bind(this, amount)}
			/>

			<div className="btn-group">
				<button className="blue" onClick={setMaxAmount}>
					{i18n.lbl_MaxAmount}
				</button>
				<button className="orange" onClick={clickSubmit}>
					{i18n.lbl_Transfer}
				</button>
			</div>

			<RecentDatas
				datas={recentDatas}
				GetRecentDatas={GetTransferRecent}
			/>
		</>
	);
};

export default Panel;
