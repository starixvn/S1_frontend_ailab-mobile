import React from "react";
import { isEventPeriod } from "./common";
import { eventTime } from "./eventTime";
import { bannerImgUrl } from "../../config";

const getLogo = () => {
	return isEventPeriod(eventTime.logoEvent)
		? `${bannerImgUrl}/h5/img/logo_event.png`
		: `${bannerImgUrl}/h5/img/logo.png`;
};

export default () => {
	return <img src={getLogo()} alt="logo" />;
};
