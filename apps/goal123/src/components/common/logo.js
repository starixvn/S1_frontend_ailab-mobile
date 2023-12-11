import React from "react";
import { isDateRange } from "@ailab-mobile/common";
import { bannerImgUrl } from "../../config";

export const christmasPeriod = {
	endDate: "2023-12-26 23:59:59"
};

const getLogo = () => {
	return `${bannerImgUrl}/h5/img/${
		isDateRange(christmasPeriod) ? "christmas-logo" : "logo"
	}.png`;
};

export default () => {
	return <img src={getLogo()} alt="logo" />;
};
