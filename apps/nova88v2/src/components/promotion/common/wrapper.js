import React from "react";
import { PromotionAPI } from "@ailab-mobile/api";
import { isConvert } from "@ailab-mobile/common";
import { configContext } from "./context";
import { defWrapperCol, defRuleCols } from "./def";

export default ({
	config,
	path,
	uiSetting = {},
	children,
	i18n = {},
	userInfo = {},
	setPopBox,
	ruleCols = [
		defRuleCols.minAmount,
		defRuleCols.bonus,
		defRuleCols.maxBonus,
		defRuleCols.rollOver,
		defRuleCols.remainingTime
	],
	formatSetting = {
		isConvertRequired: false,
		digits: 0,
		formatRequired: undefined
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
			api: { promotion: new PromotionAPI({ apiURL: config?.apiURL }) },
			ruleCols,
			formatSetting: {
				[defWrapperCol.formatSetting.isConvertRequired]:
					formatSetting.isConvertRequired,
				[defWrapperCol.formatSetting.formatRequired]:
					formatSetting.formatRequired === undefined
						? isConvert(userInfo.currencyId)
						: formatSetting.formatRequired,
				[defWrapperCol.formatSetting.digits]: formatSetting.digits
			}
		}}>
		{children}
	</configContext.Provider>
);
