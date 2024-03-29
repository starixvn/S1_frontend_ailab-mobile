import React from "react";
import SwipperBanner from "../common/swipperBanner";
import { defBannerType } from "../../service/api/site";

const swipperParam = {
	spaceBetween: 30,
	centeredSlides: true,
	loop: true,
	effect: "fade",
	autoplay: {
		delay: 10500,
		disableOnInteraction: false
	},
	pagination: {
		el: ".swiper-pagination",
		clickable: true
	},
	containerClass: "home-banner"
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
