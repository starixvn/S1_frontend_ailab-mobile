import React, { useContext } from "react";
import { Promotion } from "@ailab-mobile/promotion";
import staticList from "../datas/promotionList";
import config from "Config";
import path from "Path";
import { Promotion as uiSetting } from "UISetting";
import { userInfoContext, i18nContext, popBoxContext } from "Context";

export default () => {
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	return (
		<Promotion
			staticList={staticList}
			config={config}
			uiSetting={uiSetting}
			path={path}
			userInfo={userInfo}
			i18n={i18n}
			setPopBox={setPopBox}
		/>
	);
};
