import React, { useContext } from "react";
import { products } from "@ailab-mobile/common";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import { bannerImgUrl } from "../../../config";
import { userInfoContext } from "../../common/context";

import useGetSocialChannel, {
	defDisplayPage
} from "../../hook/useGetSocialChannel";
import useClickGame from "../hooks/useClickGame";
import { defMenuType } from "../../../datas/defMenu";
import path from "../../../path";

const swiperParams = {
	slidesPerView: 4.5,
	spaceBetween: 6
};

const channelNameToImg = {
	Facebook: "icon-facebook",
	Zalo: "icon-zalo",
	Telegram: "icon-telegram",
	Skype: "icon-skype",
	Livechat: "icon-livechat"
};

const HomeButtom = () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { onclickStaticProduct } = useClickGame();

	const { socialChannel } = useGetSocialChannel({
		langId: userInfo?.langId,
		displayPage: defDisplayPage.Home
	});

	const defPlatFromList = [
		{
			...products.Soccer,
			imgName: "saba"
		},
		{
			...products.TFGaming,
			imgName: "tfg"
		},
		{
			...products.SBOBET,
			imgName: "sbo"
		},
		{
			...products.BtiSport,
			imgName: "bti"
		},
		{
			...products.AsiaGaming,
			imgName: "ag"
		},
		{
			...products.AESexy,
			imgName: "ae"
		},
		{
			...products.YeebetCasino,
			imgName: "ygg"
		},
		{
			...products.CQ9,
			imgName: "cq9",
			path: path.casino.root,
			parameter: { provider: products.CQ9.tpId },
			menuType: defMenuType.Link
		},
		{
			...products.PlaynGO,
			imgName: "png",
			path: path.casino.root,
			parameter: { provider: products.PlaynGO.tpId },
			menuType: defMenuType.Link
		},
		{
			...products.JILI,
			imgName: "jili",
			path: path.casino.root,
			parameter: { provider: products.JILI.tpId },
			menuType: defMenuType.Link
		},
		{
			...products.V8Poker,
			imgName: "v8power"
		},
		{
			...products.KingMaker,
			imgName: "km"
		},
		{
			...products.TFGaming,
			imgName: "tc"
		},
		{
			...products.Nextspin,
			imgName: "next",
			path: path.casino.root,
			parameter: { provider: products.Nextspin.tpId },
			menuType: defMenuType.Link
		},
		{
			...products.IMSports,
			imgName: "im"
		},
		{
			...products.IMESports,
			imgName: "im-esports"
		},
		{
			...products.SPRIBE,
			imgName: "spribe",
			path: path.casino.root,
			parameter: { provider: products.SPRIBE.tpId },
			menuType: defMenuType.Link
		},
		{
			...products.ES,
			imgName: "es",
			path: path.casino.root,
			parameter: { provider: products.ES.tpId },

			menuType: defMenuType.Link
		},
		{
			...products.WE,
			imgName: "world"
		},
		{
			...products.FaChai,
			imgName: "fachai",
			path: path.casino.root,
			parameter: { provider: products.FaChai.tpId },
			menuType: defMenuType.Link
		}
	];
	return (
		<div className="home-bottom">
			<div className="bottom-info">
				<div className="socialmedia">
					<a href="https://www.youtube.com/@GOAL123VietNam">
						<img
							src={`${bannerImgUrl}/h5/img/home-page/icon/icon-youtube.svg`}
							alt="home-youtube"
						/>
					</a>
					{socialChannel?.map(item => (
						<a
							key={`channel-${item.channelName}`}
							href={item.link}
							target="_blank"
							rel="noreferrer">
							<img
								src={`${bannerImgUrl}/h5/img/home-page/icon/${
									channelNameToImg[item.channelName]
								}.svg`}
								alt={item.channelName}
							/>
						</a>
					))}
				</div>
				<div className="provider">
					<Swiper {...swiperParams} className="swiper-wrapper">
						{/* Goal 的遊戲跟 PM 討論後為顯示固定的遊戲，不會因為 api 變動 */}
						{defPlatFromList.map(product => {
							const { imgName } = product || {};
							return (
								imgName && (
									<SwiperSlide
										className="swiper-slide"
										key={imgName}>
										<button
											onClick={() =>
												onclickStaticProduct(product)
											}>
											<img
												src={`${bannerImgUrl}/h5/img/home-page/provider/${imgName}.png`}
												alt={imgName}
											/>
										</button>
									</SwiperSlide>
								)
							);
						})}
					</Swiper>
				</div>

				<div className="license">
					<span> {t("lbl_GamingLicense")}</span>
					<img
						src={`${bannerImgUrl}/h5/img/home-page/gaming-license/curacao.png`}
						alt="GamingLicenseImg"
					/>
				</div>

				<div className="powered">
					<span>{t("lbl_PoweredBy")}</span>
					<img
						src={`${bannerImgUrl}/h5/img/bong88.png`}
						alt="home-bong88"
					/>
				</div>
			</div>
			<div
				className={userInfo.isLogin ? "copyright active" : "copyright"}>
				{`© Copyright ${new Date().getFullYear()}. Goal123. All Rights Reserved. `}
				<span>18+</span>
			</div>
		</div>
	);
};

export default HomeButtom;
