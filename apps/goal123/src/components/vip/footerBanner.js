import React from "react";
import PropTypes from "prop-types";
import { bannerImgUrl } from "../../config";

export const FooterBanner = ({ langId, openJoinPop }) => {
	const _banner =
		langId === "en"
			? `${bannerImgUrl}/h5/img/vip/vip_program_en-v1.jpg`
			: `${bannerImgUrl}/h5/img/vip/vip_program_vn-v1.jpg`;
	return (
		<div className="vipBanner" onClick={openJoinPop}>
			<img src={_banner} alt="VIP Programme" />
		</div>
	);
};

FooterBanner.propTypes = {
	langId: PropTypes.string.isRequired,
	openJoinPop: PropTypes.func.isRequired
};
