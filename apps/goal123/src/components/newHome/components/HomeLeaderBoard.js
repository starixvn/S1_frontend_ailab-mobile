import React from "react";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import { Autoplay, Pagination } from "swiper";
import { useTranslation } from "react-i18next";
import { number_format } from "../utils/homeFormatter";
import { bannerImgUrl } from "../../../config";
import useTopWinnerList from "../hooks/useWinnerList";

import "swiper/swiper.min.css";

const HomeLeaderBoard = () => {
	const winnerList = useTopWinnerList();
	const { t } = useTranslation();

	// winproduct等api中 先寫死swiper

	const swiperParams = {
		spaceBetween: 20,
		centeredSlides: true,
		loop: true,
		autoplay: {
			delay: 2000,
			disableOnInteraction: false
		},
		pagination: {
			el: ".swiper-pagination",
			clickable: true
		},
		modules: [Pagination, Autoplay]
	};



	return (
		<div className="home-leaderboard">
			<div className="home-title">Top Winner</div>
			<div className="win-products">
				<Swiper {...swiperParams} className="win-product">
					<SwiperSlide className="swiper-slide">
						<div className="item sports">
							<div className="swiper-slide">
								<img
									src={`${bannerImgUrl}/h5/img/home-page/leaderboard/sports-top1.png`}
									alt="sports-top1"
								/>
								<div className="title">{t("lbl_Sports")}</div>
								<div className="user-data">
									<span>Lo*****98</span>
									<span>$999,999,999.99</span>
								</div>
							</div>
						</div>
					</SwiperSlide>
					<SwiperSlide className="swiper-slide">
						<div className="item sports">
							<div className="swiper-slide">
								<img
									src={`${bannerImgUrl}/h5/img/home-page/leaderboard/casino-top1.png`}
									alt="sports-top1"
								/>
								<div className="title">{t("lbl_Sports")}</div>
								<div className="user-data">
									<span>Lo*****98</span>
									<span>$999,999,999.99</span>
								</div>
							</div>
						</div>
					</SwiperSlide>

					<SwiperSlide className="swiper-slide">
						<div className="item sports">
							<div className="swiper-slide">
								<img
									src={`${bannerImgUrl}/h5/img/home-page/leaderboard/slots-top1.png`}
									alt="sports-top1"
								/>
								<div className="title">{t("lbl_Sports")}</div>
								<div className="user-data">
									<span>Lo*****98</span>
									<span>$999,999,999.99</span>
								</div>
							</div>
						</div>
					</SwiperSlide>
				</Swiper>
				<div className="swiper-pagination" />
			</div>

			<div className="win-total">
				<div className="user-ranking">
					{winnerList.map((winner, index) => (
						<div className="user-list top" key={winner.custId}>
							<div className="left">
								<div className="order">
									{index < 3 ? (
										<img
											src={`${bannerImgUrl}/desktop/img/home-page/leaderboard/winner-${
												index + 1
											}.png`}
											alt={`img-top${index + 1}`}
										/>
									) : (
										<div className="order">{index + 1}</div>
									)}
								</div>
								<div className="user-id">{winner.userName}</div>
							</div>
							<div className="right">
								<i className="icon-cash" />
								<span>
									{number_format({
										number: winner.wTurnover
									})}
								</span>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default HomeLeaderBoard;
