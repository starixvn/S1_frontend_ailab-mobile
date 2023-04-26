import React from "react";
import { cambodiaSeaGameEventPeriod, isDateRange } from "@ailab-mobile/common";
import { bannerImgUrl } from "../../config";

const getLogo = () =>
	isDateRange(cambodiaSeaGameEventPeriod)
		? `${bannerImgUrl}/h5/img/logo-cambodia2023.png`
		: `${bannerImgUrl}/h5/img/logo.png`;

export default () => {
	return <img className="logoImg" src={getLogo()} alt="logo" />;
};
