import React, { useState, useEffect, useContext, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Redirect, useNavigate } from "@reach/router";
import { useLazyGetPopUpPromotionQuery } from "@ailab-mobile/service";
import { isExpiry } from "@ailab-mobile/promotion";
import { api_promotion_GetPromotionDetail } from "apps/goal123/src/service/api/promotion";
import { isInApp, LeaderboardProvider } from "@ailab-mobile/common";
import {
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
import { api_GetWalletInfo } from "../service/api/account";
import { bannerImgUrl, siteId } from "../config";
import NewYear, {
	defEventPeriod as NewYearEventPeriod
} from "../components/common/popbox.newYear";
import Marquee from "../components/home/marquee";
import HotGames from "../components/home/hotGames";
import HotPromotion from "../components/home/hotPromotion";
import { api_promotion_GetPromotionList } from "../service/api/promotion";
import HomeMatch from "../components/home/homeMatch";
import { api_hotEvent_GetDataList } from "../service/api/hotEvent";
import SportList from "../components/home/sportList";
import TopWinner from "../components/home/TopWinner";
import Jactpot from "../components/home/jackpot";
import FavoriteSlots from "../components/home/FavoriteSlots";
import { api_HotGame_GetDataList } from "../service/api/hotGame";
import RecentlyViewed from "../components/home/RecentlyViewed";
import HomeDownLoad from "../components/home/HomeDownLoad";
import LiveSports from "../components/home/liveSports";
import {
	useHandleStreamList,
	useSelCategory
} from "../components/streaming/hook";
import { api_GetNews } from "../service/api/news";
import News from "../components/home/news";
import { HomeBanner } from "../components/home/homeBanner";
import { useGetTpMaintainList } from "../components/hook/useGetTpMaintainList";
import useGetBalance from "../components/hook/useGetMainBalance";

const apiResPromotionType = {
	retentionFreebet: 9
};

const IndexPage = () => {
	const { userInfo } = useContext(userInfoContext);
	const { setNav } = useContext(navContext);
	const { setPopBox } = useContext(popBoxContext);
	const [redirectPath, setRedirectPath] = useState(null);
	const { setRoot } = useContext(rootContext);
	const navigate = useNavigate();
	const { t } = useTranslation();
	const { maintainList } = useGetTpMaintainList();
	const [promotionList, setPromotionList] = useState([]);
	const filterPromotionList = promotionList.filter(
		item =>
			!isExpiry({
				...item,
				isLogin: userInfo.isLogin
			})
	);
	const [hotEventList, setHotEventList] = useState([]);
	const [hotGameList, setHotGameList] = useState([]);
	const [news, setNews] = useState([]);
	const { selCategory } = useSelCategory();
	const { videoList } = useHandleStreamList({ selCategory });
	const timeRef = useRef(null);
	const { GetBalance } = useGetBalance({
		isLogin: userInfo.isLogin
	});
	const getPromotionList = async () => {
		try {
			const {
				data: { data }
			} = await api_promotion_GetPromotionList({
				langId: userInfo.langId,
				currencyId: userInfo.currencyId
			});
			setPromotionList(data ?? []);
		} catch (error) {
			setPopBox({
				isOpen: true,
				content: t("msg_ApiServerError")
			});
		}
	};

	const getHotEventList = async () => {
		try {
			const {
				data: { data }
			} = await api_hotEvent_GetDataList({
				langId: userInfo.langId
			});
			setHotEventList(data ?? []);
		} catch (error) {
			// setPopBox({
			// 	isOpen: true,
			// 	content: t("msg_ApiServerError")
			// });
		}
	};
	const getHotGameList = async () => {
		try {
			const res = await api_HotGame_GetDataList(userInfo.langId);
			setHotGameList(res.data.data.HotGame ?? []);
		} catch (error) {
			setPopBox({
				isOpen: true,
				content: t("msg_ApiServerError")
			});
		}
	};

	const getNews = async () => {
		try {
			const res = await api_GetNews({
				langId: userInfo.langId,
				currencyId: userInfo.currencyId
			});
			setNews(res.data.data ?? []);
		} catch (error) {
			setPopBox({
				isOpen: true,
				content: t("msg_ApiServerError")
			});
		}
	};

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
								tpWalletsArr?.filter(
									tpWallet => tpWallet.balance > 0
								).length >= 1;

							if (!hasBalance) {
								const RedirectToDeposit = () => {
									setRedirectPath(`/${path.deposit.root}`);
									setPopBox({
										isOpen: false
									});
								};

								setPopBox({
									isOpen: true,
									title: t("lbl_Notice"),
									content: (
										<>
											<p>
												{t(
													"Label_DepositNowPopBalance"
												)}
											</p>
											<p>
												{t(
													"Label_DepositNowPopContent1"
												)}
											</p>
											<p>
												{t(
													"Label_DepositNowPopContent2"
												)}
											</p>
										</>
									),
									hasBtn: true,
									btnBar: (
										<div className="btn-group">
											<button
												className="submit"
												onClick={() => {
													setRedirectPath(
														`/${path.promotion.root}`
													);
													setPopBox({
														isOpen: false
													});
												}}>
												{String(
													t("Label_CheckOutPromos") ||
														""
												).toUpperCase()}
											</button>
											<button
												onClick={RedirectToDeposit}
												className="orange">
												{String(
													t("lbl_DepositNow") || ""
												).toUpperCase()}
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
							content: t("msg_ApiServerError"),
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
							src={`${bannerImgUrl}/h5/img/4.0/nonlogin/300x300_popup.jpg`}
							alt="OfficialAnnounce"
							onClick={toDownloadPage}
						/>
					),
					hasBtn: true,
					btnBar: (
						<div className="btn-group">
							<button className="blue" onClick={openNextPopUp}>
								{t("lbl_Close")}
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
			getPopUpPromotion({ langId: userInfo.langId }).then(
				({ data: { data: { bonusCode } = {} } = {} }) => {
					if (bonusCode) {
						// getting promotion detail to determine the type of promotion
						api_promotion_GetPromotionDetail({
							langId: userInfo.langId,
							BonusCode: bonusCode
						}).then(
							// giving default value to response data and promotionType
							({
								data: {
									data: { promotionType = null } = {}
								} = {}
							}) => {
								setPopBox({
									isOpen: true,
									className: "promosback active",
									displayStyle: "", //* 默認為block, 給空字串防止跑版
									custContent: (
										<div className="pop promosbackpop">
											<img
												src={`${
													process.env
														.REACT_APP_BANNER_URL
												}/desktop/img/promosBackPopup/promosPopup-${
													userInfo?.langId || "en"
												}.png`}
												alt="img-promosPopup"
											/>
											<button
												className="popgo"
												// if promotion type = retention freebet(9), then link to retention landing page
												onClick={() => {
													if (
														promotionType ===
														apiResPromotionType.retentionFreebet
													) {
														navigate(
															`/${path.retention.root}`
														);
													} else {
														navigate(
															`/${path.promotion.root}?bonusCode=${bonusCode}`
														);
													}

													setPopBox({
														isOpen: false
													});
												}}>
												{t("lbl_ClaimNow")}
											</button>
											<img
												src={`${process.env.REACT_APP_BANNER_URL}/desktop/img/promosBackPopup/delet.png`}
												alt="img-delet"
												className="closepop"
												onClick={() => {
													setPopBox({
														isOpen: false
													});
													openNextPopUp();
												}}
											/>
										</div>
									)
								});
								setCookie(cookieName, "1", 1);
							}
						);
					} else {
						openNextPopUp();
					}
				}
			);
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
		setPopBox,
		userInfo.currencyId,
		userInfo.accountName,
		userInfo.isLogin,
		userInfo.langId
	]);

	useEffect(() => {
		getPromotionList();
		getHotEventList();
		getHotGameList();
	}, []);

	useEffect(() => {
		getNews();
		getHotGameList();
	}, [userInfo.langId]);

	useEffect(() => {
		getHotEventList();
		timeRef.current = setInterval(() => {
			getHotEventList();
		}, 60000);

		return () => {
			clearInterval(timeRef.current);
		};
	}, []);

	useEffect(() => {
		if (userInfo?.isLogin === true) {
			GetBalance();
		}
	}, [userInfo?.isLogin]);

	return redirectPath !== null ? (
		<Redirect to={redirectPath} noThrow />
	) : (
		<>
			<HomeBanner />
			<Marquee />
			{!userInfo.isLogin && (
				<div className="login-bar btn-group">
					<button
						className="btn-primary"
						onClick={() => setNav(defNavPanel.login)}>
						{t("lbl_Login").toUpperCase()}
					</button>
					<button
						className="btn-secondary"
						onClick={() => setNav(defNavPanel.join)}>
						{t("lbl_JoinNow").toUpperCase()}
					</button>
				</div>
			)}
			<div className="wrapper">
				<div className="col-12">
					<HotGames maintainList={maintainList} />
					<HotPromotion promotionList={filterPromotionList} />
					<HomeMatch hotEventList={hotEventList} />
					<SportList />

					{/* 首頁的 TopWinner 比 leaderboard 頁面更早開發（但功能相同），由於 PM 希望內頁與首頁的資料顯示一致，
                        為了避免相同邏輯分散在兩個頁面，所以將後期開發的 LeaderboardProvider 包裹 TopWinner，共享相同的資料與 API。 */}
					<LeaderboardProvider siteId={siteId} userInfo={userInfo}>
						<TopWinner />
					</LeaderboardProvider>

					<Jactpot />
					<FavoriteSlots hotGameList={hotGameList} />
					{userInfo.isLogin && <RecentlyViewed />}
					{!isInApp() && <HomeDownLoad />}
					<LiveSports videoList={videoList} />
					<News news={news} />
				</div>
			</div>
			<div className="copyright">
				{`© Copyright ${new Date().getFullYear()}. Bwing. All Rights Reserved.`}
			</div>
		</>
	);
};

export default IndexPage;
