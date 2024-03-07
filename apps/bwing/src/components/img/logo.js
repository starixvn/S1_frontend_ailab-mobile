import React, { useContext } from "react";
import { string } from "prop-types";
import { bannerImgUrl } from "../../config";
import { userInfoContext } from "../common/context";

const getLogo = langId =>
	`${bannerImgUrl}/h5/img/4.0/${langId === "vn" ? "logo-vn" : "logo-en"}.png`;

const Logo = ({ className }) => {
	const { userInfo } = useContext(userInfoContext);
	return (
		<img
			className={className || "logoImg"}
			src={getLogo(userInfo.langId)}
			alt="logo"
		/>
	);
};

Logo.defaultProps = {
	className: ""
};

Logo.propTypes = {
	className: string
};

export default Logo;
