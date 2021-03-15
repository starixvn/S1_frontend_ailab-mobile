import React, { useContext } from "react";
import { Promotion, defNav } from "@ailab-mobile/promotion";
import path from "Path";
import { Promotion as uiSetting } from "UISetting";
import { userInfoContext, i18nContext, popBoxContext } from "Context";
import config from "../config";
import staticList from "../datas/promotionList";
import Layout from "../components/common/layout";
import Header from "../components/header/header";

export default ({ location = {} }) => {
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	return (
		<Layout
			header={<Header title={i18n.lbl_Promotion} hideLogo={true} />}
			mainClass="main promotions">
			<Promotion
				staticList={staticList}
				config={config}
				uiSetting={uiSetting}
				path={path}
				userInfo={userInfo}
				i18n={i18n}
				setPopBox={setPopBox}
				location={location}
				navBar={[
					defNav.All,
					defNav.FirstDeposit,
					defNav.ReDeposit,
					defNav.SpecialBonus
				]}
			/>
		</Layout>
	);
};

// region fetch static promotion datas from cloud.
// const [staticList, setStaticList] = useState([]);
// fetch(siteInfo().staticPromotions)
// 	.then(res => {
// 		return res.json();
// 	})
// 	.then(data => {
// 		setStaticList(data);
// 	});
// endregion
