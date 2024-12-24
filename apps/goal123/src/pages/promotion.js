import React, { useContext } from "react";
import { Promotion } from "@ailab-mobile/promotion";
import config from "Config";
import path from "Path";
import { Promotion as uiSetting } from "UISetting";
import {
	userInfoContext,
	i18nContext,
	popBoxContext,
	promoPopBox,
	navContext,
	defNavPanel
} from "../components/common/context";
import staticList from "../datas/promotionList";
import Layout from "../components/common/layout";
import PromotionWrapper from "../components/promotion/wrapper";
import { siteInfo } from "../config";

// eslint-disable-next-line react/prop-types
export default ({ location }) => {
	const { i18n } = useContext(i18nContext);
	return (
		<PromotionWrapper>
			<Layout title={i18n.lbl_Promotion} mainClass="main promotions">
				<Content location={location} />
			</Layout>
		</PromotionWrapper>
	);
};

// eslint-disable-next-line react/prop-types
const Content = ({ location }) => {
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const { promoBox, setPromoBox } = useContext(promoPopBox);
	const { setNav } = useContext(navContext);

	const handleLogin = () => {
		setNav(defNavPanel.login);
	};
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
				isConvertRequired: false,
				digits: 0,
				formatRequired: false
			}}
			location={location}
			visitorCurrency={{ vn: 51, en: 51 }}
			promoBox={promoBox}
			setPromoBox={setPromoBox}
			liveChatId={siteInfo(userInfo.langId).liveChatId}
			handleLogin={handleLogin}
		/>
	);
};
