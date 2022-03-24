import React from "react";
import { BannerWithStaticImages } from "../common/swipperBanner";

export default ({ langId, redirectLink }) => {
	return (
		<BannerWithStaticImages
			length={3}
			langId={langId}
			redirectLink={redirectLink}
		/>
	);
};
