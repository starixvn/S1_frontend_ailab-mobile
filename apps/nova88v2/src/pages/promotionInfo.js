import React, { useContext } from "react";
import { PromotionInfo } from "@ailab-mobile/promotion";
import path from "Path";
import { Promotion as uiSetting } from "UISetting";
import { userInfoContext, i18nContext, popBoxContext } from "Context";
import config from "../config";
import Layout from "../components/common/layout";
import Header from "../components/header/header";

export default () => {
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	return (
		<Layout
			header={<Header title={i18n.lbl_Promotion} hideLogo={true} />}
			mainClass="main promotions">
			<PromotionInfo
				config={config}
				uiSetting={uiSetting}
				path={path}
				userInfo={userInfo}
				i18n={i18n}
				setPopBox={setPopBox}
			/>
		</Layout>
	);
};
