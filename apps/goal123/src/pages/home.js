import React, { useState, useEffect, useContext } from "react";
import { Redirect, Link, useNavigate } from "@reach/router";
import { useLazyGetPopUpPromotionQuery } from "@ailab-mobile/service";
import Slider from "../components/home/slider";
import Marquee from "../components/home/marquee";
import Menu from "../components/home/menu";
import {
	i18nContext,
	userInfoContext,
	popBoxContext,
	rootContext
} from "../components/common/context";
import {
	readCookie,
	setCookie,
	isEventPeriod
} from "../components/common/common";
import path from "../path";
import { api_GetWalletInfo } from "../service/api/account";
import HeaderShortcut from "../components/home/headerShortcut";
import EventSwipper from "../components/home/eventSwipper";
import MiddlePanel from "../components/home/middlePanel";
import Bottom from "../components/home/bottom";
import defNav from "../components/casino/defNav";
import AddToHomePop from "../components/home/addToHomePop";
import Top10Winner from "../components/home/top10winner";
import { bannerImgUrl } from "../config";
import Layout from "../components/common/layout";
import Header from "../components/common/header";
import NewYear, {
	defEventPeriod as NewYearEventPeriod
} from "../components/common/popbox.newYear";
import useInterval from "../components/hook/useInterval";
import RecentlyViewedGameList from "../components/home/recentlyViewedGameList";
import { defDeviceType } from "../service/api/base";

const IndexPage = () => {
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const { setRoot } = useContext(rootContext);
	const [redirectPath, setRedirectPath] = useState(null);
	const [appHint, setAppHint] = useState(false);
	const navigate = useNavigate();

	// * 如果 popUpBonusCode 有值需彈出彈窗提醒有該優惠活動可以使用
	const [getPopUpPromotion] = useLazyGetPopUpPromotionQuery();

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
												className="blue"
												onClick={openNextPopUp}>
												{i18n.lbl_Later}
											</button>
											<button
												onClick={RedirectToDeposit}
												className="orange">
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
				!readCookie(cookieOfficialAnnounce)
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
							src={`${bannerImgUrl}/h5/img/nonlogin/300x300_goal_${userInfo.langId}.jpg`}
							alt="OfficialAnnounce"
							onClick={toDownloadPage}
						/>
					),
					hasBtn: true,
					btnBar: (
						<div className="btn-group">
							<button className="orange" onClick={openNextPopUp}>
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
					className: "angpao_pop active",
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
		userInfo.userName,
		userInfo.isLogin,
		userInfo.langId
	]);

	useEffect(() => {
		const cookieName = `appDownloadHint${userInfo.userName}`;

		if (userInfo.userName && readCookie(cookieName) !== "1") {
			setAppHint(true);
		}
	}, [userInfo.currencyId, userInfo.accountName]);

	const header = (
		<Header
			hideLogo={false}
			showingAppHint={appHint}
			setAppHint={setAppHint}
			hasSideMenu={true}
		/>
	);

	return redirectPath !== null ? (
		<Redirect to={redirectPath} noThrow />
	) : (
		<Layout header={header} mainClass="mainNew" appHint={appHint}>
			{userInfo.isLogin ? (
				<HeaderShortcut userInfo={userInfo} i18n={i18n} />
			) : null}
			<Slider />
			<EventSwipper userInfo={userInfo} />
			<Marquee />
			<Menu i18n={i18n} userInfo={userInfo} />
			{userInfo.isLogin && <RecentlyViewedGameList />}
			<PlaytechJactpot />
			<Top10Winner i18n={i18n} setPopBox={setPopBox} />
			<MiddlePanel langId={userInfo.langId} i18n={i18n} />
			<Bottom i18n={i18n} langId={userInfo.langId} />
			<AddToHomePop i18n={i18n} userInfo={userInfo} />
		</Layout>
	);
};

const PlaytechJactpot = () => {
	const { i18n } = useContext(i18nContext);
	const [jPotSuccess, setJPotSuccess] = useState(true);

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
			<div className={`jackpot${jPotSuccess ? "" : " active"}`}>
				<img src={`${bannerImgUrl}/h5/img/jackpot.png`} alt="" />
				<p>VND</p>
				<p id="tick" />
				{!jPotSuccess && (
					<div className="under">{i18n.lbl_underMaintenance}</div>
				)}
			</div>
		</Link>
	);
};

export default IndexPage;
