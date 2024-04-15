import React, { useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import { userInfoContext } from "../../common/context";
import useGetBalance from '../../hook/useGetMainBalance'
import useGetTpBalance from "../../hook/useGetTpBalance";
import useGetBonusBalance from "../../hook/useGetBonusBalance";
import { tpWalletsListType } from "../../transfer/transfer.def";
import { number_format } from "../../newHome/utils/homeFormatter";
import MemberBonusWallet from "./MemberBonusWallet";

const MemberWallet = () => {
	const { userInfo } = useContext(userInfoContext);
	const { t } = useTranslation();

	const [showingBalance, setShowingBalance] = useState(true);

	const { mainWalletInfo, GetBalance } = useGetBalance({
		isLogin: userInfo.isLogin
	});
	const { tpWalletsList, GetTpWalletList } = useGetTpBalance({
		isLogin: userInfo.isLogin,
		listType: tpWalletsListType.allWallets
	});
	const { bonusWallets, GetBonusBalance } = useGetBonusBalance({
		isLogin: userInfo.isLogin
	});

	const tpWalletBalance = tpWalletsList?.reduce((prev, curr) => {
		return prev + curr.balance;
	}, 0);

	const bonusWalletsBalance = Object.values(bonusWallets).reduce(
		(prev, curr) => {
			return prev + curr.bonus;
		},
		0
	);

	const allWalletBalance =
		mainWalletInfo.balance + tpWalletBalance + bonusWalletsBalance;

	const balance = !allWalletBalance
		? 0
		: number_format(allWalletBalance, false);

	const clickReloadSpin = e => {
		GetBalance();
		GetTpWalletList({ langId: userInfo.langId });
		GetBonusBalance();
		e.currentTarget.classList.toggle("active");
	};
	const clickEye = () => {
		setShowingBalance(prev => !prev);
	};

	return (
		<div className="member-wallet">
			<div className="wallet">
				<div className="balance-behavior">
					<span>{t("lbl_Balance")}</span>
					<button
						className={`icon icon-eye${
							showingBalance ? "" : "-close"
						}`}
						onClick={clickEye}
					/>
				</div>
				{/* 會員餘額 */}
				<div className="wallet-balance">
					<span>{t(`Currency_${userInfo.currencyId}`)}</span>
					<div className="number active">
						<span>
							{showingBalance ? balance : "*****"}
							<button
								className="icon icon-spinner11"
								onClick={clickReloadSpin}
							/>
						</span>
					</div>
				</div>
				<MemberBonusWallet />
			</div>
		</div>
	);
};

export default MemberWallet;
