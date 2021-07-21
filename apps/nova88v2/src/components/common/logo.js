import React from "react";
import PropTypes from "prop-types";
import { siteInfo } from "../../config";

const getLogo = ({ langId, isWhite }) => {
	const { logo } = siteInfo(langId);
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
