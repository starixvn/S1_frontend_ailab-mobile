import React from "react";
import {
	dragonBoatFestivalEventPeriod,
	isDateRange
} from "@ailab-mobile/common";
import { bannerImgUrl } from "../../config";

const getLogo = () => {
	return isDateRange(dragonBoatFestivalEventPeriod)
		? `${bannerImgUrl}/h5/img/dragon-logo.png`
		: `${bannerImgUrl}/h5/img/logo.png`;
};

export default () => {
	return <img src={getLogo()} alt="logo" />;
};
