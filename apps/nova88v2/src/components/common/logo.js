import React from "react";
import PropTypes from "prop-types";
import { cloudImgURL } from "../../config";

const getLogo = ({ langId }) =>
	`${cloudImgURL}/SiteSkin/img/${
		langId === "cs" ? "logo_cs" : "logo_en"
	}.png`;

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
