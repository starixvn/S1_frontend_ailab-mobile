import React, { useEffect, useContext, useState } from "react";
import {
	i18nContext,
	userInfoContext,
	popBoxContext,
	rootContext
} from "Context";
import Layout from "../components/common/layout";
import Slider from "../components/home/slider";
import Marquee from "../components/home/marquee";
import Menu from "../components/home/menu";
import Promos from "../components/home/promos";
import HotGame from "../components/home/hotGame";
import Referral from "../components/home/referral";
import EventSwipper from "../components/home/eventSwipper";
import HeaderShortcut from "../components/home/headerShortcut";
import Bottom from "../components/home/bottom";
import { defCurrenyId } from "../components/common/common";
import Header from "../components/header/header";
import JoinLoginBar from "../components/home/joinLoginBar";
import Jackpot from "../components/home/jackpot";
import AddToHomePop from "../components/home/addToHomePop";
import PromotionWrapper from "../components/promotion/common/wrapper";
import RecentlyViewedGameList from "../components/home/recentlyViewedGameList";

const IndexPage = () => {
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const { setRoot } = useContext(rootContext);
	const [appHint, setAppHint] = useState(false);

	useEffect(() => {
		setRoot(true);
		return () => {
			setRoot(false);
		};
	}, [setRoot]);

	return (
		<PromotionWrapper>
			<Layout
				header={<Header appHint={appHint} setAppHint={setAppHint} />}>
				{userInfo.isLogin ? <HeaderShortcut i18n={i18n} /> : null}
				<Slider />
				<Marquee />
				{userInfo.isLogin ? null : (
					<JoinLoginBar langId={userInfo.langId} />
				)}
				<div id="content">
					<Menu
						i18n={i18n}
						userInfo={userInfo}
						setPopBox={setPopBox}
					/>
					<Promos i18n={i18n} userInfo={userInfo} />
					<EventSwipper i18n={i18n} userInfo={userInfo} />
					<HotGame i18n={i18n} userInfo={userInfo} />
					{userInfo.isLogin && <RecentlyViewedGameList />}
					{userInfo.isLogin ? (
						<Referral
							i18n={i18n}
							userInfo={userInfo}
							setPopBox={setPopBox}
						/>
					) : null}
					{userInfo.currencyId !== defCurrenyId.BDT && (
						<Jackpot i18n={i18n} userInfo={userInfo} />
					)}
					{/* <Streaming /> */}
					{/* <LiveCasino /> */}
					<Bottom
						i18n={i18n}
						langId={userInfo.langId}
						currencyId={userInfo.currencyId}
					/>
					<AddToHomePop i18n={i18n} userInfo={userInfo} />
				</div>
			</Layout>
		</PromotionWrapper>
	);
};

export default IndexPage;
