import React, { useContext } from "react";
import { Link } from "@reach/router";
import { configContext } from "../common/context";

export default ({ bonusCode, displayText_Detail }) => {
	const { path, uiSetting } = useContext(configContext);
	return (
		<Link
			to={`/${path.promotionInfo.root}?BonusCode=${bonusCode}`}
			className={uiSetting.detailBtn ?? "white"}>
			{displayText_Detail}
		</Link>
	);
};
