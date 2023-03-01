import React from "react";
import PropTypes from "prop-types";

export const FooterBanner = ({ langId, openJoinPop }) => {
	const _langId = langId.includes("_en") ? "en" : langId;
	return (
		<div className="vipBanner" onClick={openJoinPop}>
			<img
				src={`https://banner.0814media.net/h5/img/vip/${_langId}/vip_program_${_langId}.jpg`}
				alt="VIP Programme"
			/>
		</div>
	);
};

FooterBanner.propTypes = {
	langId: PropTypes.string.isRequired,
	openJoinPop: PropTypes.func.isRequired
};
