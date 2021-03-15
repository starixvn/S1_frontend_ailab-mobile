import React, { useContext } from "react";
import { i18nContext, userInfoContext } from "Context";
import { Link } from "@Router";
import ProfileDetail from "./profile.detail";
import path from "../../path";

const Panel = () => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
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
	return (
		<>
			<div className="icon icon-member">
				<div className="circleAnimation" />
			</div>
			<div className="vip_mark">
				<img
					src={`https://image.n88media.com/VIP/img/vip0${userInfo.userLevel}.png`}
					alt="vip"
				/>
				<div>
					{userInfo.langId === "cs"
						? `${i18n[csMap[userInfo.userLevel]]} ${i18n.lbl_Club}`
						: i18n[markMap[userInfo.userLevel]]}
				</div>
			</div>
			<ProfileDetail />
			<div className="btn-group">
				<Link to={`${path.changePassword.root}`}>
					{i18n.lbl_ChangePassword}
				</Link>
			</div>
		</>
	);
};

export default Panel;
