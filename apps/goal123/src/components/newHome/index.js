import React, { useContext, useState, useEffect } from "react";
import { i18nContext, userInfoContext, rootContext } from "../common/context";
import HomeHeader from "./components/HomeHeader";
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
import HomeFooter from "./components/HomeFooter";
import RecentlyViewedGameList from "../home/recentlyViewedGameList";
import usePopupHandler from "./hooks/usePopupHandler";

const HomeContent = () => {
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { setRoot } = useContext(rootContext);
	const [redirectPath, setRedirectPath] = useState(null);
	const [showAd, setShowAd] = useState(true);

	usePopupHandler();

	const onclickCancel = () => {
		setShowAd(!showAd);
	};

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	useEffect(() => {
		if (redirectPath !== null) {
			setRedirectPath(null);
		}
	}, [redirectPath]);

	useEffect(() => {
		setRoot(true);
		return () => {
			setRoot(false);
		};
	}, []);

	return (
		<>
			<header id="header" className="header-index">
				<HomeHeader showAd={showAd} onclickCancel={onclickCancel} />
			</header>
			<main className={showAd ? "home active" : "home"}>
				<div className="home-wrapper">
					{/* 此部分先沿用舊的 */}
					<Slider />
					<HomeMarquee />
					<div className="homecategorymenu">
						<HomeMenu i18n={i18n} userInfo={userInfo} />
						{/* <Menu i18n={i18n} userInfo={userInfo} /> */}
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
			</main>
			<HomeFooter toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
		</>
	);
};

export default HomeContent;
