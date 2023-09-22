import React from "react";

import { bannerImgUrl } from "../../config";

const getLogo = () => `${bannerImgUrl}/h5/img/logo.png`;

export default () => {
	return <img className="logoImg" src={getLogo()} alt="logo" />;
};
