import React from "react";
import PropTypes from "prop-types";
import { Link } from "@reach/router";
import { number_format } from "../common/common";
import { tpWalletsListType } from "../transfer/transfer.def";
import useGetBalance from "../hook/useGetMainBalance";
import useGetTpBalance from "../hook/useGetTpBalance";
import ReloadSpin from "../common/reloadSpin";
import path from "../../path";

const HeaderShortcut = ({ userInfo, i18n }) => {
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
		: number_format(allWalletBalance, false);

	const clickReloadSpin = () => {
		GetBalance();
		GetTpWalletList();
	};

	return (
		<div className="walletBox">
			<div className="side-info">
				<div>{i18n.lbl_Balance}</div>
				<div>
					<span>{i18n[`Currency_${userInfo.currencyId}`]} </span>
					{balance}
					<ReloadSpin func={clickReloadSpin} />
				</div>
			</div>
			<div className="content">
				<Link to={path.deposit.root} className="icon icon-deposit">
					<span>{i18n.lbl_Deposit}</span>
				</Link>
				<Link to={path.transfer.root} className="icon icon-transfer">
					<span>{i18n.lbl_Transfer}</span>
				</Link>
				<Link
					to={path.withdrawal.root}
					className="icon icon-withdrawal">
					<span>{i18n.lbl_Withdrawal}</span>
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
