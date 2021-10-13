import React, { useContext } from "react";
import { Promotion, defNav } from "@ailab-mobile/promotion";
import config from "Config";

import path from "Path";
import { Promotion as uiSetting } from "UISetting";
import { userInfoContext, i18nContext, popBoxContext } from "Context";
import staticList from "../datas/promotionList";
import Layout from "../components/common/layout";

const defPromotionNav = [
	defNav.All,
	defNav.FirstDeposit,
	defNav.FreeBet,
	defNav.ReDeposit,
	defNav.RebateAndCashBack,
	defNav.SpecialBonus,
	defNav.Static
];

export default ({ location }) => {
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	return (
		<Layout title={i18n.lbl_Promotion} mainClass="main promotions">
			<Promotion
				staticList={staticList}
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
				location={location}
				navBar={defPromotionNav}
				visitorCurrency={{ vn: 51, en: 51 }}
			/>
		</Layout>
	);
};
