import React from "react";
import PropTypes from "prop-types";
import { moonFestivalEventPeriod, isDateRange } from "@ailab-mobile/common";
import { cloudBannerImgURL } from "../../config";

const getLogo = ({ langId }) =>
	`${cloudBannerImgURL}/h5/img/${
		langId === "cs" ? "logo_cs_w" : "logo_en_w"
	}.png`;

// const getDragonBoatLogo = ({ langId }) =>
// 	`${cloudBannerImgURL}/h5/img/${
// 		langId === "cs" ? "dragon-logo_cs_w" : "dragon-logo_w"
// 	}.png`;

const getMoonFestivalLogo = ({ langId }) =>
	`${cloudBannerImgURL}/h5/img/${
		langId === "cs" ? "mid-autumn-logo-cs-2" : "mid-autumn-logo-en-2"
	}.png`;

const Logo = ({ langId }) => {
	return (
		<img
			src={
				isDateRange(moonFestivalEventPeriod)
					? getMoonFestivalLogo({ langId })
					: getLogo({ langId })
			}
			alt="logo"
		/>
	);
};

Logo.defaultProps = {
	langId: null
};

Logo.propTypes = {
	langId: PropTypes.string
};

export default Logo;
