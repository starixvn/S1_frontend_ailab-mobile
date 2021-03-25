import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "../../route/link";
import ReloadSpin from "../common/reloadSpin";
import { number_format, isConvert } from "../common/common";
import { tpWalletsListType } from "../transfer/transfer.def";
import useGetBalance from "../hook/useGetMainBalance";
import useGetTpBalance from "../hook/useGetTpBalance";
import path from "../../path";

const HeaderShortcut = ({ i18n, userInfo, showingShortcut }) => {
	const [showingBalance, setShowingBalance] = useState(true);
	const { mainWalletInfo, GetBalance } = useGetBalance({
		isLogin: userInfo.isLogin
	});
	const { tpWalletsList, GetTpWalletList } = useGetTpBalance({
		isLogin: userInfo.isLogin,
		listType: tpWalletsListType.allWallets
	});

	const otherWalletBalance = tpWalletsList?.reduce((prev, curr) => {
		return prev + curr.balance;
	}, 0);
	const allWalletBalance = mainWalletInfo.balance + otherWalletBalance;
	const balance = !allWalletBalance
		? 0
		: number_format(allWalletBalance, isConvert(userInfo.currencyId));

	const clickReloadSpin = () => {
		GetBalance();
		GetTpWalletList();
	};

	const clickEye = () => {
		setShowingBalance(prev => !prev);
	};

	return (
		<div className={`submenu${showingShortcut ? " active" : ""}`}>
			<div className="Balance">
				<button
					className={
						showingBalance
							? "icon icon-eye"
							: "icon icon-eye icon-eye-blocked"
					}
					onClick={clickEye}
				/>
				<div>
					{i18n[`Currency_${userInfo.currencyId}`]}{" "}
					{showingBalance ? balance : "*****"}
				</div>
				<ReloadSpin func={clickReloadSpin} />
			</div>
			<div className="thBar">
				<Link to={path.deposit.root}>
					<i className="icon icon-deposit" />
					<span>{i18n.lbl_Deposit}</span>
				</Link>
				<Link to={path.transfer.root}>
					<i className="icon icon-transfer" />
					<span>{i18n.lbl_Transfer}</span>
				</Link>
				<Link to={path.withdrawal.root}>
					<i className="icon icon-withdrawal" />
					<span>{i18n.lbl_Withdrawal}</span>
				</Link>
				<Link to={path.promotion.root}>
					<i className="icon icon-gift" />
					<span>{i18n.lbl_Promotion}</span>
				</Link>
				<Link to={path.statement.root}>
					<i className="icon icon-history" />
					<span>{i18n.lbl_Statement}</span>
				</Link>
			</div>
		</div>
	);
};

HeaderShortcut.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	showingShortcut: PropTypes.bool.isRequired
};

export default HeaderShortcut;
