import React from "react";
import SwipperBanner from "../common/swipperBanner";
import { defBannerType } from "../../service/api/site";

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

export const HomeBanner = () => {
	return (
		<div className="fullbanner">
			<SwipperBanner
				ImgFolder={[defBannerType.Promotions]}
				params={swipperParam}
				swiperClass="hotevent"
			/>
		</div>
	);
};
