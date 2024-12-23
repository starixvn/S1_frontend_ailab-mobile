import PropTypes from "prop-types";
import React, { useContext } from "react";
import config from "Config";
import path from "Path";
import { promotionUiSetting } from "../components/promotion/promotionUiSetting";
import {
	userInfoContext,
	i18nContext,
	popBoxContext,
	promoPopBox,
	navContext,
	defNavPanel
} from "../components/common/context";
import PromotionWrapper from "../components/promotion/wrapper";
import { siteInfo } from "../config";
import Promotion from "../components/promotion/promotion";

// eslint-disable-next-line react/prop-types
export default ({ location }) => {
	return (
		<PromotionWrapper>
			<Content location={location} />
		</PromotionWrapper>
	);
};

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
			config={config}
			uiSetting={promotionUiSetting}
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

Content.defaultProps = {
	location: null
};

Content.propTypes = {
	location: PropTypes.objectOf(PropTypes.any)
};
