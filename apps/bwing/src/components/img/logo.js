import React, { useContext } from "react";
import { string } from "prop-types";
import { isDateRange } from "@ailab-mobile/common";
import { bannerImgUrl } from "../../config";
import { userInfoContext } from "../common/context";
import { eventTime } from "../common/eventTime";

const getLogo = langId =>
	`${bannerImgUrl}/h5/img/4.0/${langId === "vn" ? "logo-vn" : "logo-en"}.png`;

const Logo = ({ className }) => {
	const { userInfo } = useContext(userInfoContext);

	// TODO: 因應聖誕節更換ＬＯＧＯ（期間：2024.12.17~12.26）(之後若有其他活動也可以在此調整)
	const logoUrl = isDateRange(eventTime.christmas)
		? `${bannerImgUrl}/h5/img/4.0/logo-christmas.png`
		: getLogo(userInfo.langId);

	return (
		<img
			className={className || "logoImg"}
			src={logoUrl}
			alt="logo"
			onClick={() => {
				window.location.href = "/";
			}}
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
