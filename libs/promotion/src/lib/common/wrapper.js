import React from "react";
import { configContext } from "./context";
import { promotionAPI } from "@ailab-mobile/api";
import { isConvert } from "@ailab-mobile/common";
import { defWrapperCol } from "../common/def";

export default ({
	config,
	path,
	uiSetting = {},
	children,
	i18n = {},
	userInfo = {},
	setPopBox,
	ruleCols,
	formatSetting = {
		isConvertRequired: false,
		digits: undefined
	}
}) => (
	<configContext.Provider
		value={{
			config,
			path,
			uiSetting,
			i18n,
			userInfo,
			setPopBox,
			api: { promotion: new promotionAPI({ apiURL: config?.apiURL }) },
			ruleCols,
			formatSetting: {
				[defWrapperCol.formatSetting.isConvertRequired]:
					formatSetting.isConvertRequired,
				[defWrapperCol.formatSetting.formatRequired]: isConvert(
					userInfo.currencyId
				),
				[defWrapperCol.formatSetting.digits]: formatSetting.digits
			}
		}}>
		{children}
	</configContext.Provider>
);
