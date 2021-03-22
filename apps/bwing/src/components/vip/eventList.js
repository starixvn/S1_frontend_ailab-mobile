import React, { useContext } from "react";
import { i18nContext } from "../common/context";
import VNDList from "./eventListVND";

export const EventList = () => {
	const { i18n } = useContext(i18nContext);
	return <VNDList i18n={i18n} />;
};
