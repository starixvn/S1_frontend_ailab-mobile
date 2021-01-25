import React from "react";
import Logo from "../../styles/img/logo.png";
import LogoCNY from "../../styles/img/logo_evt.png";
import { isEventPeriod } from "../common/common";

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
