import React, { useContext, useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { i18nContext, userInfoContext, popBoxContext } from "Context";
import { number_format, isConvert } from "../common/common";
import ReloadSpin from "../common/reloadSpin";
import BonusWallet from "./profile.wallet.bonus";
import api from "../../service/api";
import { tpWalletsListType } from "../transfer/transfer.def";
import useGetBalance from "../hook/useGetMainBalance";
import useGetTpBalance from "../hook/useGetTpBalance";

export default () => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
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
			api.account.GetCustBonusWallet().then(
				res => {
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
					} else if (res.data.errorCode !== 0) {
						setPopBox({
							isOpen: true,
							content: `[${res.data.errorCode}] ${res.data.message}`
						});
					}
				},
				() => {
					setPopBox({
						isOpen: true,
						content: i18n.msg_ApiServerError
					});
				}
			);
		}
	}, [userInfo.isLogin]);

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
				testAttr={t.displayKey}
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
				testAttr="mainWallet"
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
	bonusWallet,
	testAttr
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
						{...b}
					/>
				);
			});

	return (
		<div className="account" data-testid={testAttr}>
			<div className="info">
				<span className="title">{i18n[titleKey]}</span>
				<div>
					<span className="text-org">
						{i18n[`Currency_${currencyId}`]}
						{i18n.lbl_Cash}
					</span>{" "}
					{number_format(balance, isConvert(currencyId))}
				</div>
			</div>
			<ReloadSpin func={func_GetBalance} />
			{_bonusWallet}
		</div>
	);
};

Wallet.defaultProps = {
	titleKey: "",
	currencyId: null,
	balance: null,
	bonusWallet: [],
	testAttr: null
};

Wallet.propTypes = {
	titleKey: PropTypes.string,
	currencyId: PropTypes.number,
	balance: PropTypes.number,
	func_GetBalance: PropTypes.func.isRequired,
	bonusWallet: PropTypes.arrayOf(PropTypes.object),
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	testAttr: PropTypes.string
};
