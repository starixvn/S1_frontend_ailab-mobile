import { useEffect, useState, useContext } from "react";
import { popBoxContext } from "../common/context";
import api from "../../service/api";

export default ({ isLogin }) => {
	const { setPopBox } = useContext(popBoxContext);
	const [bonusWallets, setBonusWallet] = useState({});

	const GetBonusBalance = async () => {
		const res = await api.account.GetCustBonusWallet();

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
