import { useContext, useState } from "react";
import { i18nContext, popBoxContext } from "../common/context";
import {
	api_GetBalnace,
	api_account_GetTpWalletList
} from "../../service/api/account";
import { tpWalletsListType } from "./transfer.def";

export const updateTpWalletsList = ({ prev, tpId, balance = null }) => {
	const tpWalletIdx = prev.findIndex(wallet => wallet.id === tpId);
	if (tpWalletIdx !== -1) {
		prev[tpWalletIdx].balance = balance;
	} else {
		prev.push({
			id: tpId,
			displayKey: `lbl_TpWallet_${tpId}`,
			balance
		});
	}
	return [...prev].sort((a, b) => a.id - b.id);
};

export const GetBalance = () => {
	const { setPopBox } = useContext(popBoxContext);
	const { i18n } = useContext(i18nContext);
	const [mainWalletInfo, setMainWalletInfo] = useState({});

	api_GetBalnace().then(
		res => {
			if (isMountedRef.current) {
				if (res.data.errorCode === 0) {
					const mainWalletData = {
						id: 0,
						displayKey: "lbl_MainWallet",
						balance: res.data.data
					};
					setMainWalletInfo(mainWalletData);
				} else {
					setPopBox({
						isOpen: true,
						title: i18n.lbl_ImportantNote,
						content: `[${res.data.errorCode}]${res.data.message}`
					});
				}
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

	return { mainWalletInfo };
};

export const getTpWalletList = ({ tpWalletsList, setTpWalletsList }) => {
	api_account_GetTpWalletList({
		ListType: tpWalletsListType.allWallets
	}).then(
		res => {
			if (res.data.errorCode === 0) {
				res.data.data?.forEach(i => {
					// GetTpWalletBalance(i.tpId);
					setTpWalletsList(prev =>
						updateTpWalletsList({
							prev,
							tpId: i.tpId,
							balance: null
						})
					);
				});
			} else {
				setPopBox({
					isOpen: true,
					title: i18n.lbl_ImportantNote,
					content: res.data.message
				});
			}
			setLoading(false);
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

	return { tpWalletsList };
};
