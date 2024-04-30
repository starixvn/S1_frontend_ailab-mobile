import React, { useContext } from "react";
import ProductPage from "../components/common/productPage";
import { userInfoContext } from "../components/common/context";
import { bannerImgUrl } from "../config";

export default () => {
	const {
		userInfo: { langId }
	} = useContext(userInfoContext);

	return (
		<ProductPage
			category="cockFighting"
			bannerUrl={`${bannerImgUrl}/h5/img/4.0/cockfighting-banner-${langId}.jpg`}
		/>
	);
};
