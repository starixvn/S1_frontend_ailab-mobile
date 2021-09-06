import React from "react";
import PropTypes from "prop-types";
import { cloudImgURL } from "../../config";

const getLogo = ({ langId, isWhite }) =>
	`${cloudImgURL}/SiteSkin/img/logo_${langId === "cs" ? "cs" : "en"}${
		isWhite ? "" : "_w"
	}.png`;

const Logo = ({ langId, isWhite }) => {
	return <img src={getLogo({ langId, isWhite })} alt="logo" />;
};

Logo.defaultProps = {
	langId: null,
	isWhite: true
};

Logo.propTypes = {
	langId: PropTypes.string,
	isWhite: PropTypes.bool
};

export default Logo;
