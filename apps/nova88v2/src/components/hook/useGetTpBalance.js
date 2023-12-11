import { useEffect, useState, useRef, useCallback, useContext } from "react";
import { i18nContext, popBoxContext, userInfoContext } from "../common/context";
import api from "../../service/api";

const updateTpWalletsList = ({
	prev,
	tpId,
	balance = null,
	tpName,
	walletMode
}) => {
	const tpWalletIdx = prev.findIndex(wallet => wallet.id === tpId);
	if (tpWalletIdx !== -1) {
		prev[tpWalletIdx].balance = balance;
	} else {
		prev.push({
			id: tpId,
			balance,
			displayText: tpName,
			walletMode
		});
	}
	return [...prev].sort((a, b) => a.id - b.id);
};

export default ({ isLogin, listType }) => {
	const { userInfo } = useContext(userInfoContext);
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
		if (userInfo.langId)
			api.account
				.GetTpWalletList({
					ListType: listType,
					langId: userInfo.langId
				})
				.then(
					res => {
						if (res.data.errorCode === 0) {
							if (isMountedRef.current) {
								res.data.data?.forEach(i => {
									GetTpWalletBalance(i.tpId);
									setTpWalletsList(prev =>
										updateTpWalletsList({
											prev,
											tpId: i.tpId,
											balance: null,
											tpName: i.tpName,
											walletMode: i.walletMode
										})
									);
								});
							}
						} else {
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
	}, [userInfo.langId, listType]);

	const GetTpWalletBalance = tpId => {
		api.account.GetTpWalletBalance({ TpId: tpId }).then(
			res => {
				if (res.data.errorCode === 0) {
					const _datas = res.data.data;
					setTpWalletsList(prev =>
						updateTpWalletsList({
							prev,
							tpId: _datas.tpId,
							balance: _datas.balance
						})
					);
				} else {
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
	};

	useEffect(() => {
		if (isLogin === true) {
			GetTpWalletList();
		}
	}, [GetTpWalletList, isLogin]);
	return { tpWalletsList, GetTpWalletList, GetTpWalletBalance };
};
