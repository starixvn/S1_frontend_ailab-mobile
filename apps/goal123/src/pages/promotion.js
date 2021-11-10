import React, { useContext } from "react";
import { Promotion } from "@ailab-mobile/promotion";
import config from "Config";
import path from "Path";
import { Promotion as uiSetting } from "UISetting";
import {
	userInfoContext,
	i18nContext,
	popBoxContext,
	navContext,
	defNavPanel
} from "../components/common/context";
import staticList from "../datas/promotionList";
import Layout from "../components/common/layout";

export default ({ location }) => {
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const { setNav } = useContext(navContext);

	const handleLogin = () => {
		setNav(defNavPanel.login);
	};
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
				visitorCurrency={{ vn: 51, en: 51 }}
				handleLogin={handleLogin}
			/>
		</Layout>
	);
};
