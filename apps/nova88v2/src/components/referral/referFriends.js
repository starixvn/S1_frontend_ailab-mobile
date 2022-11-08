import React, { useContext } from "react";
import { i18nContext, popBoxContext, userInfoContext } from "../common/context";
import { isConvert } from "../common/common";
import Links from "./referral.links";
import Summary from "./referral.summary";
import Condition from "./referral.condition";
import { cloudBannerImgURL } from "../../config";

export default () => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const _isConvert = isConvert(userInfo.currencyId);

	let _stepImg;
	switch (userInfo.langId) {
		case "cs":
			_stepImg = `${cloudBannerImgURL}/h5/img/refbanner-new-cs.png`;
			break;
		case "my":
			_stepImg = `${cloudBannerImgURL}/h5/img/refbanner-new-my.png`;
			break;
		case "th":
			_stepImg = `${cloudBannerImgURL}/h5/img/refbanner-new-th.png`;
			break;
		case "id":
			_stepImg = `${cloudBannerImgURL}/h5/img/refbanner-new-id.png`;
			break;
		case "hi":
			_stepImg = `${cloudBannerImgURL}/h5/img/refbanner-new-hi.png`;
			break;
		default:
			_stepImg = `${cloudBannerImgURL}/h5/img/refbanner-new-en.png`;
			break;
	}

	return (
		<>
			<Summary
				userInfo={userInfo}
				i18n={i18n}
				setPopBox={setPopBox}
				_isConvert={_isConvert}
			/>
			<img
				className="refbanner"
				src={_stepImg}
				alt="referral step banner"
			/>
			<Condition
				userInfo={userInfo}
				i18n={i18n}
				setPopBox={setPopBox}
				_isConvert={_isConvert}
			/>
			<Links userInfo={userInfo} i18n={i18n} setPopBox={setPopBox} />
		</>
	);
};
