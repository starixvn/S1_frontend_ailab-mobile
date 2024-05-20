import React from "react";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import { useTranslation } from "react-i18next";
import path from "apps/goal123/src/path";
import { defSlotTpGameType } from "../../../datas/productList";
import config from "../../../config";

const images = [
	{
		link: `/${path.casino}/${defSlotTpGameType.PP.tpId}`,
		imgSrc: `${config.t_and_cURL}/h5/img/home-page/pop-pp.jpg`,
		altText: "pop-pp",
		logoSrc: `${config.t_and_cURL}/h5/img/home-page/popular-slots-pp.png`,
		logoAlt: "popular-slots-pp"
	},
	{
		link: `/${path.casino}/${defSlotTpGameType.Skywind.tpId}`,
		imgSrc: `${config.t_and_cURL}/h5/img/home-page/pop-sky.jpg`,
		altText: "pop-micro",
		logoSrc: `${config.t_and_cURL}/h5/img/home-page/popular-slots-sky.png`,
		logoAlt: "popular-slots-sky"
	},
	{
		link: `/${path.casino}/${defSlotTpGameType.SG.tpId}`,
		imgSrc: `${config.t_and_cURL}/h5/img/home-page/pop-spad.jpg`,
		altText: "pop-micro",
		logoSrc: `${config.t_and_cURL}/h5/img/home-page/popular-slots-spade.png`,
		logoAlt: "popular-slots-spad"
	},
	{
		link: `/${path.casino}/${defSlotTpGameType.JILI.tpId}`,
		imgSrc: `${config.t_and_cURL}/h5/img/home-page/pop-jili.jpg`,
		altText: "pop-jili",
		logoSrc: `${config.t_and_cURL}/h5/img/home-page/popular-slots-jili.png`,
		logoAlt: "popular-slots-jili"
	},

	{
		link: `/${path.casino}/${defSlotTpGameType.MG.tpId}`,
		imgSrc: `${config.t_and_cURL}/h5/img/home-page/pop-micro.jpg`,
		altText: "pop-micro",
		logoSrc: `${config.t_and_cURL}/h5/img/home-page/popular-slots-micro.png`,
		logoAlt: "popular-slots-micro"
	},
	{
		link: `/${path.casino}/${defSlotTpGameType.CQ9.tpId}`,
		imgSrc: `${config.t_and_cURL}/h5/img/home-page/pop-cq9.jpg`,
		altText: "pop-cq9",
		logoSrc: `${config.t_and_cURL}/h5/img/home-page/popular-slots-cq9.png`,
		logoAlt: "popular-slots-cq9"
	}
];

const HomePopularSlotGames = () => {
	const { t } = useTranslation();

	const swiperParams = {
		slidesPerView: 2.4,
		spaceBetween: 30
	};

	return (
		<div className="home-popularslots">
			<div className="home-title">
				{t("lbl_Home_Popular_Slot_Games_Ranking")}
			</div>
			<div className="popularslots-top">
				<a
					className="top-item"
					href={`/casino/${defSlotTpGameType.PG.tpId}`}>
					<img
						src={`${config.t_and_cURL}/h5/img/home-page/popular-slots-pg.png`}
						alt="slot-pg"
					/>
				</a>

				<a
					className="top-item"
					href={`/casino/${defSlotTpGameType.AdvantPlay.tpId}`}>
					<img
						src={`${config.t_and_cURL}/h5/img/home-page/popular-slots-ap.png`}
						alt="slot-pg"
					/>
				</a>
			</div>
			<div className="popularslots-bottom">
				<Swiper {...swiperParams}>
					{images.map(image => (
						<SwiperSlide>
							<a className="bottom-item" href={image.link}>
								<img src={image.imgSrc} alt={image.altText} />
								<div>
									<img
										src={image.logoSrc}
										alt={image.logoAlt}
									/>
								</div>
							</a>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	);
};

export default HomePopularSlotGames;
