import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import Swiper from "react-id-swiper";
import classNames from "classnames";
import { userInfoContext } from "../common/context";
import useRecentlyViewed from "../hook/useRecentlyViewed";

const RecentlyViewed = () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);

	const {
		recentlyViewedList = [],
		onClickRecentlyViewedProductItem
	} = useRecentlyViewed();

	if (recentlyViewedList.length === 0) return null;

	const swiperParams = {
		spaceBetween: 10,
		slidesPerView: 1.9,
		initialSlide: 0
		// initialSlide: 1.3
	};

	return (
		<>
			<div className="home-title">
				<i className="icon-star-outline" />
				{t("lbl_Recently_Viewed")}
			</div>
			<div className="home-recently mb-2">
				<Swiper {...swiperParams}>
					{recentlyViewedList.map(recentlyViewedGameItem => {
						const {
							gameLogo,
							gameName,
							tpId,
							tpGameType,
							gameId,
							isMaintain
						} = recentlyViewedGameItem || {};
						return (
							<div key={`${tpId}_${tpGameType}_${gameId}`}>
								<a
									className={classNames(
										"home-recently-item",
										{ maintain: isMaintain }
									)}
									onClick={() =>
										onClickRecentlyViewedProductItem(
											recentlyViewedGameItem
										)
									}>
									<div
										className="home-recently-img"
										style={{
											backgroundImage: `url("${
												gameLogo[userInfo.langId] ??
												gameLogo.en
											}")`
										}}
									/>
									<div className="home-recently-info">
										<span>
											{gameName[userInfo.langId] ??
												gameName.en}
										</span>
									</div>
									{isMaintain && (
										<div className="tag-maintain">
											{t("lbl_underMaintenance")}
										</div>
									)}
								</a>
							</div>
						);
					})}
				</Swiper>
			</div>
		</>
	);
};

export default RecentlyViewed;
