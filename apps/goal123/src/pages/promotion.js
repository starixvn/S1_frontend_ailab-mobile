import React, { useContext } from "react";
import { Promotion, defRuleCols, defNav } from "@ailab-mobile/promotion";
import config from "Config";
import path from "Path";
import { Promotion as uiSetting } from "UISetting";
import { userInfoContext, i18nContext, popBoxContext } from "Context";
import staticList from "../datas/promotionList";

const defPromotionNav = [
	defNav.All,
	defNav.FirstDeposit,
	defNav.FreeBet,
	defNav.ReDeposit,
	defNav.RebateAndCashBack,
	defNav.SpecialBonus
];

export default ({ location }) => {
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
			formatSetting={{
				isConvertRequired: true,
				digits: 2,
				formatRequired: false
			}}
			location={location}
			ruleCols={[
				defRuleCols.minAmount,
				defRuleCols.rollOver,
				defRuleCols.remainingTime
			]}
			navBar={defPromotionNav}
		/>
	);
};
