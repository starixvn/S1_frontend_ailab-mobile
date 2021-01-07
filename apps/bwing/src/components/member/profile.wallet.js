import React, { useContext, useRef, useEffect, useState } from "react";
import {
	i18nContext,
	userInfoContext,
	walletInfoContext,
	popBoxContext
} from "../common/context";
import { number_format } from "../common/common";
import {
	api_GetBalnace,
	api_account_GetTpWalletList,
	api_account_GetTpWalletBalance,
	api_account_GetCustBonusWallet
} from "../../service/api/account";
import ReloadSpin from "../common/reloadSpin";
import BonusWallet from "./profile.wallet.bonus";
import { tpWalletsListType } from "../transfer/transfer";

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
		return () => (isMountedRef.current = false);
	});

	useEffect(() => {
		GetBalance();
		api_account_GetTpWalletList({
			ListType: tpWalletsListType.afterTransWallets
		}).then(
			res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						res.data.data?.forEach(i => {
							GetTpWalletBalance(i.tpId);
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
	}, []);

	const GetBalance = () => {
		api_GetBalnace().then(
			res => {
				if (res.data.errorCode === 0) {
					let data = res.data.data;
					if (data !== null) {
						if (isMountedRef.current) {
							setWalletInfo(prevState => ({
								...prevState,
								main: data
							}));
						}
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
				let result = {};
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
					let _datas = res.data.data;
					let tpWalletData = {
						id: _datas.tpId,
						displayKey: `lbl_TpWallet_${_datas.tpId}`,
						balance: _datas.balance
					};

					let tpWalletIdx = tpWalletList.findIndex(wallet => {
						return wallet.id === tpId;
					});

					if (tpWalletIdx !== -1) {
						setTpWalletList(prev => {
							prev[tpWalletIdx] = tpWalletData;
							return prev;
						});
					} else {
						setTpWalletList(prev => [...prev, tpWalletData]);
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
	};

	let _tpWalletArrs = tpWalletList.map(t => {
		return (
			<Wallet
				key={`profile-tpWallet-${t.tpId}`}
				i18n={i18n}
				titleKey={t.displayKey}
				currencyId={userInfo.currencyId}
				balance={t.balance}
				func_GetBalance={GetTpWalletBalance.bind(this, t.id)}
				bonusWallet={bonusWallet[t.tpId]}
			/>
		);
	});

	return (
		<>
			<Wallet
				i18n={i18n}
				titleKey={"lbl_MainWallet"}
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
	func_GetBalance,
	bonusWallet
}) => {
	let _bonusWallet =
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
