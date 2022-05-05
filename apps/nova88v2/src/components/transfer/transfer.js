import React, { useContext } from "react";
import { i18nContext, userInfoContext, popBoxContext } from "../common/context";
import { isConvert, number_format } from "../common/common";
import RecentDatas from "./transfer.recentDatas";
import InputBox from "../common/inputbox.hint";
import { defIptStatus } from "../common/inputStatus";
import Dropdown from "../common/dropdown";
import ReloadSpin from "../common/reloadSpin";
import useTip from "../hook/useTip";
import {
	tpWalletsListType,
	transDirection,
	defWalletMode
} from "./transfer.def";
import useGetBalance from "../hook/useGetMainBalance";
import useGetTpBalance from "../hook/useGetTpBalance";
import useHandelAutoTrnasfer from "./autoTransfer";
import { useTransfer } from "./hook/useTransfer";

const Panel = () => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);

	const _isConvert = isConvert(userInfo.currencyId);

	const { showTips, showTipHandler } = useTip();

	const { mainWalletInfo, GetBalance } = useGetBalance({
		isLogin: userInfo.isLogin
	});

	const { tpWalletsList, GetTpWalletBalance } = useGetTpBalance({
		isLogin: userInfo.isLogin,
		listType: tpWalletsListType.allWallets
	});
	const { autoTransfer, setWalletTransferStatus } = useHandelAutoTrnasfer({
		i18n,
		setPopBox
	});

	const {
		amount,
		warning,
		recentDatas,
		restoreAll,
		clickSubmit,
		EditAmount,
		setMaxAmount,
		allWalletsList,
		selectItem,
		selectedIdx
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
		.map((wallet, i) => {
			return (
				<div className="account" key={`transfer-wallet-${wallet.id}`}>
					<div className="info">
						<span className="title">
							{i18n[wallet.displayKey] ?? wallet.displayText}
						</span>
						<div>{number_format(wallet.balance, _isConvert)}</div>
					</div>
					<div className="btn-group transferAll">
						<ReloadSpin
							func={
								wallet.id === 0
									? GetBalance
									: GetTpWalletBalance.bind(this, wallet.id)
							}
						/>
						{wallet.walletMode === defWalletMode.special ? (
							<button
								className="red"
								onClick={() =>
									selectItem(transDirection.to, i)
								}>
								<div>{i18n.lbl_Manual}</div>
							</button>
						) : (
							<button
								className="blue"
								onClick={restoreAll.bind(this, {
									tpId: wallet.id
								})}>
								<div>{i18n.lbl_RestoreAll}</div>
							</button>
						)}
					</div>
				</div>
			);
		});

	return (
		<>
			<div className="swithModule">
				{i18n.lbl_AutoTransfer}
				<button
					className={`switchBtn${autoTransfer ? " active" : ""}`}
					onClick={setWalletTransferStatus}>
					<span>{autoTransfer ? "ON" : ""}</span>
					<span>{autoTransfer ? "" : "OFF"}</span>
					<div className={autoTransfer ? "active" : ""} />
				</button>
			</div>
			{arr}
			<div className="text-org title">{i18n.lbl_From}</div>
			<Dropdown
				mainKey="transfer-From"
				options={allWalletsList}
				selectedIdx={selectedIdx.transferFrom}
				i18n={i18n}
				onSelectItem={selectItem.bind(this, transDirection.from)}
				colName="transferFrom"
				hideInfo={true}
			/>

			<div className="text-org title">{i18n.lbl_To}</div>
			<Dropdown
				mainKey="transfer-To"
				options={allWalletsList}
				selectedIdx={selectedIdx.transferTo}
				onSelectItem={selectItem.bind(this, transDirection.to)}
				i18n={i18n}
				colName="transferTo"
				hideInfo={true}
			/>

			<InputBox
				icon="icon-pencil"
				placeholder={i18n.lbl_Amount}
				onChange={EditAmount}
				value={amount}
				btnStatus={warning.status}
				warningMsg={warning.msg}
				inputType="tel"
				infoText={i18n.lbl_AmountTooltip?.replace("{{0}}", 1)}
				showTips={showTips.includes("amount")}
				clickInfo={() => showTipHandler("amount")}
			/>

			<div className="btn-group">
				<button
					className={
						selectedIdx.transferFrom === null ? "white" : "blue"
					}
					onClick={setMaxAmount}>
					{i18n.lbl_MaxAmount}
				</button>
				<button
					className={
						selectedIdx.transferFrom !== null &&
						selectedIdx.transferTo !== null &&
						warning.status === defIptStatus.verified
							? "orange"
							: "gray"
					}
					onClick={clickSubmit}>
					{i18n.lbl_Transfer}
				</button>
			</div>
			<RecentDatas datas={recentDatas} />
		</>
	);
};

export default Panel;
