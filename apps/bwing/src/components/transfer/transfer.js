import React, { useContext } from "react";
import { i18nContext, userInfoContext, popBoxContext } from "../common/context";
import { isConvert } from "../common/common";
import RecentDatas from "./transfer.recentDatas";
import WalletPanel from "./walletPanel";
import AmountPanel from "./amountPanel";
import useGetBalance from "../hook/useGetMainBalance";
import useGetTpBalance from "../hook/useGetTpBalance";
import { useTransfer } from "./hook/useTransfer";

export const tpWalletsListType = {
	allWallets: 0,
	afterTransWallets: 1
};

const Panel = () => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const _isConvert = isConvert(userInfo.currencyId);

	const { mainWalletInfo, GetBalance } = useGetBalance();
	const { tpWalletsList, GetTpWalletBalance } = useGetTpBalance({
		listType: tpWalletsListType.allWallets
	});

	const {
		amount,
		warning,
		recentDatas,
		clickSubmit,
		EditAmount,
		allWalletsList,
		selectItem,
		selectedIdx,
		GetTransferRecent
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

	return (
		<div className="depositBox">
			<WalletPanel
				i18n={i18n}
				walletInfo={allWalletsList}
				GetBalance={GetBalance}
				GetTpWalletBalance={GetTpWalletBalance}
			/>
			<AmountPanel
				i18n={i18n}
				amount={amount}
				EditAmount={EditAmount}
				warning={warning}
				clickSubmit={clickSubmit}
				selectedIdx={selectedIdx}
				selectItem={selectItem}
				allWalletsList={allWalletsList}
			/>
			<RecentDatas
				datas={recentDatas}
				GetRecentDatas={GetTransferRecent}
			/>
		</div>
	);
};

export default Panel;
