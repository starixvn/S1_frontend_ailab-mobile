import React from "react";
import { isEventPeriod } from "../common/common";
import { eventTime } from "../common/eventTime";
import { bannerImgUrl } from "../../config";

const getLogo = () =>
	isEventPeriod(eventTime.logoEvent)
		? `${bannerImgUrl}/h5/img/logo_event.png`
		: `${bannerImgUrl}/h5/img/logo.png`;

export default () => {
	return <img className="logoImg" src={getLogo()} alt="logo" />;
};
