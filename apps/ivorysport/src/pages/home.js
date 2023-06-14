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
import HeaderShortcut from "../components/home/headerShortcut";
import Header from "../components/header/header";
import JoinLoginBar from "../components/home/joinLoginBar";
import PromotionWrapper from "../components/promotion/common/wrapper";

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
				</div>
			</Layout>
		</PromotionWrapper>
	);
};

export default IndexPage;
