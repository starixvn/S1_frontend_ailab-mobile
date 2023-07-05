import PropTypes from "prop-types";
import React, { useContext } from "react";
import { i18nContext } from "../common/context";
import VNDList from "./eventListVND";

export const EventList = ({ vipBanner }) => {
	const { i18n } = useContext(i18nContext);
	return <VNDList i18n={i18n} vipBanner={vipBanner} />;
};

EventList.propTypes = {
	vipBanner: PropTypes.arrayOf(PropTypes.any).isRequired
};
