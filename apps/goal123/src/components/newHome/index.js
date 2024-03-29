import React, { useContext, useState, useEffect } from "react";
import { i18nContext, userInfoContext, rootContext } from "../common/context";
import HomeMarquee from "./components/HomeMarquee";
import HomeSportMatches from "./components/HomeSportMatches";
import HomeJoin from "./components/HomeJoin";
import HomeLeaderBoard from "./components/HomeLeaderBoard";
import HomeInfo from "./components/HomeInfo";
import HomeAppDownload from "./components/HomeAppDownload";
import HomeButtom from "./components/HomeButtom";
import Slider from "../home/slider";
import HomeMenu from "./components/HomeMenu";
import HomePopularSlotGames from "./components/HomePopularSlotGames";
import RecentlyViewedGameList from "../home/recentlyViewedGameList";
import usePopupHandler from "./hooks/usePopupHandler";
import Layout from "../common/layout";

const HomeContent = () => {
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	const { setRoot } = useContext(rootContext);

	usePopupHandler();

	useEffect(() => {
		setRoot(true);
		return () => {
			setRoot(false);
		};
	}, []);

	return (
		// Footer 跟 Header 有共用的部分，所以抽出來寫進 Layout, 並且與其他的頁面不共用，所以Layout內部由三元式判斷是否是 root = true
		// 其中使用readCookie / SetCookie 會去判斷使用者是否已經點擊 AppDownloadHint，進而影響整個<main>標籤的布局
		<>
			<Layout>
				<div className="home-wrapper">
					<Slider />
					<HomeMarquee />
					<div className="homecategorymenu">
						<HomeMenu i18n={i18n} userInfo={userInfo} />
						<HomeSportMatches />
						<HomeJoin />
						<HomePopularSlotGames />
						<HomeLeaderBoard />
						<HomeInfo />
						{userInfo.isLogin && <RecentlyViewedGameList />}
						<HomeAppDownload />
						<HomeButtom />
					</div>
				</div>
			</Layout>
		</>
	);
};

export default HomeContent;
