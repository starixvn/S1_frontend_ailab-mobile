import React, { useContext, useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { i18nContext, userInfoContext } from "../common/context";
import { number_format } from "../common/common";
import { api_account_GetCustBonusWallet } from "../../service/api/account";
import ReloadSpin from "../common/reloadSpin";
import BonusWallet from "./profile.wallet.bonus";
import { tpWalletsListType } from "../transfer/transfer.def";
import useGetBalance from "../hook/useGetMainBalance";
import useGetTpBalance from "../hook/useGetTpBalance";

export default () => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const [bonusWallet, setBonusWallet] = useState({});

	const { mainWalletInfo, GetBalance } = useGetBalance({
		isLogin: userInfo.isLogin
	});
	const { tpWalletsList, GetTpWalletBalance } = useGetTpBalance({
		isLogin: userInfo.isLogin,
		listType: tpWalletsListType.afterTransWallets
	});

	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		if (userInfo.isLogin) {
			api_account_GetCustBonusWallet().then(res => {
				if (res.data.errorCode === 0 && isMountedRef.current) {
					const result = {};
					res.data.data.forEach(b => {
						if (result.tpId) {
							result[b.tpId].push({
								...b
							});
						} else {
							result[b.tpId] = [{ ...b }];
						}
					});
					setBonusWallet(result);
				}
			});
		}
	}, []);

	const _tpWalletArrs = tpWalletsList.map(t => {
		return (
			<Wallet
				key={`profile-tpWalletArr-${t.id}`}
				i18n={i18n}
				titleKey={t.displayKey}
				currencyId={userInfo.currencyId}
				balance={t.balance}
				func_GetBalance={GetTpWalletBalance.bind(this, t.id)}
				bonusWallet={bonusWallet[t.id]}
			/>
		);
	});

	return (
		<>
			<Wallet
				i18n={i18n}
				titleKey="lbl_MainWallet"
				currencyId={userInfo.currencyId}
				balance={mainWalletInfo.balance}
				func_GetBalance={GetBalance}
				bonusWallet={bonusWallet[0]}
			/>
			{_tpWalletArrs}
		</>
	);
};

const Wallet = ({
	i18n,
	currencyId,
	titleKey,
	balance,
	func_GetBalance,
	bonusWallet
}) => {
	const _bonusWallet =
		bonusWallet &&
		bonusWallet
			.filter(b => b.status === 0 || b.status === 1)
			.map(b => {
				return (
					<BonusWallet
						key={`profile-wallet-${titleKey}-${b.promoCategoryId}`}
						i18n={i18n}
						currencyId={currencyId}
						titleKey={b.titleKey}
						balance={b.balance}
						func_GetBalance={b.func_GetBalance}
						bonusWallet={b.bonusWallet}
					/>
				);
			});

	return (
		<div className="account">
			<div className="info">
				<span className="title">{i18n[titleKey]}</span>
				<div>
					<span className="text-org">
						{i18n[`Currency_${currencyId}`]}
					</span>{" "}
					{number_format(balance, false)}
				</div>
			</div>
			<ReloadSpin func={func_GetBalance} />
			{_bonusWallet}
		</div>
	);
};

Wallet.defaultProps = {
	titleKey: "",
	func_GetBalance: null,
	bonusWallet: [],
	currencyId: null,
	balance: 0
};

Wallet.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	currencyId: PropTypes.number,
	titleKey: PropTypes.string,
	balance: PropTypes.number,
	func_GetBalance: PropTypes.func,
	bonusWallet: PropTypes.arrayOf(PropTypes.object)
};
