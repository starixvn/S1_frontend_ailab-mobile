import React, { useContext, useRef, useEffect, useState } from "react";
import PropTypes, { objectOf } from "prop-types";
import {
	i18nContext,
	userInfoContext,
	walletInfoContext,
	popBoxContext
} from "Context";
import { number_format, isConvert } from "../common/common";
import ReloadSpin from "../common/reloadSpin";
import BonusWallet from "./profile.wallet.bonus";
import api from "../../service/api";
import { tpWalletsListType } from "../transfer/transfer";

export default () => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { walletInfo, setWalletInfo } = useContext(walletInfoContext);
	const isMountedRef = useRef(null);
	const [tpWalletList, setTpWalletList] = useState([]);
	const [bonusWallet, setBonusWallet] = useState({});

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		GetBalance();
		api.account
			.GetTpWalletList({ ListType: tpWalletsListType.afterTransWallets })
			.then(
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
								content: res.data.message
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
		api.account.GetBalnace().then(
			res => {
				if (res.data.errorCode === 0) {
					const { data } = res.data;
					if (data !== null && isMountedRef.current) {
						setWalletInfo(prevState => ({
							...prevState,
							main: data
						}));
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

		api.account.GetCustBonusWallet().then(res => {
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
		api.account.GetTpWalletBalance({ TpId: tpId }).then(
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
	bonusWallet: []
};

Wallet.propTypes = {
	titleKey: PropTypes.string,
	currencyId: PropTypes.number,
	balance: PropTypes.number,
	func_GetBalance: PropTypes.func.isRequired,
	bonusWallet: PropTypes.arrayOf(PropTypes.object),
	i18n: PropTypes.objectOf(PropTypes.string).isRequired
};
