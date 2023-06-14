import React, { useContext } from "react";
import { i18nContext, userInfoContext } from "../common/context";
import THBList from "./eventListTHB";
import IDRList from "./eventListIDR";
import MYRList from "./eventListMYR";
import { defCurrenyId } from "../common/common";

export const EventList = ({ langId }) => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);

	const currency = userInfo.currencyId;

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
