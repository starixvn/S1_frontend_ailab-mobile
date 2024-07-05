import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import { Navigation } from "swiper";
import { userInfoContext } from "../common/context";
import useRecentlyViewed from "../hook/useRecentlyViewed";

const RecentlyViewedGameList = () => {
	const { userInfo } = useContext(userInfoContext);
	const { t } = useTranslation();

	const {
		recentlyViewedList = [],
		onClickRecentlyViewedProductItem
	} = useRecentlyViewed();

	if (recentlyViewedList.length === 0) return null;

	const params = {
		slidesPerView: 1.3,
		spaceBetween: 22,
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev"
		}
	};

	return (
		<div className="home-recently">
			<div className="home-title">{t("Label_Recently")}</div>
			<Swiper className="recently" modules={[Navigation]} {...params}>
				<div className="swiper-wrapper">
					{recentlyViewedList.map(recentlyViewedGameItem => {
						const {
							tpId,
							tpGameType,
							gameId,
							gameLogo,
							tpLogo,
							gameName,
							isMaintain
						} = recentlyViewedGameItem || {};
						return (
							<SwiperSlide
								key={`recently-game-${tpId}-${tpGameType}-${gameId}`}>
								<div
									className="swiper-slide"
									onClick={() =>
										onClickRecentlyViewedProductItem(
											recentlyViewedGameItem
										)
									}
									style={{
										pointerEvents: isMaintain
											? "none"
											: "auto",
										cursor: "default"
									}}>
									<div
										className={classNames("recently-game", {
											active: isMaintain
										})}>
										<div>
											<img
												className="recently-image"
												src={
													gameLogo[userInfo.langId] ??
													gameLogo.en
												}
												alt=""
											/>
											<div>
												<img
													className="recently-brand"
													src={tpLogo}
													alt=""
												/>
												<div className="recently-title">
													{gameName[
														userInfo.langId
													] ?? gameName.en}
												</div>
											</div>
										</div>
										{isMaintain && (
											<div className="under">
												{t("lbl_underMaintenance")}
											</div>
										)}
									</div>
								</div>
							</SwiperSlide>
						);
					})}
				</div>
				<div className="swiper-button-prev" />
				<div className="swiper-button-next" />
			</Swiper>
		</div>
	);
};

export default RecentlyViewedGameList;
