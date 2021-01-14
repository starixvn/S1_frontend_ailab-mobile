import React, { useContext } from "react";
import { Promotion, defNav } from "@ailab-mobile/promotion";
import config from "Config";
import path from "Path";
import { Promotion as uiSetting } from "UISetting";
import { userInfoContext, i18nContext, popBoxContext } from "Context";
import staticList from "../datas/promotionList";

export default ({ location = {} }) => {
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
			location={location}
			navBar={[
				defNav.All,
				defNav.FirstDeposit,
				defNav.ReDeposit,
				defNav.SpecialBonus
			]}
		/>
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
