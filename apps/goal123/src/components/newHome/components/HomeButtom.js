import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import { bannerImgUrl } from "../../../config";
import { userInfoContext } from "../../common/context";

import useGetSocialChannel, {
	defDisplayPage
} from "../../hook/useGetSocialChannel";
import { useMenu } from "../../hook/useMenu";
import defPlatform from "../../setting/defPlatform";
import useClickGame from "../hooks/useClickGame";

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
	const { menuList = [] } = useMenu();
	const { onclickStaticProduct } = useClickGame();

	const { socialChannel } = useGetSocialChannel({
		langId: userInfo?.langId,
		displayPage: defDisplayPage.Home
	});

	const providers = menuList.flatMap(mainMenuItem => {
		const { data } = mainMenuItem || {};

		return data?.flatMap(subMenuItem => {
			const defProduct = defPlatform.find(
				product => product.tpGameIdNo === subMenuItem.tpGameIdNo
			);
			if (defProduct) {
				return {
					...subMenuItem,
					...defProduct
				};
			}

			return [];
		});
	});

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
						{providers.map(provider => {
							const { imgName, homeImage } = provider || {};
							return (
								homeImage && (
									<SwiperSlide
										className="swiper-slide"
										key={imgName}>
										<button
											onClick={() =>
												onclickStaticProduct(provider)
											}>
											<img
												src={`${bannerImgUrl}/h5/img/home-page/provider/${homeImage}.png`}
												alt={imgName}
											/>
										</button>
									</SwiperSlide>
								)
							);
						})}
					</Swiper>
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
