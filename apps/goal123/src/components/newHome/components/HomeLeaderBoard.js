import React from "react";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import { Autoplay, Pagination } from "swiper";
import { useTranslation } from "react-i18next";
import { number_format } from "../utils/homeFormatter";
import { bannerImgUrl } from "../../../config";
import useTopWinnerList from "../hooks/useWinnerList";

import "swiper/swiper.min.css";

const HomeLeaderBoard = () => {
	const {
		winnerList,
		sportTopWinner,
		slotTopWinner,
		liveCasinoTopWinner
	} = useTopWinnerList();
	const { t } = useTranslation();

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

	const renderLeaderboardSlide = (
		itemClass,
		bannerUrl,
		alt,
		topWinner,
		title
	) => (
		<SwiperSlide className="swiper-slide">
			<div className={itemClass}>
				<div className="swiper-slide">
					<img src={bannerUrl} alt={alt} />
					<div className="title">{t(title)}</div>
					<div className="user-data">
						<span>
							{topWinner.length > 0 && topWinner[0].userName}
						</span>
						<span>
							{topWinner.length > 0 &&
								`$${number_format({
									number: topWinner[0].wTurnover
								})}`}
						</span>
					</div>
				</div>
			</div>
		</SwiperSlide>
	);

	return (
		<div className="home-leaderboard">
			<div className="home-title">Top Winner</div>
			<div className="win-products">
				<Swiper {...swiperParams}>
					{renderLeaderboardSlide(
						"item sports",
						`${bannerImgUrl}/h5/img/home-page/leaderboard/sports-top1.png`,
						"sports-top1",
						sportTopWinner,
						"lbl_Sports"
					)}
					{renderLeaderboardSlide(
						"item casino",
						`${bannerImgUrl}/h5/img/home-page/leaderboard/casino-top1.png`,
						"casino-top1",
						liveCasinoTopWinner,
						"lbl_Casino"
					)}
					{renderLeaderboardSlide(
						"item slots",
						`${bannerImgUrl}/h5/img/home-page/leaderboard/slots-top1.png`,
						"slots-top1",
						slotTopWinner,
						"lbl_Slots"
					)}
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
