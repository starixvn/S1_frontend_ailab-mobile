import React, { useContext } from "react";
import { i18nContext, popBoxContext, userInfoContext } from "../common/context";
import stepImg_en from "../../styles/img/refbanner-en.png";
import stepImg_cs from "../../styles/img/refbanner-cs.png";
import stepImg_th from "../../styles/img/refbanner-th.png";
import stepImg_id from "../../styles/img/refbanner-id.png";
import stepImg_hi from "../../styles/img/refbanner-hi.png";
import { isConvert } from "../common/common";
import Links from "./referral.links";
import Summary from "./referral.summary";
import Condition from "./referral.condition";

export default () => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const _isConvert = isConvert(userInfo.currencyId);

	let _stepImg;
	switch (userInfo.langId) {
		case "cs":
			_stepImg = stepImg_cs;
			break;
		case "th":
			_stepImg = stepImg_th;
			break;
		case "id":
			_stepImg = stepImg_id;
			break;
		case "hi":
			_stepImg = stepImg_hi;
			break;
		default:
			_stepImg = stepImg_en;
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
