import React from "react";
import { bannerImgUrl, siteInfo } from "apps/goal123/src/config";

const MenuTop = ({ toggleMenu }) => {
	const liveChatUrl = `https://direct.lc.chat/${siteInfo().liveChatId}
	}`;

	const handleLiveChatClick = () => {
		window.open(liveChatUrl, "_blank", "noopener,noreferrer");
	};

	return (
		<div className="menu-top">
			<button className="btn-close" onClick={toggleMenu}>
				<img
					src={`${bannerImgUrl}/h5/img/home-page/icon/sidemenu-close.svg`}
					alt="menu-close"
				/>
			</button>
			<button className="btn-livechat" onClick={handleLiveChatClick}>
				<img
					src={`${bannerImgUrl}/h5/img/home-page/icon/sidemenu-livechat.svg`}
					alt="menu-livechat"
				/>
			</button>
		</div>
	);
};

export default MenuTop;
