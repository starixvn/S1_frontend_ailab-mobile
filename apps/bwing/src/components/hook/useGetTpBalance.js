import { useState, useContext, useRef, useEffect, useCallback } from "react";
import { i18nContext, popBoxContext } from "../common/context";
import {
	api_account_GetTpWalletList,
	api_account_GetTpWalletBalance
} from "../../service/api/account";

const updateTpWalletsList = ({ prev, tpId, balance = null }) => {
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

export default ({ listType }) => {
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const [tpWalletsList, setTpWalletsList] = useState([]);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const GetTpWalletList = useCallback(() => {
		api_account_GetTpWalletList({
			ListType: listType
		}).then(
			res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						res.data.data?.forEach(i => {
							GetTpWalletBalance(i.tpId);
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
	}, [listType, setPopBox, i18n]);

	const GetTpWalletBalance = tpId => {
		api_account_GetTpWalletBalance({ TpId: tpId }).then(res => {
			if (res.data.errorCode === 0) {
				const _datas = res.data.data;
				setTpWalletsList(prev =>
					updateTpWalletsList({
						prev,
						tpId: _datas.tpId,
						balance: _datas.balance
					})
				);
			}
		});
	};

	useEffect(() => {
		GetTpWalletList();
	}, [GetTpWalletList]);

	return { tpWalletsList, GetTpWalletList, GetTpWalletBalance };
};
