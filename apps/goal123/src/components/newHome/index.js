import React, { useContext, useEffect } from "react";
import { isInApp, LeaderboardProvider } from "@ailab-mobile/common";
import { userInfoContext, rootContext } from "../common/context";
import HomeMarquee from "./components/HomeMarquee";
import HomeSportMatches from "./components/HomeSportMatches";
import HomeJoin from "./components/HomeJoin";
import { siteId } from "../../config";
import HomeLeaderBoard from "./components/HomeLeaderBoard";
import HomeInfo from "./components/HomeInfo";
import HomeAppDownload from "./components/HomeAppDownload";
import HomeButtom from "./components/HomeButtom";
import HomeMenu from "./components/HomeMenu";
import HomePopularSlotGames from "./components/HomePopularSlotGames";
import RecentlyViewedGameList from "../home/recentlyViewedGameList";
import usePopupHandler from "./hooks/usePopupHandler";
import Layout from "../common/layout";
import HomeBanner from "./components/HomeBanner";

const HomeContent = () => {
	const { userInfo } = useContext(userInfoContext);
	const { setRoot } = useContext(rootContext);

	// 整合彈窗相關的邏輯
	usePopupHandler();

	// 判斷是否是首頁
	useEffect(() => {
		setRoot(true);
		return () => {
			setRoot(false);
		};
	}, []);

	return (
		// Footer 跟 Header 有共用的部分，所以抽出來寫進 Layout, 並且與其他的頁面不共用，所以Layout內部由三元式判斷是否是 root = true
		// 其中使用readCookie / SetCookie 會去判斷使用者是否已經點擊 AppDownloadHint，進而影響整個<main>標籤的布局
		// Footer 的menu圖案點下去會展開menu，相關元件可到src/components/newMenu/index.js查看
		// 首頁部分Banner目前獨立寫出來 舊的程式碼可參考Slider 或是 swiperBanner.js
		<Layout>
			<div className="home-wrapper">
				<HomeBanner />
				<HomeMarquee />
				<div className="homecategorymenu">
					<HomeMenu userInfo={userInfo} />
					<HomeSportMatches />
					<HomeJoin />
					<HomePopularSlotGames />

					{/* 首頁的 HomeLeaderBoard 比 leaderboard 頁面更早開發（但功能相同），由於 PM 希望內頁與首頁的資料顯示一致，
                        為了避免相同邏輯分散在兩個頁面，所以將後期開發的 LeaderboardProvider 包裹 HomeLeaderBoard，共享相同的資料與 API。 */}
					<LeaderboardProvider siteId={siteId} userInfo={userInfo}>
						<HomeLeaderBoard />
					</LeaderboardProvider>

					<HomeInfo />
					{userInfo.isLogin && <RecentlyViewedGameList />}
					{!isInApp() && <HomeAppDownload />}
					<HomeButtom />
				</div>
			</div>
		</Layout>
	);
};

export default HomeContent;
