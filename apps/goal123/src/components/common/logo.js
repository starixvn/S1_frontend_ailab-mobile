import React from "react";
import { bannerImgUrl } from "../../config";

const getLogo = () => {
	return `${bannerImgUrl}/h5/img/logo.png`;
};

export default () => {
	return <img src={getLogo()} alt="logo" />;
};
