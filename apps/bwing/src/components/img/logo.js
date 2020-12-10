import React from "react";
import { isEventPeriod } from "../common/common";
import Logo from "../../styles/img/logo.png";
import Clogo from "../../styles/img/Clogo.png";

export default () => {
	return <img src={isEventPeriod() ? Clogo : Logo} alt="logo" />;
};
