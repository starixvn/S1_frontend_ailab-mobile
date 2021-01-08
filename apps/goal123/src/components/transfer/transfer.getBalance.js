import { useContext, useState } from "react";
import { api_GetBalnace } from "../../service/api/account";

export const GetBalance = ({ setLoading }) => {
	const { setPopBox } = useContext(popBoxContext);
	const [mainWalletInfo, setMainWalletInfo] = useState({});

	api_GetBalnace().then(
		res => {
			if (isMountedRef.current) {
				if (res.data.errorCode === 0) {
					let mainWalletData = {
						id: 0,
						displayKey: "lbl_MainWallet",
						balance: res.data.data
					};
					setMainWalletInfo(mainWalletData);
				} else {
					setPopBox({
						isOpen: true,
						title: i18n["lbl_ImportantNote"],
						content: res.data.message
					});
				}
			}
		},
		() => {
			if (isMountedRef.current) {
				setLoading(false);
			}
		}
	);

	return { mainWalletInfo };
};
