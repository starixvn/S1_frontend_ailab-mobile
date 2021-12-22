import React from "react";
import Logo from "../../styles/img/logo.png";
import EventLogo from "../../styles/img/logo-new.png";
import { isEventPeriod } from "../common/common";
import { eventTime } from "../common/eventTime";

const getLogo = () => (isEventPeriod(eventTime.logoEvent) ? EventLogo : Logo);

export default () => {
	return <img className="logoImg" src={getLogo()} alt="logo" />;
};
