import React, { useContext } from "react";
import { Link } from "@reach/router";
import { configContext } from "../common/context";
import { defPromotionType } from "../common/def";

export default ({
	bonusCode,
	displayText_Detail,
	urlParameters = {},
	promotionType,
	promotionLink,
	promotionAction = 0
}) => {
	const urlParams = Object.keys(urlParameters)
		.map(key => `${key}=${urlParameters[key]}`)
		.join("&");
	const { path, uiSetting } = useContext(configContext);
	return promotionType === defPromotionType.static && !promotionAction ? (
		<a
			href={promotionLink}
			target="_blank"
			rel="noreferrer"
			className={uiSetting.detailBtn ?? "white"}>
			{displayText_Detail}
		</a>
	) : (
		<Link
			to={`/${path.promotionInfo.root}?BonusCode=${bonusCode}${
				urlParams?.length > 0 ? `&${urlParams}` : ""
			}`}
			className={uiSetting.detailBtn ?? "white"}>
			{displayText_Detail}
		</Link>
	);
};
