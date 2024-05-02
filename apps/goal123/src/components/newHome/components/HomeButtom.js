import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import { bannerImgUrl } from "../../../config";
import { userInfoContext } from "../../common/context";

import useGetSocialChannel, {
	defDisplayPage,
	defChannelName
} from "../../hook/useGetSocialChannel";

const providers = [
	{
		name: "saba",
		image: `${bannerImgUrl}/h5/img/home-page/provider/saba.png`,
		alt: "Saba"
	},
	{
		name: "tfg",
		image: `${bannerImgUrl}/h5/img/home-page/provider/tfg.png`,
		alt: "雷火tfg"
	},
	{
		name: "sbo",
		image: `${bannerImgUrl}/h5/img/home-page/provider/sbo.png`,
		alt: "sbobet"
	},
	{
		name: "bti",
		image: `${bannerImgUrl}/h5/img/home-page/provider/bti.png`,
		alt: "BTi"
	},
	{
		name: "ag",
		image: `${bannerImgUrl}/h5/img/home-page/provider/ag.png`,
		alt: "AG"
	},
	{
		name: "ae",
		image: `${bannerImgUrl}/h5/img/home-page/provider/ae.png`,
		alt: "AE"
	},
	{
		name: "n2live",
		image: `${bannerImgUrl}/h5/img/home-page/provider/n2live.png`,
		alt: "N2live"
	},
	{
		name: "ygg",
		image: `${bannerImgUrl}/h5/img/home-page/provider/ygg.png`,
		alt: "ygg"
	},
	{
		name: "cq9",
		image: `${bannerImgUrl}/h5/img/home-page/provider/cq9.png`,
		alt: "cq9"
	},
	{
		name: "png",
		image: `${bannerImgUrl}/h5/img/home-page/provider/png.png`,
		alt: "png"
	},
	{
		name: "jili",
		image: `${bannerImgUrl}/h5/img/home-page/provider/jili.png`,
		alt: "jili"
	},
	{
		name: "v8power",
		image: `${bannerImgUrl}/h5/img/home-page/provider/v8power.png`,
		alt: "v8power"
	},
	{
		name: "km",
		image: `${bannerImgUrl}/h5/img/home-page/provider/km.png`,
		alt: "king maker"
	},
	{
		name: "tc",
		image: `${bannerImgUrl}/h5/img/home-page/provider/tc.png`,
		alt: "tc gaming"
	},
	{
		name: "next",
		image: `${bannerImgUrl}/h5/img/home-page/provider/next.png`,
		alt: "nextspin"
	},
	{
		name: "im",
		image: `${bannerImgUrl}/h5/img/home-page/provider/im.png`,
		alt: "im sports"
	},
	{
		name: "im-esports",
		image: `${bannerImgUrl}/h5/img/home-page/provider/im-esports.png`,
		alt: "im esports"
	},
	{
		name: "spribe",
		image: `${bannerImgUrl}/h5/img/home-page/provider/spribe.png`,
		alt: "spribe"
	},
	{
		name: "es",
		image: `${bannerImgUrl}/h5/img/home-page/provider/es.png`,
		alt: "es"
	},
	{
		name: "world",
		image: `${bannerImgUrl}/h5/img/home-page/provider/world.png`,
		alt: "world"
	},
	{
		name: "fachai",
		image: `${bannerImgUrl}/h5/img/home-page/provider/fachai.png`,
		alt: "fa chai"
	}
];

const swiperParams = {
	slidesPerView: 4.5,
	spaceBetween: 6
};

const HomeButtom = () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);

	const { socialChannel } = useGetSocialChannel({
		langId: userInfo?.langId,
		displayPage: defDisplayPage.Home
	});

	const zaloData = socialChannel?.find(
		channel => channel.channelName === defChannelName.Zalo
	);

	return (
		<div className="home-bottom">
			<div className="bottom-info">
				<div className="socialmedia">
					<a
						href="https://www.facebook.com/dangcapnhacai.goal123/"
						target="_blank"
						rel="noreferrer">
						<img
							src={`${bannerImgUrl}/h5/img/home-page/icon/icon-facebook.svg`}
							alt="home-facebook"
						/>
					</a>
					<a href="">
						<img
							src={`${bannerImgUrl}/h5/img/home-page/icon/icon-youtube.svg`}
							alt="home-youtube"
						/>
					</a>
					<a
						href={zaloData ? zaloData.link : "#"}
						target="_blank"
						rel="noreferrer">
						<img
							src={`${bannerImgUrl}/h5/img/home-page/icon/icon-zalo.svg`}
							alt="home-zalo"
						/>
					</a>
				</div>
				<div className="provider">
					<Swiper {...swiperParams} className="swiper-wrapper">
						{providers.map(provider => (
							<SwiperSlide
								className="swiper-slide"
								key={provider.name}>
								<a href="" style={{ pointerEvents: "none" }}>
									<img
										src={provider.image}
										alt={provider.alt}
									/>
								</a>
							</SwiperSlide>
						))}
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
