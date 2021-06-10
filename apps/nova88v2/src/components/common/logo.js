import React from "react";
import PropTypes from "prop-types";
import { siteInfo } from "../../config";
import { isEventPeriod } from "./common";
import { euro_event_time } from "../../datas/productList";

const Logo_cny_en = "https://image.n88media.com/SiteSkin/img/logo_evt.png";
const Logo_cny_cs = "https://image.n88media.com/SiteSkin/img/logo_evt_cs.png";
const Logo_euro_w = "https://image.n88media.com/SiteSkin/img/logo_evt_w.png";
const Logo_euro = "https://image.n88media.com/SiteSkin/img/logo_evt.png";

const eventTime = {
	CNY: {
		startDate: "2021/01/26 11:00:00",
		endDate: "2021/02/26 11:00:00"
	}
};

const getLogo = ({ langId, isWhite }) => {
	let { logo } = siteInfo(langId);
	if (isEventPeriod(eventTime.CNY)) {
		logo = langId === "cs" ? Logo_cny_cs : Logo_cny_en;
	}
	if (isEventPeriod(euro_event_time)) {
		logo = isWhite ? Logo_euro_w : Logo_euro;
	}

	return logo;
};

const Logo = ({ langId, isWhite = true }) => {
	return <img src={getLogo({ langId, isWhite })} alt="logo" />;
};

Logo.defaultProps = {
	langId: null
};

Logo.propTypes = {
	langId: PropTypes.string
};

export default Logo;
