import React, { useContext } from "react";
import { Link } from "@reach/router";
import { configContext } from "../common/context";

export default ({ bonusCode, displayText_Detail, urlParameters = {} }) => {
	const urlParams = Object.keys(urlParameters)
		.map(key => `${key}=${urlParameters[key]}`)
		.join("&");
	const { path, uiSetting } = useContext(configContext);
	return (
		<Link
			to={`/${path.promotionInfo.root}?BonusCode=${bonusCode}${
				urlParams?.length > 0 ? `&${urlParams}` : ""
			}`}
			className={uiSetting.detailBtn ?? "white"}>
			{displayText_Detail}
		</Link>
	);
};
