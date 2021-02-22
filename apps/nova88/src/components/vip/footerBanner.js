import React from "react";
import PropTypes from "prop-types";
import BannerEN from "../../styles/img/vip/vip_program_en.jpg";
import BannerID from "../../styles/img/vip/vip_program_id.jpg";
import BannerCS from "../../styles/img/vip/vip_program_cs.jpg";
import BannerTH from "../../styles/img/vip/vip_program_th.jpg";

export const FooterBanner = ({ langId, openJoinPop }) => {
	let _banner;
	switch (langId) {
		case "cs":
			_banner = BannerCS;
			break;
		case "th":
			_banner = BannerTH;
			break;
		case "id":
			_banner = BannerID;
			break;
		default:
			_banner = BannerEN;
			break;
	}

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
