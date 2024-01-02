import React, { useState, useEffect, useContext } from "react";
import { rootContext, userInfoContext } from "Context";
import Layout from "../components/common/layout";
import useGetHomePopup from "../components/hook/useGetHomePopup";
import PromotionWrapper from "../components/promotion/common/wrapper";
import {
	Header,
	Slider,
	Marquee,
	Menu,
	HotMatch,
	Promotion,
	HotGame,
	Jackpot,
	AppDownload,
	Partner,
	Bottom,
	AddToHomePop
} from "../components/home";
import LiveStreamingPop from "./liveStreamingPop";

const Home = () => {
	const { setRoot } = useContext(rootContext);
	const { userInfo } = useContext(userInfoContext);
	const { isLogin, accountName } = userInfo;

	const { openHomePopup } = useGetHomePopup();

	const [showAppHint, setShowAppHint] = useState(true);

	useEffect(() => {
		setRoot(true);
		return () => setRoot(false);
	}, []);

	useEffect(() => {
		if (isLogin !== null) openHomePopup();
	}, [isLogin, accountName]);

	const header = (
		<Header showAppHint={showAppHint} setShowAppHint={setShowAppHint} />
	);

	return (
		<PromotionWrapper>
			<Layout header={header} showAppHint={showAppHint}>
				<Marquee />
				<Slider />
				<Menu />
				<HotMatch />
				<Promotion />
				<HotGame />
				<Jackpot />
				<AppDownload />
				<Partner />
				<Bottom />
				<AddToHomePop />
				<LiveStreamingPop />
			</Layout>
		</PromotionWrapper>
	);
};

export default Home;
