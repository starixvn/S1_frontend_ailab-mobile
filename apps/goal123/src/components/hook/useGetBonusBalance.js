import { useEffect, useState, useContext } from "react";
import { popBoxContext } from "../common/context";
import { api_account_GetCustBonusWallet } from "../../service/api/account";

export default ({ isLogin }) => {
	const { setPopBox } = useContext(popBoxContext);
	const [bonusWallets, setBonusWallet] = useState({});

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

	useEffect(() => {
		if (isLogin === true) GetBonusBalance();
	}, [isLogin]);

	return { bonusWallets, GetBonusBalance };
};
