import React from "react";
import { configContext } from "./context";
import { promotionAPI } from "@ailab-mobile/api";
import { isConvert } from "@ailab-mobile/common";

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
			divisionBy1000,
			isConvert: isConvert(userInfo.currencyId)
		}}>
		{children}
	</configContext.Provider>
);
