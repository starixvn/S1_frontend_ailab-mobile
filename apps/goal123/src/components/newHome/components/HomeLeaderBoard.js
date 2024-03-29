import React from "react";

import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import { Autoplay, Pagination } from "swiper";

import { useTranslation } from "react-i18next";
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

	const number_format = ({
		number,
		formatRequired = false,
		isConvertRequired = true,
		digits = 2
	}) => {
		let _number = number;
		if (!isNaN(number)) {
			if (isConvertRequired || formatRequired) {
				_number /= 1000;
			}

			if (digits > 0) {
				// 無條件捨去到第二位，避免四捨五入進位
				_number = (
					Math.floor(_number * Math.pow(10, digits)) /
					Math.pow(10, digits).toFixed(digits)
				).toFixed(digits);
			}
		}

		_number += "";
		const arr = _number.split(".");
		const re = /(\d{1,3})(?=(\d{3})+$)/g;

		return `${arr[0].replace(re, "$1,")}${
			digits > 0 && arr.length === 2 ? `.${arr[1]}` : ""
		}${formatRequired ? " ('000)" : ""}`;
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
