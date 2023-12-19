import React, { useEffect, useContext, useState } from "react";
import {
	i18nContext,
	userInfoContext,
	popBoxContext,
	rootContext
} from "Context";
import { useTranslation } from "react-i18next";
import age21Image from "../styles/img/homepage/21age.png";
import pagcorImage from "../styles/img/homepage/pagcor.png";
import Layout from "../components/common/layout";
import Slider from "../components/home/slider";
import Marquee from "../components/home/marquee";
import Menu from "../components/home/menu";
import HeaderShortcut from "../components/home/headerShortcut";
import Header from "../components/header/header";
import JoinLoginBar from "../components/home/joinLoginBar";
import PromotionWrapper from "../components/promotion/common/wrapper";
import HomeEntry from "../components/home/homeEntry";
import { readCookie, setCookie } from "../components/common/common";
import { cloudBannerImgURL, siteInfo } from "../config";

const IndexPage = () => {
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	const { t } = useTranslation();
	const { setPopBox } = useContext(popBoxContext);

	const { setRoot } = useContext(rootContext);
	const [appHint, setAppHint] = useState(false);

	useEffect(() => {
		setRoot(true);
		return () => {
			setRoot(false);
		};
	}, [setRoot]);

	useEffect(() => {
		// * 如果未登入狀態及尚未勾選已年滿21歲的cookie即彈出此彈窗讓使用者驗證
		if (userInfo.userName === "访客") {
			if (!readCookie(siteInfo().ageVerificationCookie)) {
				const onOK = () => {
					setCookie(siteInfo().ageVerificationCookie, 1, 1);
					setPopBox({ isOpen: false });
				};
				setPopBox({
					isOpen: true,
					title: t("Label_General_AgeVerification"),
					hideCloseBtn: true,
					content: (
						<>
							<div>{t("Label_General_Verify21Years")}</div>
							<div className="btn-group">
								<button className="white" onClick={onOK}>
									{t("Label_General_Already21Years")}
								</button>

								<a
									className="gray"
									href={`${cloudBannerImgURL}/Static/en/TermsConditions.html`}
									rel="noreferrer">
									{t("Label_General_Exit")}
								</a>
							</div>
							<div
								style={{
									display: "flex",
									justifyContent: "center"
								}}>
								<img
									style={{ height: "64px" }}
									src={pagcorImage}
									alt="img-pagcor"
								/>
								<img
									style={{ height: "64px" }}
									src={age21Image}
									alt="img-pagcor"
								/>
							</div>
						</>
					)
				});
			}
		}
	}, [userInfo.isLogin, userInfo.userName]);
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

					<HomeEntry />
				</div>
			</Layout>
		</PromotionWrapper>
	);
};

export default IndexPage;
