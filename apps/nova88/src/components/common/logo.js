import React from "react";
import PropTypes from "prop-types";
import { siteInfo } from "../../config";
import { isEventPeriod } from "./common";

const Logo_cny_en = "https://image.n88media.com/SiteSkin/img/logo_evt.png";
const Logo_cny_cs = "https://image.n88media.com/SiteSkin/img/logo_evt_cs.png";

const eventTime = {
	CNY: {
		startDate: "2021/01/29 11:00:00",
		endDate: "2021/02/26 11:00:00"
	}
};

const getLogo = ({ langId }) => {
	let { logo } = siteInfo(langId);
	if (isEventPeriod(eventTime.CNY)) {
		logo = langId === "cs" ? Logo_cny_cs : Logo_cny_en;
	}

	return logo;
};

const Logo = ({ langId }) => {
	return <img src={getLogo({ langId })} alt="logo" />;
};

Logo.defaultProps = {
	langId: null
};

Logo.propTypes = {
	langId: PropTypes.string
};

export default Logo;
