import React from "react";
// import { isDateRange, useLeaderBoard } from "@ailab-mobile/common";
import { bannerImgUrl } from "../../config";
// import { eventTime } from "../common/eventTime";

const LeaderBoardBanner = () => {
	const { langId } = useLeaderBoard();

	// /** 取得 banner 路徑，根據活動期間判斷是否更換活動期間的 banner */
	// const getBannerUrl = () => {
	// 	/** 巴黎奧運期間 banner 巴黎奧運過後可以刪除 */
	// 	const parisOlympicsBannerUrl = `${bannerImgUrl}/h5/img/leaderboard/olympic-banner-${langId}.jpg`;

	// 	/** 常態期間 banner 路徑 */
	// 	const generalBannerUrl = `${bannerImgUrl}/h5/img/leaderboard/banner-${langId}.jpg`;

	// 	/**  banner 路徑，根據活動期間判斷是否更換活動期間的 banner */
	// 	const bannerUrl = isDateRange(eventTime.olympic)
	// 		? parisOlympicsBannerUrl
	// 		: generalBannerUrl;

	// 	return bannerUrl;
	// };
	return (
		<div className="leaderboard-banner">
			{/* 因為與奧運差 2 天，所以先放個版面即可，到時會換掉 */}
			<img
				src={`${bannerImgUrl}/h5/img/leaderboard/olympic-banner-${langId}.jpg`}
				alt=""
			/>
		</div>
	);
};

export default LeaderBoardBanner;
