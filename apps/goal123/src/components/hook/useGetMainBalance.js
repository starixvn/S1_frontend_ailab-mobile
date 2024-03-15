import { useEffect, useState, useRef, useCallback, useContext } from "react";
import { i18nContext, popBoxContext } from "../common/context";
import { api_GetBalnace } from "../../service/api/account";

export default ({ isLogin }) => {
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const [mainWalletInfo, setMainWalletInfo] = useState({});
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const GetBalance = useCallback(() => {
		if (!isLogin) return;

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
							content: `[${res.data.errorCode}] ${res.data.message}`
						});
					}
				}
			},
			() => {
				setPopBox({
					isOpen: true,
					content: i18n.msg_ApiServerError
				});
			}
		);
	}, [isLogin, setPopBox, i18n]);

	useEffect(() => {
		if (isLogin === true) {
			GetBalance();
		}
	}, [GetBalance, isLogin]);

	// useEffect(() => {
	// 	const intervalId = setInterval(() => {
	// 		if (isLogin === true) {
	// 			GetBalance();
	// 		}
	// 	}, 30000);
	//
	// 	return () => clearInterval(intervalId);
	// }, [isLogin]);

	return { mainWalletInfo, GetBalance };
};
