import React, { useEffect, useContext } from "react";
import {
	i18nContext,
	userInfoContext,
	popBoxContext,
	rootContext
} from "Context";
import { useNavigate, Link } from "@reach/router";
import { GetMetaDataByPage } from "../components/seo/seo";
import Layout from "../components/common/layout";
import Slider from "../components/home/slider";
import Marquee from "../components/home/marquee";
import Menu from "../components/home/menu";
import Streaming from "../components/home/streaming";
import Promos from "../components/home/promos";
import HotGame from "../components/home/hotGame";
import Referral from "../components/home/referral";
import EventSwipper from "../components/home/eventSwipper";
import HeaderShortcut from "../components/home/headerShortcut";
import Bottom from "../components/home/bottom";
import { isEventPeriod } from "../components/common/common";
import path from "../path";
import Header from "../components/header/header";
import JoinLoginBar from "../components/home/joinLoginBar";
import Logo from "../components/common/logo";

const IndexPage = () => {
	const navigate = useNavigate();
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const { setRoot } = useContext(rootContext);
	const helmet = GetMetaDataByPage({
		path: path.home.root,
		langId: userInfo.langId
	});
	useEffect(() => {
		setRoot(true);
		return () => {
			setRoot(false);
		};
	}, [setRoot]);

	useEffect(() => {
		const ClosePopUp = () => {
			setPopBox({
				isOpen: false
			});
		};
		if (userInfo.isJoin) {
			setPopBox({
				isOpen: true,
				title: i18n.lbl_Notice,
				fullPage: true,
				content: (
					<div className="joinSuccess">
						<Logo langId={userInfo.langId} />
						<div className="step">
							<div className="stepLine">
								<div className="stepBar100" />
							</div>
							<div className="circle active">
								<div>
									<div className="icon icon-checkmark" />
								</div>
							</div>
							<div className="circle active">
								<div>
									<div className="icon icon-checkmark" />
								</div>
							</div>
							<div className="circle active">
								<div>
									<div className="icon icon-checkmark" />
								</div>
							</div>
						</div>
						<div className="Join">
							<div className="Terms">
								{i18n.lbl_AfterJoinHint}
							</div>
							<Link
								onClick={() => {
									setPopBox({
										isOpen: false
									});
									setUserInfo(prev => ({
										...prev,
										isJoin: false
									}));
								}}
								className="btn-group"
								to={`/${userInfo.langId}/${path.deposit.root}`}>
								<button>{i18n.lbl_DepositNow}</button>
							</Link>
						</div>
					</div>
				)
			});
		}
		if (
			isEventPeriod({
				endDate: "2021/05/18 23:59:59"
			}) &&
			userInfo.isLogin === false
		) {
			setPopBox({
				isOpen: true,
				content: (
					<img
						src={`https://image.n88media.com/SiteSkin/img/euro/EURO-RACE-MONTHLY-WINNERS-${userInfo.langId.toUpperCase()}.jpg`}
						alt="winner"
					/>
				),
				hasBtn: true
			});
		}
	}, [
		i18n,
		setPopBox,
		userInfo.currencyId,
		userInfo.userName,
		navigate,
		userInfo.langId,
		userInfo.isJoin,
		userInfo.isLogin
	]);

	return (
		<>
			<Layout header={<Header />}>
				{userInfo.isLogin ? <HeaderShortcut i18n={i18n} /> : null}
				<Slider />
				<Marquee />
				{userInfo.isLogin ? null : <JoinLoginBar />}
				<div id="content">
					<Menu
						i18n={i18n}
						userInfo={userInfo}
						setPopBox={setPopBox}
					/>
					<Promos i18n={i18n} userInfo={userInfo} />
					<HotGame i18n={i18n} userInfo={userInfo} />
					{userInfo.isLogin ? (
						<Referral
							i18n={i18n}
							userInfo={userInfo}
							setPopBox={setPopBox}
						/>
					) : null}
					<EventSwipper i18n={i18n} userInfo={userInfo} />
					<Streaming />
					<Bottom i18n={i18n} langId={userInfo.langId} />
				</div>
			</Layout>
			{helmet}
		</>
	);
};

export default IndexPage;
