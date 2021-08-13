import React from "react";
import PropTypes from "prop-types";
import { validImgLang } from "../common/common";

export const FooterBanner = ({ langId, openJoinPop }) => {
	const _langId = validImgLang(langId);
	return (
		<div className="vipBanner" onClick={openJoinPop}>
			<img
				src={`https://image.0814media.net/VIP/img/${_langId}/vip_program_${_langId}.jpg`}
				alt="VIP Programme"
			/>
		</div>
	);
};

FooterBanner.propTypes = {
	langId: PropTypes.string.isRequired,
	openJoinPop: PropTypes.func.isRequired
};
