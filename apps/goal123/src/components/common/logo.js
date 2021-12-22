import React from "react";
import Logo from "../../styles/img/logo.png";
import EventLogo from "../../styles/img/logo_event.png";
import { isEventPeriod } from "./common";
import { eventTime } from "./eventTime";

const getLogo = () => (isEventPeriod(eventTime.logoEvent) ? EventLogo : Logo);

export default () => {
	return <img src={getLogo()} alt="logo" />;
};
