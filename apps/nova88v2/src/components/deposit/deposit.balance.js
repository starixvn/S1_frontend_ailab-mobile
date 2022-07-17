import React, { useContext, useEffect, useState } from "react";
import useGetBalance from "../hook/useGetMainBalance";
import { i18nContext, userInfoContext } from "../common/context";
import { isConvert, number_format } from "../common/common";
import useGetTpBalance from "../hook/useGetTpBalance";
import { tpWalletsListType } from "../transfer/transfer.def";
import api from "../../service/api";

const Balance = () => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const { tpWalletsList } = useGetTpBalance({
		isLogin: userInfo.isLogin,
		listType: tpWalletsListType.afterTransWallets
	});
	const { mainWalletInfo } = useGetBalance({
		isLogin: userInfo.isLogin
	});
	const [bonusWallets, setBonusWallet] = useState({});
	useEffect(() => {
		if (userInfo.isLogin) {
			api.account.GetCustBonusWallet().then(res => {
				if (res.data.errorCode === 0) {
					const result = {};
					res.data.data.forEach(b => {
						result[b.tpId] = b;
					});
					setBonusWallet(result);
				} else {
					setPopBox({
						isOpen: true,
						content: `[${res.data.errorCode}] ${res.data.message}`
					});
				}
			});
		}
	}, []);
	let total =
		tpWalletsList.reduce((accumulator, currentValue) => {
			return accumulator + currentValue.balance;
		}, 0) + mainWalletInfo.balance;
	Object.values(bonusWallets).forEach(w => {
		total += w.bonus;
	});
	const _isConvert = isConvert(userInfo.currencyId);
	return (
		<div className="mainWallet">
			<div className="account">
				<div className="icon icon-icon32px_wallet">
					{i18n.lbl_Balance}
				</div>
				<div>
					{i18n[`Currency_${userInfo.currencyId}`]} $
					{number_format(total, _isConvert, 2)}
				</div>
			</div>
		</div>
	);
};

export default Balance;
