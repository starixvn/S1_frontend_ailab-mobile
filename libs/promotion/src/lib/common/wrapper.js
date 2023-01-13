import React from "react";
import { PromotionAPI, AccountAPI } from "@ailab-mobile/api";
import { configContext } from "./context";
import { defWrapperCol, defRuleCols } from "./def";
import { isConvert } from "./common";

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
		digits: undefined,
		formatRequired: undefined
	},
	visitorCurrency = {},
	promoBox,
	setPromoBox,
	liveChatId,
	handleLogin
}) => {
	return (
		<configContext.Provider
			value={{
				visitorCurrency,
				config,
				path,
				uiSetting,
				i18n,
				userInfo,
				setPopBox,
				api: {
					promotion: new PromotionAPI({ apiURL: config?.apiURL }),
					account: new AccountAPI({ apiURL: config?.apiURL })
				},
				ruleCols,
				formatSetting: {
					[defWrapperCol.formatSetting.isConvertRequired]:
						formatSetting.isConvertRequired,
					[defWrapperCol.formatSetting.formatRequired]:
						formatSetting.formatRequired === undefined
							? isConvert(userInfo.currencyId)
							: formatSetting.formatRequired,
					[defWrapperCol.formatSetting.digits]: formatSetting.digits
				},
				promoBox,
				setPromoBox,
				liveChatId,
				handleLogin
			}}>
			{children}
		</configContext.Provider>
	);
};
