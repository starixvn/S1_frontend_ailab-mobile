import React from "react";
import PropTypes from "prop-types";
import BannerEN from "../../styles/img/vip/en/vip_program_en.png";
import BannerVN from "../../styles/img/vip/vn/vip_program_vn.png";

export const FooterBanner = ({ langId, openJoinPop }) => {
	const _banner = langId === "en" ? BannerEN : BannerVN;
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
