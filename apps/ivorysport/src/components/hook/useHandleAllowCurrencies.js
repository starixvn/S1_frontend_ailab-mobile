import { useEffect, useState } from "react";
import { useNavigate } from "@reach/router";
import { defCurrenyId, GetCurrencyName } from "../common/common";

export const useHandleAllowCurrencies = ({
	allowCurrencies,
	isLogin,
	langId,
	currencyId,
	redirectPath,
	i18n
}) => {
	const navigate = useNavigate();
	const [isAllowCurrency, setIsAllowCurrency] = useState(true);

	useEffect(() => {
		if ((isLogin && currencyId) || isLogin === false) {
			const check = allowCurrencies?.includes(
				defCurrenyId[GetCurrencyName({ langId, currencyId, i18n })]
			);

			if (check !== isAllowCurrency) {
				setIsAllowCurrency(check);
			}
		}
	}, [isLogin, currencyId, langId, allowCurrencies, i18n, isAllowCurrency]);

	if (redirectPath && isAllowCurrency === false) {
		navigate(redirectPath);
	}
	return { isAllowCurrency };
};
