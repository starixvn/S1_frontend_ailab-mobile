import React, { useContext } from "react";
import { Promotion, defRuleCols } from "@ailab-mobile/promotion";
import config from "Config";
import path from "Path";
import { Promotion as uiSetting } from "UISetting";
import { userInfoContext, i18nContext, popBoxContext } from "Context";

export default ({ location }) => {
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	return (
		<Promotion
			config={config}
			uiSetting={uiSetting}
			path={path}
			userInfo={userInfo}
			i18n={i18n}
			setPopBox={setPopBox}
			formatSetting={{
				isConvertRequired: true,
				digits: 2,
				formatRequired: false
			}}
			location={location}
			// navBar={[defNav.All, defNav.FirstDeposit, defNav.ReDeposit]}
			ruleCols={[
				defRuleCols.minAmount,
				defRuleCols.rollOver,
				defRuleCols.remainingTime
			]}
		/>
	);
};
