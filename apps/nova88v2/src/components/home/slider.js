import React from "react";
import SwipperBanner from "../common/swipperBanner";
import api from "../../service/api";

const swipperParam = {
	spaceBetween: 30,
	centeredSlides: true,
	effect: "fade",
	loop: true,
	rebuildOnUpdate: true
};

const Slider = () => {
	return (
		<div className="home-mainbanner">
			<SwipperBanner
				ImgFolder={[api.site.defBannerType.Promotions]}
				filterHideInHome={true}
				params={swipperParam}
				imgClassName="mainbanner"
			/>
		</div>
	);
};

export { Slider };
