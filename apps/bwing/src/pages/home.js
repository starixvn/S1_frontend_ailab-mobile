import React, { useState, useEffect, useContext } from "react";
import { Redirect, Link, useLocation, useNavigate } from "@reach/router";
import { useLazyGetPopUpPromotionQuery } from "@ailab-mobile/service";
import Slider from "../components/home/slider";
import Marquee from "../components/home/marquee";
import {
	i18nContext,
	userInfoContext,
	popBoxContext,
	rootContext,
	navContext,
	defNavPanel
} from "../components/common/context";
import {
	readCookie,
	setCookie,
	isEventPeriod
} from "../components/common/common";
import path from "../path";
import { GetPageInfo } from "../components/common/layout";
import { api_GetWalletInfo } from "../service/api/account";
import Streaming from "../components/home/streaming";
import GamePanel from "../components/home/gamePanel";
import LinksPanel from "../components/home/links";
import EventSwipper from "../components/home/eventSwipper";
import HotGameSwipper from "../components/home/hotGameSwipper";
import defNav from "../components/casino/defNav";
import AddToHomePop from "../components/home/addToHomePop";
import Top10Winner from "../components/home/top10winner";
import { bannerImgUrl } from "../config";
import GameList from "../components/home/menu";
import NewYear, {
	defEventPeriod as NewYearEventPeriod
} from "../components/common/popbox.newYear";
import useInterval from "../components/hook/useInterval";
import RecentlyViewedGameList from "../components/home/recentlyViewedGameList";
import { defDeviceType } from "../service/api/base";

const IndexPage = () => {
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	const { setNav } = useContext(navContext);
	const { setPopBox } = useContext(popBoxContext);
	const [redirectPath, setRedirectPath] = useState(null);
	const { setRoot } = useContext(rootContext);
	const navigate = useNavigate();

	const { root } = useContext(rootContext);

	const location = useLocation();
	const pageInfo = GetPageInfo(location.pathname);

	// * 如果 popUpBonusCode 有值需彈出彈窗提醒有該優惠活動可以使用
	const [getPopUpPromotion] = useLazyGetPopUpPromotionQuery();

	if (root) {
		pageInfo.className = userInfo.isLogin ? "mainLogin" : "mainLogout";
	}

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
	}, [setRoot]);

	useEffect(() => {
		const displayDepositPopup = () => {
			const cookieName = `balanceHint${userInfo.userName}`;
			if (
				userInfo.currencyId &&
				userInfo.userName &&
				readCookie(cookieName) !== "1"
			) {
				setCookie(cookieName, "1", 1);
				api_GetWalletInfo().then(
					res => {
						if (res.data.errorCode === 0) {
							const { data } = res.data;
							const mainWallet = {
								id: 0,
								displayKey: "lbl_MainWallet",
								balance: data?.balance
							};
							const tpWalletsArr = data?.tpWallets.map(i => ({
								id: i.tpId,
								displayKey: i.displayKey,
								balance: i.balance
							}));

							const hasBalance =
								mainWallet.balance ||
								tpWalletsArr?.filter(t => t.balance > 0)
									.length >= 1;

							if (!hasBalance) {
								const RedirectToDeposit = () => {
									setRedirectPath(`/${path.deposit.root}`);
									setPopBox({
										isOpen: false
									});
								};

								setPopBox({
									isOpen: true,
									title: i18n.lbl_Notice,
									content: (
										<>
											<p>
												{`${i18n.msg_BalanceHint} : `}
												<span className="important">
													{`${
														i18n[
															`Currency_${userInfo.currencyId}`
														]
													} 0`}
												</span>
											</p>
											<p>{i18n.msg_DepositHint}</p>
										</>
									),
									hasBtn: true,
									btnBar: (
										<div className="btn-group">
											<button
												className="cancel"
												onClick={openNextPopUp}>
												{i18n.lbl_Later}
											</button>
											<button
												onClick={RedirectToDeposit}
												className="submit">
												{i18n.lbl_DepositNow}
											</button>
										</div>
									),
									handlePopBox: openNextPopUp
								});
							}
						} else {
							setPopBox({
								isOpen: true,
								content: `[${res.data.errorCode}] ${res.data.message}`,
								handlePopBox: openNextPopUp
							});
						}
					},
					() => {
						setPopBox({
							isOpen: true,
							content: i18n.msg_ApiServerError,
							handlePopBox: openNextPopUp
						});
					}
				);
			} else {
				openNextPopUp();
			}
		};

		const displayAnnouncePopup = () => {
			const cookieOfficialAnnounce = "OfficialAnnounce_cookie";
			if (
				userInfo.isLogin === false &&
				!isEventPeriod(NewYearEventPeriod) &&
				!readCookie(cookieOfficialAnnounce) &&
				!window?.ReactNativeWebView
			) {
				const toDownloadPage = () => {
					navigate(`/${path.appDownload.root}`);
					setPopBox({ isOpen: false });
				};
				setCookie(cookieOfficialAnnounce, true, 1);
				setPopBox({
					isOpen: true,
					content: (
						<img
							src={`${bannerImgUrl}/h5/img/nonlogin/300x300_bwing_${userInfo.langId}.jpg`}
							alt="OfficialAnnounce"
							onClick={toDownloadPage}
						/>
					),
					hasBtn: true,
					btnBar: (
						<div className="btn-group">
							<button className="blue" onClick={openNextPopUp}>
								{i18n.lbl_Close}
							</button>
						</div>
					),
					handlePopBox: openNextPopUp
				});
			} else {
				openNextPopUp();
			}
		};

		const displayNewYearPopup = () => {
			if (
				isEventPeriod(NewYearEventPeriod) &&
				!readCookie(`NewYear-${window.location.hostname}`)
			) {
				setPopBox({
					isOpen: true,
					className: "active",
					displayStyle: "flex",
					custContent: (
						<NewYear
							onClickClose={openNextPopUp}
							langId={userInfo.langId}
						/>
					)
				});
			} else {
				openNextPopUp();
			}
		};

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
						displayStyle: "", //* 默認為block, 給空字串防止跑版
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
										navigate(
											`/${path.promotion.root}?bonusCode=${bonusCode}`
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

		const popUpStack = [
			displayDepositPopup,
			displayNewYearPopup,
			displayAnnouncePopup,
			displayPromotionPopup
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
	}, [
		i18n,
		setPopBox,
		userInfo.currencyId,
		userInfo.accountName,
		userInfo.isLogin,
		userInfo.langId
	]);

	return redirectPath !== null ? (
		<Redirect to={redirectPath} noThrow />
	) : (
		<>
			<Slider />
			<Marquee />
			{userInfo.isLogin === false && (
				<div className="loginbut">
					<button
						className="login"
						onClick={() => setNav(defNavPanel.login)}>
						{i18n.lbl_Login.toUpperCase()}
					</button>
					<button onClick={() => setNav(defNavPanel.join)}>
						{i18n.lbl_JoinNow.toUpperCase()}
					</button>
				</div>
			)}
			<GameList i18n={i18n} userInfo={userInfo} />
			<EventSwipper />
			<GamePanel i18n={i18n} userInfo={userInfo} />
			<HotGameSwipper i18n={i18n} userInfo={userInfo} />
			{userInfo.isLogin && <RecentlyViewedGameList />}
			<PlaytechJactpot />
			<Top10Winner i18n={i18n} setPopBox={setPopBox} />
			<Streaming />
			{/* <MidBanner langId={userInfo.langId} /> */}
			<LinksPanel i18n={i18n} langId={userInfo.langId} />
			<AddToHomePop i18n={i18n} userInfo={userInfo} />
		</>
	);
};

const PlaytechJactpot = () => {
	const { i18n } = useContext(i18nContext);
	const [jPotSuccess, setJPotSuccess] = useState(false);

	useInterval(() => {
		if (!jPotSuccess) {
			const ticker2 =
				typeof Ticker === "undefined"
					? null
					: new Ticker({
							info: 2,
							casino: "hotspin88am",
							currency: "vnd"
					  });

			if (ticker2) {
				setJPotSuccess(true);
			}

			ticker2?.attachToTextBox("tick");
			ticker2?.SetCurrencySign("");
			ticker2?.tick();
		}
	}, 1000);

	return (
		<Link to={`/${path.casino.root}`} state={{ nav: defNav.PROMO.key }}>
			<div className={`bannerS${jPotSuccess ? "" : " active"}`}>
				<img src={`${bannerImgUrl}/h5/img/jackpot.png`} alt="" />
				<p>VND</p>
				{!jPotSuccess && (
					<div className="under">{i18n.lbl_underMaintenance}</div>
				)}
				<p id="tick" />
			</div>
		</Link>
	);
};

export default IndexPage;
