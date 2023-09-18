import React, { useContext } from "react";
import ProductPage from "../components/common/productPage";
import { userInfoContext } from "../components/common/context";

export default () => {
	const {
		userInfo: { langId }
	} = useContext(userInfoContext);

	return (
		<ProductPage
			category="eSports"
			titleKey="lbl_Esports"
			bannerUrl={`https://banner.bw88.io/h5/img/4.0/esports-banner-${langId}.jpg`}
		/>
	);
};
