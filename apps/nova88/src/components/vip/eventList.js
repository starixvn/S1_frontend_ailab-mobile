import React, { useContext } from "react";
import { i18nContext } from "../common/context";
import THBList from "./eventListTHB";
import IDRList from "./eventListIDR";
import MYRList from "./eventListMYR";

const langToCurrency = {
	en: "MYR",
	cs: "MYR",
	th: "THB",
	id: "IDR"
};

export const EventList = ({ langId }) => {
	const { i18n } = useContext(i18nContext);
	let content = null;
	if (langToCurrency[langId] === "THB") {
		content = <THBList i18n={i18n} />;
	} else if (langToCurrency[langId] === "IDR") {
		content = <IDRList i18n={i18n} />;
	} else {
		content = <MYRList i18n={i18n} />;
	}

	return content;
};
