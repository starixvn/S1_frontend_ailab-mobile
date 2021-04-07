import React from "react";
import SwipperBanner from "../common/swipperBanner";
import { defBannerType } from "../../service/api/site";

const swipperParam = {
	spaceBetween: 30,
	centeredSlides: true,
	autoplay: {
		delay: 2500,
		disableOnInteraction: false
	},
	pagination: {
		el: ".swiper-pagination",
		clickable: true
	},
	rebuildOnUpdate: true,
	containerClass: "bannerNew"
};

export default () => {
	return (
		<SwipperBanner
			ImgFolder={[defBannerType.Promotions]}
			filterHideInHome={true}
			params={swipperParam}
		/>
	);
};
