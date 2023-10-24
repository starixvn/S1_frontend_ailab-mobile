import React, { useContext } from "react";
import ProductPage from "../components/common/productPage";
import { userInfoContext } from "../components/common/context";

export default () => {
	const {
		userInfo: { langId }
	} = useContext(userInfoContext);

	return (
		<ProductPage
			category="game"
			titleKey="lbl_Games"
			bannerUrl={`https://banner.bw88.io/h5/img/4.0/games-banner-${langId}.jpg`}
		/>
	);
};
