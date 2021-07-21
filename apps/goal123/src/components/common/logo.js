import React from "react";
import Logo from "../../styles/img/logo.png";

const getLogo = () => Logo;

export default () => {
	return <img src={getLogo()} alt="logo" />;
};
