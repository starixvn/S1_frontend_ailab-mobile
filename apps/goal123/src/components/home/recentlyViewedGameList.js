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
		spaceBetween: 22,
		slidesPerView: 1.3
	};

	return (
		<div className="recentlyList">
			<div className="title">
				<i className="icon icon-history " />
				{t("lbl_Recently_Viewed")}
			</div>
			<Swiper
				className="recently"
				modules={[Navigation]}
				navigation
				{...params}>
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
								key={`${tpId}_${tpGameType}_${gameId}`}>
								<div
									className="swiper-slide"
									onClick={() =>
										onClickRecentlyViewedProductItem(
											recentlyViewedGameItem
										)
									}>
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
			</Swiper>
		</div>
	);
};

export default RecentlyViewedGameList;
