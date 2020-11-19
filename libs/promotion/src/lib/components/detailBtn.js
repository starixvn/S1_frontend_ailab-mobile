import React from "react";
import { Link } from "@reach/router";
import path from "Path";
import { Promotion as uiSetting } from "UISetting";

export default ({ bonusCode, displayText_Detail }) => (
	<Link
		to={`/${path.promotionInfo.root}?BonusCode=${bonusCode}`}
		className={uiSetting.detailBtn ?? "white"}>
		{displayText_Detail}
	</Link>
);
