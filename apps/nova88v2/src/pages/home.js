import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "@reach/router";
import {
	i18nContext,
	userInfoContext,
	popBoxContext,
	rootContext
} from "Context";
import { useLazyGetPopUpPromotionQuery } from "@ailab-mobile/service";
import { defDeviceType } from "@ailab-mobile/api";
import api from "../service/api";
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
import {
	defCurrenyId,
	readCookie,
	setCookie
} from "../components/common/common";
import Header from "../components/header/header";
import JoinLoginBar from "../components/home/joinLoginBar";
import Jackpot from "../components/home/jackpot";
import AddToHomePop from "../components/home/addToHomePop";
import PromotionWrapper from "../components/promotion/common/wrapper";
import RecentlyViewedGameList from "../components/home/recentlyViewedGameList";
import path from "../path";

const IndexPage = () => {
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const { setRoot } = useContext(rootContext);
	const [appHint, setAppHint] = useState(false);
	const navigate = useNavigate();

	// * 如果 popUpBonusCode 有值需彈出彈窗提醒有該優惠活動可以使用
	const [getPopUpPromotion] = useLazyGetPopUpPromotionQuery();

	useEffect(() => {
		setRoot(true);
		return () => {
			setRoot(false);
		};
	}, [setRoot]);

	useEffect(() => {
		const displayPromotionPopup = () => {
			const cookieName = `popUpPromotion${userInfo.userName}`;

			// * 如果未登入 or 當日觸發過 則直接進入下一個彈窗
			if (
				!userInfo.isLogin ||
				!userInfo.accountName ||
				readCookie(cookieName) === "1"
			) {
				openNextPopUp();
				return;
			}

			// * 如果 bonusCode 不為 null ，打開並記錄 cookie，效期為一日
			getPopUpPromotion({
				deviceType: defDeviceType.Mobile,
				langId: userInfo.langId
			}).then(({ data: { data: { bonusCode } = {} } = {} }) => {
				if (bonusCode) {
					setPopBox({
						isOpen: true,
						className: "promosback active",
						custContent: (
							<div className="pop promosbackpop">
								<img
									src={`${
										process.env.REACT_APP_BANNER_URL
									}/desktop/img/promosBackPopup/promosPopup-${
										userInfo?.langId || "en"
									}.png`}
									alt="img-promosPopup"
								/>
								<button
									className="popgo"
									onClick={() => {
										// nova88 h5 版本的導轉需加上 langId 才能正常運作
										navigate(
											`/${userInfo.langId}/${path.promotion.root}?bonusCode=${bonusCode}`
										);
										setPopBox({ isOpen: false });
									}}>
									{i18n.lbl_ClaimNow}
								</button>
								<img
									src={`${process.env.REACT_APP_BANNER_URL}/desktop/img/promosBackPopup/delet.png`}
									alt="img-delet"
									className="closepop"
									onClick={() => {
										setPopBox({ isOpen: false });
										openNextPopUp();
									}}
								/>
							</div>
						)
					});
					setCookie(cookieName, "1", 1);
				} else {
					openNextPopUp();
				}
			});
		};

		const displaySponsorshipPopup = () => {
			if (new Date() > new Date(2023, 12, 31)) {
				openNextPopUp();
				return;
			}
			const cookieName = `Sponsorship${userInfo.userName}`;
			if (
				!userInfo.isLogin &&
				// * 多判斷是否有 accountName 防止 setCookie 紀錄 Guest 狀態時的資料
				!userInfo.accountName &&
				readCookie(cookieName) !== "1"
			) {
				setCookie(cookieName, "1", 1);

				setPopBox({
					isOpen: true,
					className: "sponsorpop",
					custContent: (
						<div className="pop sponsor">
							<img
								src={`${
									process.env.REACT_APP_BANNER_URL
								}/h5/img/sponsorpop-${
									userInfo?.langId || "en"
								}.png`}
								alt="img-sponsorpop"
							/>
							<img
								onClick={() => {
									setPopBox({ isOpen: false });
									openNextPopUp();
								}}
								src={`${process.env.REACT_APP_BANNER_URL}/h5/img/promosBackPopup/delet.png`}
								alt=""
								className="closepop"
							/>
						</div>
					)
				});
			}
		};

		const expiredDisclaimerForVndDate = new Date(2024, 3, 13);

		const disclaimerForVnd = async () => {
			const nowDate = new Date();
			if (nowDate > expiredDisclaimerForVndDate) {
				openNextPopUp();
				return;
			}

			const cookieName = "disclaimerForVnd";
			const {
				data: { data: ipCountryData = {} } = {}
			} = await api.site.GetIpCountry();
			// * 如果未登入 or 當日觸發過 則直接進入下一個彈窗
			if (
				// * 等同於lodash isEmpty
				Object.keys(ipCountryData).length === 0 ||
				ipCountryData.code !== "VN" ||
				readCookie(cookieName) === "1"
			) {
				openNextPopUp();
				return;
			}

			const showLang =
				ipCountryData.code === "VN" && userInfo.langId === "vn"
					? "vn"
					: "en";

			setCookie(cookieName, "1", 1);
			setPopBox({
				isOpen: true,
				className: "vninfopop active",
				custContent: (
					<div className="pop vninfopop-inner">
						<img
							src={`https://banner.0814media.net/h5/img/disclaimer-vnd-currency-popup-${showLang}.png`}
							alt=""
						/>
						<button
							onClick={() => setPopBox({ isOpen: false })}
							className="popgoto">
							{i18n.lbl_JoinNow}
						</button>
						<img
							onClick={() => setPopBox({ isOpen: false })}
							src="https://banner.0814media.net/desktop/img/promosBackPopup/delet.png"
							alt=""
							className="closepop"
						/>
					</div>
				)
			});
		};

		const popUpStack = [
			displaySponsorshipPopup,
			displayPromotionPopup,
			disclaimerForVnd
		];
		const openNextPopUp = () => {
			if (popUpStack.length) {
				popUpStack.pop()();
			} else {
				setPopBox({ isOpen: false });
			}
		};

		if (userInfo.isLogin !== null) {
			openNextPopUp();
		}
	}, [userInfo.isLogin, userInfo.accountName]);
	return (
		<PromotionWrapper>
			<Layout
				header={<Header appHint={appHint} setAppHint={setAppHint} />}>
				{userInfo.isLogin ? (
					<HeaderShortcut
						i18n={i18n}
						currencyId={userInfo.currencyId}
					/>
				) : null}
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
