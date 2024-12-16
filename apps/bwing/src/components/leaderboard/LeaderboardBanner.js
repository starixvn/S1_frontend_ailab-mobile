import React from "react";
import { isDateRange, useLeaderBoard } from "@ailab-mobile/common";
import { bannerImgUrl } from "../../config";
import { eventTime } from "../common/eventTime";

/** Banner 组件 */
const LeaderboardBanner = () => {
	const { langId } = useLeaderBoard();

	/** 取得 banner 路徑，根據活動期間判斷是否更換活動期間的 banner */
	const getBannerUrl = () => {
		/** 中秋期間 banner 路徑 */
		// const midAutumnBannerUrl = `${bannerImgUrl}/h5/img/leaderboard/mid-autumn-banner-${langId}.jpg`;

		/** 聖誕節期間 banner 路徑 */
		const christmasBannerUrl = `${bannerImgUrl}/h5/img/leaderboard/christmas-banner-${langId}.jpg`;

		/** 常態期間 banner 路徑 */
		const generalBannerUrl = `${bannerImgUrl}/h5/img/leaderboard/banner-${langId}.jpg`;

		/**  banner 路徑，根據活動期間判斷是否更換活動期間的 banner */
		const bannerUrl = isDateRange(eventTime.leaderboardChristmas)
			? christmasBannerUrl
			: generalBannerUrl;

		return bannerUrl;
	};
	return (
		<div className="leaderboard-banner">
			<img src={getBannerUrl()} alt="leaderboard-banner" />
		</div>
	);
};

/** Banner 组件 */
export default LeaderboardBanner;
