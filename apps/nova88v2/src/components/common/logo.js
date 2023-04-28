import React from "react";
import PropTypes from "prop-types";
import { cambodiaSeaGameEventPeriod, isDateRange } from "@ailab-mobile/common";
import { cloudBannerImgURL } from "../../config";

const getLogo = ({ langId }) =>
	`${cloudBannerImgURL}/h5/img/${
		langId === "cs" ? "logo_cs_w" : "logo_en_w"
	}.png`;

const getCambodiaLogo = ({ langId }) =>
	`${cloudBannerImgURL}/h5/img/${
		langId === "cs" ? "logo-cambodia2023_cs_w" : "logo-cambodia2023_en_w"
	}.png`;

const Logo = ({ langId }) => {
	return (
		<img
			src={
				isDateRange(cambodiaSeaGameEventPeriod)
					? getCambodiaLogo({ langId })
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
