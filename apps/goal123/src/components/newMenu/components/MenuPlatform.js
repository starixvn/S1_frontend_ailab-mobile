import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { bannerImgUrl, siteInfo } from "apps/goal123/src/config";
import { userInfoContext } from "../../common/context";

const MenuPlatform = () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);

	return (
		<div className="menu-platform">
			<div className="platform">
				{userInfo.isLogin && (
					<a href="/referral">
						<img
							src={`${bannerImgUrl}/h5/img/home-page/icon/sidemenu-referral.svg`}
							alt="sidemenu-referral"
						/>
						<span>{t("lbl_Referral")}</span>
					</a>
				)}
				<a href="/vip">
					<img
						src={`${bannerImgUrl}/h5/img/home-page/icon/sidemenu-vip.svg`}
						alt="sidemenu-vip"
					/>
					<span>{t("Label_Menu_Vip")}</span>
				</a>
				<a href="/leaderBoard">
					<img
						src={`${bannerImgUrl}/h5/img/home-page/icon/sidemenu-leaderboard.svg`}
						alt="sidemenu-leaderboard"
					/>
					<span>{t("lbl_LeaderBoard")}</span>
				</a>
				<a href={siteInfo({ langId: userInfo.langId }).affiliateLink}>
					<img
						src={`${bannerImgUrl}/h5/img/home-page/icon/sidemenu-affiliate.svg`}
						alt="sidemenu-affiliate"
					/>
					<span>{t("Label_Menu_Affiliate")}</span>
				</a>
				<a href="/luckyWheel">
					<img
						src={`${bannerImgUrl}/h5/img/home-page/icon/sidemenu-luckywheel.svg`}
						alt="sidemenu-luckywheel"
					/>
					<span>{t("Label_Menu_Lucky_Wheel")}</span>
				</a>
			</div>
		</div>
	);
};

export default MenuPlatform;
