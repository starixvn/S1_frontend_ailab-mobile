import React from "react";
import SwipperBanner from "../common/swipperBanner";
import api from "../../service/api";

const swipperParam = {
	spaceBetween: 30,
	centeredSlides: true,
	effect: "fade",
	autoplay: {
		delay: 5000,
		disableOnInteraction: false
	},
	pagination: {
		el: ".swiper-pagination",
		clickable: true
	},
	rebuildOnUpdate: true
};

export default () => {
	return (
		<SwipperBanner
			ImgFolder={[api.site.defBannerType.Promotions]}
			filterHideInHome={true}
			params={swipperParam}
		/>
	);
};
