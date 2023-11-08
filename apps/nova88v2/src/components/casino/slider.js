import React from "react";
import SwipperBanner from "../common/swipperBanner";
import api from "../../service/api";

export default () => {
	return (
		<SwipperBanner
			ImgFolder={[api.site.defBannerType.Slots]}
			imgClassName="banner"
		/>
	);
};
