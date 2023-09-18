import React from "react";
import { string } from "prop-types";
import { bannerImgUrl } from "../../config";

const getLogo = () => `${bannerImgUrl}/h5/img/4.0/logo.png`;

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
