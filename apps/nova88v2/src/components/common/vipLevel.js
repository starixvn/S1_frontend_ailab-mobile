import React from "react";

const markMap = {
	1: "lbl_Vintage_Club",
	2: "lbl_Silver_Club",
	3: "lbl_Gold_Club",
	4: "lbl_Titanium_Club",
	5: "lbl_Diamond_Club",
	6: "lbl_Nova_Club"
};

const csMap = {
	1: "lbl_Vintage",
	2: "lbl_Silver",
	3: "lbl_Gold",
	4: "lbl_Titanium",
	5: "lbl_Diamond",
	6: "lbl_Nova"
};

const VIPLevel = ({ userInfo, i18n }) => {
	return (
		<div className="vip_mark">
			<img
				src={`https://image.0814media.net/VIP/img/vip0${
					userInfo?.userLevel ?? 1
				}.png`}
				alt="vip"
			/>
			<div>
				{userInfo.langId === "cs"
					? `${i18n[csMap[userInfo.userLevel]]} ${i18n.lbl_Club}`
					: i18n[markMap[userInfo.userLevel]]}
			</div>
		</div>
	);
};

export default VIPLevel;
