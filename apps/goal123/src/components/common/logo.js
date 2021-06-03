import React from "react";
import { isEventPeriod } from "./common";
import Logo from "../../styles/img/logo.png";
import { eventTime } from "../../datas/productList";
import Logo_euro from "../../styles/img/logo_euro.png";

const getLogo = () => {
	let logo = Logo;
	if (isEventPeriod(eventTime.euro)) {
		logo = Logo_euro;
	}
	return logo;
};

export default () => {
	return <img src={getLogo()} alt="logo" />;
};
