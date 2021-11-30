import React from "react";
import { defPromotionType } from "../common/def";

export default ({
	displayText_Detail,
	promotionType,
	promotionLink,
	promotionAction = 0,
	clickMoreInfo
}) => {
	return promotionType === defPromotionType.static && !promotionAction ? (
		<a href={promotionLink} target="_blank" rel="noreferrer">
			{displayText_Detail}
		</a>
	) : (
		<button onClick={clickMoreInfo}>{displayText_Detail}</button>
	);
};
