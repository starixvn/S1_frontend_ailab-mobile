import React from "react";
import { moonFestivalEventPeriod, isDateRange } from "@ailab-mobile/common";
import { bannerImgUrl } from "../../config";

const getLogo = () => {
	return isDateRange(moonFestivalEventPeriod)
		? `${bannerImgUrl}/h5/img/mid-autumn-logo.png`
		: `${bannerImgUrl}/h5/img/logo.png`;
};

export default () => {
	return <img src={getLogo()} alt="logo" />;
};
