import React from "react";
import { bannerImgUrl, siteInfo } from "apps/goal123/src/config";

const MenuRoofSection = ({ toggleMenu }) => {
	const liveChatUrl = `https://direct.lc.chat/${siteInfo().liveChatId}
	}`;

	return (
		<div className="menu-top">
			<button className="btn-close" onClick={toggleMenu}>
				<img
					src={`${bannerImgUrl}/h5/img/home-page/icon/sidemenu-close.svg`}
					alt="menu-close"
				/>
			</button>
			<a
				className="btn-livechat"
				href={`https://direct.lc.chat/${siteInfo().liveChatId}`}>
				<img
					src={`${bannerImgUrl}/h5/img/home-page/icon/sidemenu-livechat.svg`}
					alt="menu-livechat"
				/>
			</a>
		</div>
	);
};

export default MenuRoofSection;
