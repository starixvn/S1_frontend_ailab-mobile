import React from "react";
import {
	dragonBoatFestivalEventPeriod,
	isDateRange
} from "@ailab-mobile/common";
import { bannerImgUrl } from "../../config";

const getLogo = () =>
	isDateRange(dragonBoatFestivalEventPeriod)
		? `${bannerImgUrl}/h5/img/dragon-logo.png`
		: `${bannerImgUrl}/h5/img/logo.png`;

export default () => {
	return <img className="logoImg" src={getLogo()} alt="logo" />;
};
