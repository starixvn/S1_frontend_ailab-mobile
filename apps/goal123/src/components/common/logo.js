import React from "react";
import { isEventPeriod } from "./common";
import Logo from "../../styles/img/logo.png";
import LogoCNY from "../../styles/img/logo_evt.png";

const eventTime = {
	CNY: {
		startDate: "2021/01/29 11:00:00",
		endDate: "2021/02/26 11:00:00"
	}
};

export default () => {
	return (
		<img src={isEventPeriod(eventTime.CNY) ? LogoCNY : Logo} alt="logo" />
	);
};
