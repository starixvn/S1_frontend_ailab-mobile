import React from "react";
import { string } from "prop-types";
import { isDateRange } from "@ailab-mobile/common";
import { bannerImgUrl } from "../../config";

export const christmasPeriod = {
	endDate: "2023-12-26 23:59:59"
};

const getLogo = () =>
	`${bannerImgUrl}/h5/img/4.0/${
		isDateRange(christmasPeriod) ? "christmas-logo" : "logo"
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
