import { useEffect, useRef, useState, useContext } from "react";
import { userInfoContext } from "../common/context";
import {
	api_GetBalnace,
	api_account_GetTpWalletList,
	api_account_GetTpWalletBalance,
	api_account_GetCustBonusWallet
} from "../../service/api/account";
import { number_format } from "../common/common";
import { tpWalletsListType } from "../transfer/transfer";

export const useGetBalance = ({ isLogin, i18n, setPopBox }) => {
	const { userInfo } = useContext(userInfoContext);
	const [mainWalletBalance, setMainWalletBalance] = useState(0);
	const [tpWalletsList, setTpWalletsList] = useState([]);
	const [bonusWallets, setBonusWallet] = useState({});

	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		if (isLogin) {
			GetBalance();
			GetBonusBalance();
		}
	}, [isLogin]);

	const GetBalance = () => {
		api_GetBalnace().then(
			res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						setMainWalletBalance(res.data.data);
					} else {
						setPopBox({
							isOpen: true,
							content: `[${res.data.errorCode}] ${res.data.message}`
						});
					}
				}
			},
			() => {
				if (isMountedRef.current) {
					setPopBox({
						isOpen: true,
						content: i18n.msg_ApiServerError
					});
				}
			}
		);

		api_account_GetTpWalletList({
			ListType: tpWalletsListType.allWallets,
			langId: userInfo?.langId
		}).then(
			res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						res.data.data?.forEach(i => {
							api_account_GetTpWalletBalance({
								TpId: i.tpId
							}).then(
								resBalance => {
									if (resBalance.data.errorCode === 0) {
										const { data } = resBalance.data;
										const tpWalletData = {
											id: data.tpId,
											balance: data.balance
										};

										const tpWalletIdx = tpWalletsList.findIndex(
											wallet => wallet.id === i.tpId
										);

										if (tpWalletIdx !== -1) {
											setTpWalletsList(prev => {
												prev[
													tpWalletIdx
												] = tpWalletData;
												return prev;
											});
										} else {
											setTpWalletsList(prev => [
												...prev,
												tpWalletData
											]);
										}
									} else {
										setPopBox({
											isOpen: true,
											content: `[${resBalance.data.errorCode}] ${resBalance.data.message}`
										});
									}
								},
								() => {
									if (isMountedRef.current) {
										setPopBox({
											isOpen: true,
											content: i18n.msg_ApiServerError
										});
									}
								}
							);
						});
					} else {
						setPopBox({
							isOpen: true,
							content: `[${res.data.errorCode}] ${res.data.message}`
						});
					}
				}
			},
			() => {
				if (isMountedRef.current) {
					setPopBox({
						isOpen: true,
						content: i18n.msg_ApiServerError
					});
				}
			}
		);
	};

	const GetBonusBalance = async () => {
		const res = await api_account_GetCustBonusWallet();

		const { errorCode, message, data } = res.data;
		if (errorCode === 0) {
			const result = {};
			data.forEach(b => {
				result[b.tpId] = b;
			});
			setBonusWallet(result);
		} else {
			setPopBox({
				isOpen: true,
				content: `[${errorCode}] ${message}`
			});
		}
	};

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
		mainWalletBalance + tpWalletBalance + bonusWalletsBalance;

	const allBalance = !allWalletBalance
		? 0
		: number_format(allWalletBalance, false);

	return { allBalance };
};
