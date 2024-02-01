import React from "react";
import { isDateRange } from "@ailab-mobile/common";
import { bannerImgUrl } from "../../config";

export const eventPeriod = {
	startDate: "2024-02-01 00:00:00",
	endDate: "2024-02-25 23:59:59"
};

const getLogo = () => {
	return `${bannerImgUrl}/h5/img/${
		isDateRange(eventPeriod) ? "newyear-logo" : "logo"
	}.png`;
};

export default () => {
	return <img src={getLogo()} alt="logo" />;
};
