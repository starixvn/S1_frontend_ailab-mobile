import React, { useContext, useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
	i18nContext,
	userInfoContext,
	walletInfoContext,
	popBoxContext
} from "../common/context";
import { number_format } from "../common/common";
import {
	api_GetBalnace,
	api_account_GetCustBonusWallet,
	api_account_GetTpWalletList,
	api_account_GetTpWalletBalance
} from "../../service/api/account";
import ReloadSpin from "../common/reloadSpin";
import BonusWallet from "./profile.wallet.bonus";
import { tpWalletsListType } from "../transfer/transfer.def";

export default () => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { walletInfo, setWalletInfo } = useContext(walletInfoContext);
	const [tpWalletList, setTpWalletList] = useState([]);
	const [bonusWallet, setBonusWallet] = useState({});
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		GetBalance();
		api_account_GetTpWalletList({
			ListType: tpWalletsListType.afterTransWallets
		}).then(
			res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						res.data.data?.forEach(wallet => {
							GetTpWalletBalance(wallet.tpId);
						});
					} else {
						setPopBox({
							isOpen: true,
							title: i18n.lbl_ImportantNote,
							content: `[${res.data.errorCode}]${res.data.message}`
						});
					}
				}
			},
			err => {
				if (isMountedRef.current) {
					setPopBox({
						isOpen: true,
						title: i18n.lbl_ImportantNote,
						content: i18n.msg_ApiServerError
					});
				}
			}
		);
	}, [i18n, setPopBox]);

	const GetBalance = () => {
		api_GetBalnace().then(
			res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						const { data } = res.data;
						if (data !== null) {
							if (isMountedRef.current) {
								setWalletInfo(prevState => ({
									...prevState,
									main: data
								}));
							}
						}
					} else {
						setPopBox({
							isOpen: true,
							title: i18n.lbl_ImportantNote,
							content: `[${res.data.errorCode}]${res.data.message}`
						});
					}
				}
			},
			err => {
				if (isMountedRef.current) {
					setPopBox({
						isOpen: true,
						title: i18n.lbl_ImportantNote,
						content: i18n.msg_ApiServerError
					});
				}
			}
		);

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
	};

	const GetTpWalletBalance = tpId => {
		api_account_GetTpWalletBalance({ TpId: tpId }).then(
			res => {
				if (res.data.errorCode === 0) {
					const _datas = res.data.data;
					const tpWalletData = {
						id: _datas.tpId,
						displayKey: `lbl_TpWallet_${_datas.tpId}`,
						balance: _datas.balance
					};

					setTpWalletList(prev => {
						const tpWalletIdx = prev.findIndex(
							wallet => wallet.id === tpId
						);
						if (tpWalletIdx !== -1) {
							prev[tpWalletIdx] = tpWalletData;
							return prev;
						}
						return [...prev, tpWalletData];
					});
				}
			},
			() => {
				if (isMountedRef.current) {
					setPopBox({
						isOpen: true,
						title: i18n.lbl_ImportantNote,
						content: i18n.msg_ApiServerError
					});
				}
			}
		);
	};

	const _tpWalletArrs = tpWalletList.map(t => {
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
				balance={walletInfo.main}
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
	GetBalance,
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
			<ReloadSpin func={GetBalance} />
			{_bonusWallet}
		</div>
	);
};

Wallet.defaultProps = {
	titleKey: "",
	GetBalance: null,
	bonusWallet: [],
	currencyId: null,
	balance: 0
};

Wallet.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	currencyId: PropTypes.number,
	titleKey: PropTypes.string,
	balance: PropTypes.number,
	GetBalance: PropTypes.func,
	bonusWallet: PropTypes.arrayOf(PropTypes.object)
};
