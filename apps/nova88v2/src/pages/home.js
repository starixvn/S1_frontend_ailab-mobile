import React, { useEffect, useContext, useState } from "react";
import {
	i18nContext,
	userInfoContext,
	popBoxContext,
	rootContext
} from "Context";
import { SEO } from "../components/seo/seo";
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
import path from "../path";
import Header from "../components/header/header";
import JoinLoginBar from "../components/home/joinLoginBar";
import Jackpot from "../components/home/jackpot";
import AddToHomePop from "../components/home/addToHomePop";
import PromotionWrapper from "../components/promotion/common/wrapper";
// import NewYear, {
// 	defEventPeriod as NewYearEventPeriod
// } from "../components/common/popbox.newYear";

const IndexPage = () => {
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const { setRoot } = useContext(rootContext);
	const [appHint, setAppHint] = useState(false);
	// const { SEODatas } = useGetSEODatas({ getFromAPI: true });

	useEffect(() => {
		setRoot(true);
		return () => {
			setRoot(false);
		};
	}, [setRoot]);

	// useEffect(() => {
	// 	if (isEventPeriod(NewYearEventPeriod))
	// 		if (SEODatas) {
	// 			const langId = SEODatas.defaultLang ?? userInfo.langId;

	// 			if (
	// 				!langId.includes("hi") &&
	// 				!readCookie(`NewYear-${window.location.hostname}`)
	// 			) {
	// 				setPopBox({
	// 					isOpen: true,
	// 					fullPage: true,
	// 					className: "angpaopop",
	// 					content: (
	// 						<NewYear langId={langId} setPopBox={setPopBox} />
	// 					)
	// 				});
	// 			}
	// 		}
	// }, [SEODatas, userInfo.langId]);

	// useEffect(() => {
	// 	if (userInfo.isJoin) {
	// 		setPopBox({
	// 			isOpen: true,
	// 			title: i18n.lbl_Notice,
	// 			fullPage: true,
	// 			content: (
	// 				<div className="joinSuccess">
	// 					<Logo langId={userInfo.langId} />
	// 					<div className="step">
	// 						<div className="stepLine">
	// 							<div className="stepBar100" />
	// 						</div>
	// 						<div className="circle active">
	// 							<div>
	// 								<div className="icon icon-checkmark" />
	// 							</div>
	// 						</div>
	// 						<div className="circle active">
	// 							<div>
	// 								<div className="icon icon-checkmark" />
	// 							</div>
	// 						</div>
	// 						<div className="circle active">
	// 							<div>
	// 								<div className="icon icon-checkmark" />
	// 							</div>
	// 						</div>
	// 					</div>
	// 					<div className="Join">
	// 						<div className="Terms">
	// 							{i18n.lbl_AfterJoinHint}
	// 						</div>
	// 						<Link
	// 							onClick={() => {
	// 								setPopBox({
	// 									isOpen: false
	// 								});
	// 								setUserInfo(prev => ({
	// 									...prev,
	// 									isJoin: false
	// 								}));
	// 							}}
	// 							className="btn-group"
	// 							to={`/${userInfo.langId}/${path.deposit.root}`}>
	// 							<button>{i18n.lbl_DepositNow}</button>
	// 						</Link>
	// 					</div>
	// 				</div>
	// 			)
	// 		});
	// 	}
	// }, [
	// 	i18n,
	// 	setPopBox,
	// 	userInfo.currencyId,
	// 	userInfo.userName,
	// 	navigate,
	// 	userInfo.langId,
	// 	userInfo.isJoin,
	// 	userInfo.isLogin
	// ]);

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
			<SEO
				path={path.home.root}
				langId={userInfo.langId}
				isLogin={userInfo.isLogin}
				getFromAPI={userInfo.isLogin === false}
			/>
		</PromotionWrapper>
	);
};

export default IndexPage;
