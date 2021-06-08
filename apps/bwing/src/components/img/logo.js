import React from "react";
import Logo from "../../styles/img/logo.png";
// import LogoCNY from "../../styles/img/logo_evt.png";
import { isEventPeriod } from "../common/common";
import { euro_event_time } from "../../datas/productList";
import Logo_euro from "../../styles/img/logo-euro.png";

// const eventTime = {
// 	CNY: {
// 		startDate: "2021/01/26 11:00:00",
// 		endDate: "2021/02/26 11:00:00"
// 	}
// };

const getLogo = () => {
	let logo = Logo;
	if (isEventPeriod(euro_event_time)) {
		logo = Logo_euro;
	}
	return logo;
};

export default () => {
	return <img src={getLogo()} alt="logo" />;
};
