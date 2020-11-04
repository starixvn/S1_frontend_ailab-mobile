import React from "react";
import { Link } from "@reach/router";
import path from "Path";

export default ({ class_DetailBtn, bonusCode, displayText_Detail }) => (
	<Link
		to={`/${path.promotionInfo.root}?BonusCode=${bonusCode}`}
		className={class_DetailBtn ?? "white"}>
		{displayText_Detail}
	</Link>
);
