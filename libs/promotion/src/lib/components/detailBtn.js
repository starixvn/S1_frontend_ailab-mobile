import React, { useContext } from "react";
import { configContext } from "../common/context";
import { defPromotionType } from "../common/def";

export default ({
	displayText_Detail,
	promotionType,
	promotionLink,
	promotionAction = 0,
	clickMoreInfo
}) => {
	const { uiSetting } = useContext(configContext);
	return promotionType === defPromotionType.static && !promotionAction ? (
		<a
			href={promotionLink}
			target="_blank"
			rel="noreferrer"
			className={uiSetting.detailBtn ?? "white"}>
			{displayText_Detail}
		</a>
	) : (
		<button
			onClick={clickMoreInfo}
			className={uiSetting.detailBtn ?? "white"}>
			{displayText_Detail}
		</button>
	);
};
