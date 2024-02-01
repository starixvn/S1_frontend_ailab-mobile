import React from "react";
import { string } from "prop-types";
import { isDateRange } from "@ailab-mobile/common";
import { bannerImgUrl } from "../../config";

export const eventPeriod = {
	startDate: "2024-02-01 00:00:00",
	endDate: "2024-02-25 23:59:59"
};

const getLogo = () =>
	`${bannerImgUrl}/h5/img/4.0/${
		isDateRange(eventPeriod) ? "newyear-logo" : "logo"
	}.png`;

const Logo = ({ className }) => {
	return (
		<img className={className || "logoImg"} src={getLogo()} alt="logo" />
	);
};

Logo.defaultProps = {
	className: ""
};

Logo.propTypes = {
	className: string
};

export default Logo;
