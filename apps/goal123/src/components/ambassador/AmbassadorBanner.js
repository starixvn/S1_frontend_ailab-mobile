import React, { useContext } from "react";
import { bannerImgUrl } from "../../config";
import { userInfoContext } from "../common/context";

const AmbassadorBanner = () => {
	const { userInfo } = useContext(userInfoContext);
	return (
		<div className="banner">
			<img
				src={
					userInfo.langId === "en"
						? `${bannerImgUrl}/h5/img/ambassador/banner.jpg`
						: `${bannerImgUrl}/h5/img/ambassador/banner-vn.jpg`
				}
				alt="ambassador-banner"
			/>
		</div>
	);
};

export default AmbassadorBanner;
