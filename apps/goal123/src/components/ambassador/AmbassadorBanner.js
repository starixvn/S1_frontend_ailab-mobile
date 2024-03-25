import React from "react";
import { bannerImgUrl } from "../../config";

const AmbassadorBanner = () => {
	return (
		<div className="banner">
			<img
				src={`${bannerImgUrl}/h5/img/ambassador/banner.jpg`}
				alt="ambassador-banner"
			/>
		</div>
	);
};

export default AmbassadorBanner;
