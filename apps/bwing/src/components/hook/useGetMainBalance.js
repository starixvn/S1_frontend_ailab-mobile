import { useState, useContext, useRef, useEffect, useCallback } from "react";
import { i18nContext, popBoxContext, userInfoContext } from "../common/context";
import { api_GetBalnace } from "../../service/api/account";

export default () => {
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const { userInfo } = useContext(userInfoContext);
	const [mainWalletInfo, setMainWalletInfo] = useState({});
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const GetBalance = useCallback(() => {
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
	}, [i18n, setPopBox]);

	useEffect(() => {
		if (userInfo?.isLogin) {
			GetBalance();
		}
	}, [GetBalance, userInfo?.isLogin]);

	useEffect(() => {
		const intervalId = setInterval(() => {
			GetBalance();
		}, 30000);

		return () => clearInterval(intervalId);
	}, []);

	return { mainWalletInfo, GetBalance };
};
