import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import ReloadSpin from "../common/reloadSpin";
import { number_format, isConvert } from "../common/common";
import { tpWalletsListType } from "../transfer/transfer.def";
import useGetBalance from "../hook/useGetMainBalance";
import useGetTpBalance from "../hook/useGetTpBalance";

const Balance = ({ i18n, userInfo }) => {
	const [showingBalance, setShowingBalance] = useState(true);
	const [showInfoIcon, setShowInfoIcon] = useState(false);
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

	const toggleShowInfoIcon = () => {
		setShowInfoIcon(prev => !prev);
	};

	return (
		<div className="Balance">
			<button
				className={
					showingBalance ? "icon icon-minus" : "icon icon-plus"
				}
				onClick={clickEye}>
				{i18n[`Currency_${userInfo.currencyId}`]}{" "}
			</button>

			<button
				className={classNames("icon icon-information", {
					active: showInfoIcon
				})}
				onClick={toggleShowInfoIcon}>
				<div className="note">
					{i18n.Label_Header_WinLossAmountHint}
				</div>
			</button>

			{showingBalance ? (
				<div>
					{`$${balance}`}
					<ReloadSpin func={clickReloadSpin} />
				</div>
			) : null}
		</div>
	);
};

Balance.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired
};

export default Balance;
