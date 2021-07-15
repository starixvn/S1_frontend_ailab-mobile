import React, { useContext } from "react";
import { PromotionInfo } from "@ailab-mobile/promotion";
import config from "Config";
import path from "Path";
import { Promotion as uiSetting } from "UISetting";
import { userInfoContext, i18nContext, popBoxContext } from "Context";

export default () => {
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	return (
		<PromotionInfo
			config={config}
			uiSetting={uiSetting}
			path={path}
			userInfo={userInfo}
			i18n={i18n}
			setPopBox={setPopBox}
			formatSetting={{
				isConvertRequired: false,
				digits: 0,
				formatRequired: false
			}}
			visitorCurrency={{ vn: 51, en: 51 }}
		/>
	);
};
