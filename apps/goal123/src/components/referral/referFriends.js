import React, { useContext } from "react";
import { i18nContext, popBoxContext, userInfoContext } from "../common/context";
import stepImg_en from "../../styles/img/refbanner-en.png";
import stepImg_vn from "../../styles/img/refbanner-vn.png";
import Links from "./referral.links";
import Summary from "./referral.summary";
import Condition from "./referral.condition";

export default () => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);

	return (
		<>
			<Summary userInfo={userInfo} i18n={i18n} setPopBox={setPopBox} />
			<img
				className="refbanner"
				src={userInfo.langId === "en" ? stepImg_en : stepImg_vn}
				alt="referral step banner"
			/>
			<Condition userInfo={userInfo} i18n={i18n} setPopBox={setPopBox} />
			<Links
				isLogin={userInfo.isLogin}
				i18n={i18n}
				setPopBox={setPopBox}
			/>
		</>
	);
};
