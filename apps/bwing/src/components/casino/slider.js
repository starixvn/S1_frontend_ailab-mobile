import React from "react";
import SwipperBanner from "../common/swipperBanner";
import { defBannerType } from "../../service/api/site";

export default () => {
	return (
		<SwipperBanner
			ImgFolder={[defBannerType.Slots]}
			swiperClass="lobby-banner"
		/>
	);
};
