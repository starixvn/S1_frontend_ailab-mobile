import React, { useContext } from "react";
import { i18nContext, userInfoContext } from "../common/context";
import THBList from "./eventListTHB";
import IDRList from "./eventListIDR";
import MYRList from "./eventListMYR";

const defCurrenyId = {
	MYR: 2,
	THB: 4,
	RMB: 13,
	IDR: 15
};

const langToCurrency = {
	en: defCurrenyId.MYR,
	cs: defCurrenyId.MYR,
	th: defCurrenyId.THB,
	id: defCurrenyId.IDR
};

export const EventList = ({ langId }) => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);

	const currency = userInfo.isLogin
		? userInfo.currencyId
		: langToCurrency[langId];

	let content = null;
	if (currency === defCurrenyId.THB) {
		content = <THBList i18n={i18n} />;
	} else if (currency === defCurrenyId.IDR) {
		content = <IDRList i18n={i18n} />;
	} else {
		content = <MYRList i18n={i18n} />;
	}

	return content;
};
