import React from "react";
import { configContext } from "./context";
import { promotionAPI } from "@ailab-mobile/api";

export default ({
	config,
	path,
	uiSetting = {},
	children,
	i18n = {},
	userInfo,
	setPopBox,
	ruleCols,
	divisionBy1000
}) => (
	<configContext.Provider
		value={{
			config,
			path,
			uiSetting,
			i18n,
			userInfo,
			setPopBox,
			api: { promotion: new promotionAPI({ apiURL: config.apiURL }) },
			ruleCols,
			divisionBy1000
		}}>
		{children}
	</configContext.Provider>
);
