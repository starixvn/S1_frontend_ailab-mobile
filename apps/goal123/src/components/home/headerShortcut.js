import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "@reach/router";
import { number_format } from "../common/common";
import { tpWalletsListType } from "../transfer/transfer.def";
import useGetBalance from "../hook/useGetMainBalance";
import useGetTpBalance from "../hook/useGetTpBalance";
import useGetBonusBalance from "../hook/useGetBonusBalance";
import ReloadSpin from "../common/reloadSpin";
import path from "../../path";

const HeaderShortcut = ({ userInfo, i18n }) => {
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

	const clickReloadSpin = () => {
		GetBalance();
		GetTpWalletList({ langId: userInfo.langId });
		GetBonusBalance();
	};

	const clickEye = () => {
		setShowingBalance(prev => !prev);
	};

	return (
		<div className="walletBox open">
			<div className="side-info">
				<p>{i18n.lbl_Balance}</p>
				<div>
					<button
						className={`icon icon-eye${
							showingBalance ? "" : "-blocked"
						}`}
						onClick={clickEye}
					/>
					<q className="money">
						<span>{i18n[`Currency_${userInfo.currencyId}`]}</span>
						{showingBalance ? balance : "*****"}
					</q>
					<ReloadSpin func={clickReloadSpin} />
				</div>
			</div>
			<div className="content">
				<Link
					to={`/${path.deposit.root}`}
					className="icon icon-deposit">
					<span>{i18n.lbl_Deposit}</span>
				</Link>
				{/* <Link
					to={`/${path.transfer.root}`}
					className="icon icon-transfer">
					<span>{i18n.lbl_Transfer}</span>
				</Link> */}
				<Link
					to={`/${path.financialLog.root}`}
					className="icon icon-icon32px_History">
					<span>{i18n.lbl_FinancialLog}</span>
				</Link>
			</div>
		</div>
	);
};

HeaderShortcut.propTypes = {
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	i18n: PropTypes.objectOf(PropTypes.string).isRequired
};

export default HeaderShortcut;
