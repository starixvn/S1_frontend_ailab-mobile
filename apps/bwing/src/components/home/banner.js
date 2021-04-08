import React from "react";
import { useNavigate } from "@reach/router";
import banner_en from "../../styles/img/Daily rebate.png";
import banner_vn from "../../styles/img/Daily rebate vn.png";
import path from "../../path";

export default ({ langId }) => {
	const navigate = useNavigate();
	return (
		<div
			className="bannerS"
			onClick={() =>
				navigate(
					`/${path.promotionInfo.root}?BonusCode=BwingRebateNov20`
				)
			}>
			<img
				src={langId === "vn" ? banner_vn : banner_en}
				alt="Daily Rebate"
			/>
		</div>
	);
};
