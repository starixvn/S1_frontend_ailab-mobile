import React, { useEffect, useContext } from "react";
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

const Home = () => {
	const { setRoot } = useContext(rootContext);
	const { userInfo } = useContext(userInfoContext);
	const { isLogin, accountName } = userInfo;

	const { openHomePopup } = useGetHomePopup();

	useEffect(() => {
		setRoot(true);
		return () => setRoot(false);
	}, []);

	useEffect(() => {
		if (isLogin !== null) openHomePopup();
	}, [isLogin, accountName]);

	return (
		<PromotionWrapper>
			<Layout header={<Header />}>
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
			</Layout>
		</PromotionWrapper>
	);
};

export default Home;
