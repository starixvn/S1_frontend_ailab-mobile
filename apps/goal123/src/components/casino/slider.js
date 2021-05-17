import React from "react";
import SwipperBanner from "../common/swipperBanner";
import { defBannerType } from "../../service/api/site";

export default () => {
	const params = {
		centeredSlides: true,
		autoplay: {
			delay: 2500,
			disableOnInteraction: false
		},
		pagination: {
			el: ".swiper-pagination",
			clickable: true
		},
		rebuildOnUpdate: true
	};

	return <SwipperBanner params={params} ImgFolder={[defBannerType.Slots]} />;
};
