import React from "react";
import banner_en from "../../styles/img/Daily rebate.png";
import banner_vn from "../../styles/img/Daily rebate vn.png";

export default ({ langId }) => {
	return (
		<div className="bannerS">
			<img
				src={langId === "vn" ? banner_vn : banner_en}
				alt="Daily Rebate"
			/>
		</div>
	);
};
