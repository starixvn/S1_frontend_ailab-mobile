import React, { useContext } from "react";
import { i18nContext, popBoxContext, userInfoContext } from "../common/context";
import Links from "./referral.links";
import Summary from "./referral.summary";
import Condition from "./referral.condition";
import { bannerImgUrl } from "../../config";

export default () => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);

	return (
		<>
			<Summary userInfo={userInfo} i18n={i18n} setPopBox={setPopBox} />
			<img
				className="refbanner"
				src={
					userInfo.langId === "en"
						? `${bannerImgUrl}/h5/img/4.0/refbanner.png`
						: `${bannerImgUrl}/h5/img/4.0/refbanner_vn.png`
				}
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
