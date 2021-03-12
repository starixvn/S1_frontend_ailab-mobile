import React from "react";
import PropTypes from "prop-types";
import BannerEN from "../../styles/img/vip/vip_program_en.png";

export const FooterBanner = ({ langId, openJoinPop }) => {
	const _banner = langId === "en" ? BannerEN : BannerEN;
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
