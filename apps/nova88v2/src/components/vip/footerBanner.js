import React from "react";
import PropTypes from "prop-types";

export const FooterBanner = ({ langId, openJoinPop }) => {
	return (
		<div className="vipBanner" onClick={openJoinPop}>
			<img
				src={`https://image.n88media.com/VIP/img/${langId}/vip_program_${langId}.jpg`}
				alt="VIP Programme"
			/>
		</div>
	);
};

FooterBanner.propTypes = {
	langId: PropTypes.string.isRequired,
	openJoinPop: PropTypes.func.isRequired
};
