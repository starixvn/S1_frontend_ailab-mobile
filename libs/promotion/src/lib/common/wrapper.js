import React from "react";
import { configContext } from "./context";
import { PromotionAPI } from "@ailab-mobile/api";

export default ({
	config,
	path,
	uiSetting = {},
	children,
	i18n = {},
	userInfo,
	setPopBox
}) => (
	<configContext.Provider
		value={{
			config,
			path,
			uiSetting,
			i18n,
			userInfo,
			setPopBox,
			api: new PromotionAPI({ apiURL: config.apiURL })
		}}>
		{children}
	</configContext.Provider>
);
