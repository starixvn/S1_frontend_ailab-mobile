import React, { useContext } from "react";
import PropTypes from "prop-types";
import { i18nContext } from "../common/context";

export const FooterBanner = ({ openJoinPop }) => {
	const { i18n } = useContext(i18nContext);
	return (
		<div className="vip-bottom" onClick={openJoinPop}>
			<div className="vip-bottom-item">
				<img
					src="https://banner.0814media.net/h5/img/benefit-1.png"
					alt=""
				/>
				<span>{i18n.lbl_Vip_TopPriorityServices}</span>
			</div>
			<div className="vip-bottom-item">
				<img
					src="https://banner.0814media.net/h5/img/benefit-2.png"
					alt=""
				/>
				<span>{i18n.lbl_Vip_ExclusivePromo}</span>
			</div>
			<div className="vip-bottom-item">
				<img
					src="https://banner.0814media.net/h5/img/benefit-3.png"
					alt=""
				/>
				<span>{i18n.lbl_Vip_BirthdaySpecialGifts}</span>
			</div>
			<div className="vip-bottom-item">
				<img
					src="https://banner.0814media.net/h5/img/benefit-4.png"
					alt=""
				/>
				<span>{i18n.lbl_Vip_LifetimeMembership}</span>
			</div>
		</div>
	);
};

FooterBanner.propTypes = {
	openJoinPop: PropTypes.func.isRequired
};
