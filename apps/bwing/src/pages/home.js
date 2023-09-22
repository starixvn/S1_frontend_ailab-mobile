import React, { useState, useEffect, useContext, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Redirect, useLocation, useNavigate } from "@reach/router";
import { useLazyGetPopUpPromotionQuery } from "@ailab-mobile/service";
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
import { GetPageInfo } from "../components/common/layout";
import { api_GetWalletInfo } from "../service/api/account";
import { bannerImgUrl } from "../config";
import NewYear, {
	defEventPeriod as NewYearEventPeriod
} from "../components/common/popbox.newYear";
import { defDeviceType } from "../service/api/base";
import { api_GetAnnouncement } from "../service/api/message";
import Marquee from "../components/home/marquee";
import HotGames from "../components/home/hotGames";
import HotPromotion from "../components/home/hotPromotion";
import { api_promotion_GetPromotionList } from "../service/api/promotion";
import HomeMatch from "../components/home/homeMatch";
import { api_hotEvent_GetDataList } from "../service/api/hotEvent";
import SportList from "../components/home/sportList";
import TopWinner from "../components/home/TopWinner";
import { api_events_GetLeaderboardList } from "../service/api/events";
import Jactpot from "../components/home/jackpot";
import FavoriteSlots from "../components/home/FavoriteSlots";
import { api_HotGame_GetDataList } from "../service/api/hotGame";
import RecentlyViewed from "../components/home/RecentlyViewed";
import { api_GetRecentlyViewed } from "../service/api/game";
import HomeDownLoad from "../components/home/HomeDownLoad";
import LiveSports from "../components/home/liveSports";
import { useHandleStreamList } from "../components/streaming/hook";
import { api_GetNews } from "../service/api/news";
import News from "../components/home/news";
import { HomeBanner } from "../components/home/homeBanner";

const IndexPage = () => {
	const { userInfo } = useContext(userInfoContext);
	const { setNav } = useContext(navContext);
	const { setPopBox } = useContext(popBoxContext);
	const [redirectPath, setRedirectPath] = useState(null);
	const { setRoot } = useContext(rootContext);
	const navigate = useNavigate();
	const location = useLocation();
	const { t } = useTranslation();
	const [announcementList, setAnnouncementList] = useState([]);
	const [promotionList, setPromotionList] = useState([]);
	const [hotEventList, setHotEventList] = useState([]);
	const [leaderBoardList, setLeaderBoardList] = useState([]);
	const [hotGameList, setHotGameList] = useState([]);
	const [recentlyViewedGames, setRecentlyViewedGames] = useState([]);
	const [news, setNews] = useState([]);
	const { videoList } = useHandleStreamList({});
	const timeRef = useRef(null);
	const getPromotionList = async () => {
		try {
			const {
				data: { data }
			} = await api_promotion_GetPromotionList({
				langId: userInfo.langId,
				currencyId: userInfo.currencyId
			});
			setPromotionList(data);
		} catch (error) {
			setPopBox({
				isOpen: true,
				content: t("msg_ApiServerError")
			});
		}
	};

	const getAnnouncement = async () => {
		try {
			const {
				data: { data }
			} = await api_GetAnnouncement({
				langId: userInfo.langId,
				currencyId: userInfo.currencyId
			});
			setAnnouncementList(data);
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
			setHotEventList(data);
		} catch (error) {
			setPopBox({
				isOpen: true,
				content: t("msg_ApiServerError")
			});
		}
	};

	const getLeaderBoardList = async () => {
		try {
			const res = await api_events_GetLeaderboardList({
				lBCategoryId: 0,
				TopNum: 10,
				BeforeDays: 0,
				EventCode: "202104"
			});
			setLeaderBoardList(res.data.data);
		} catch (error) {
			setPopBox({
				isOpen: true,
				content: t("msg_ApiServerError")
			});
		}
	};

	const getHotGameList = async () => {
		try {
			const res = await api_HotGame_GetDataList();
			setHotGameList(res.data.data.HotGame);
		} catch (error) {
			setPopBox({
				isOpen: true,
				content: t("msg_ApiServerError")
			});
		}
	};

	const getRecentlyViewedGames = async () => {
		try {
			const res = await api_GetRecentlyViewed({
				currencyId: userInfo.currencyId
			});
			if (res.data.errorCode === 0) {
				const { recentlyViewedList } = res.data.data;
				setRecentlyViewedGames(recentlyViewedList);
			}
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
			setNews(res.data.data);
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
												{`${t("msg_BalanceHint")} : `}
												<span className="important">
													{`${t(
														`Currency_${userInfo.currencyId}`
													)} 0`}
												</span>
											</p>
											<p>{t("msg_DepositHint")}</p>
										</>
									),
									hasBtn: true,
									btnBar: (
										<div className="btn-group">
											<button
												className="cancel"
												onClick={openNextPopUp}>
												{t("lbl_Later")}
											</button>
											<button
												onClick={RedirectToDeposit}
												className="submit">
												{t("lbl_DepositNow")}
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
							src={`${bannerImgUrl}/h5/img/nonlogin/300x300_bwing_${userInfo.langId}.jpg`}
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
									{t("lbl_ClaimNow")}
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
		setPopBox,
		userInfo.currencyId,
		userInfo.accountName,
		userInfo.isLogin,
		userInfo.langId
	]);

	useEffect(() => {
		getAnnouncement();
		getPromotionList();
		getHotEventList();
		getLeaderBoardList();
		getHotGameList();
		getRecentlyViewedGames();
		getNews();
	}, []);

	useEffect(() => {
		getHotEventList();
		timeRef.current = setInterval(() => {
			getHotEventList();
		}, 60000);

		return () => {
			clearInterval(timeRef.current);
		};
	}, []);

	const handleMarqueeClick = item => {
		if (userInfo.isLogin) {
			const content = item.content.split("\\n").join("　");
			setPopBox({
				isOpen: true,
				title: item.subject,
				content,
				hasBtn: true,
				btnBar: (
					<div className="btn-group">
						<button
							className="blue"
							onClick={() => {
								setPopBox({ isOpen: false });
								setRedirectPath(
									`/${path.message.root}/${path.message.sub.announcement.root}`
								);
							}}>
							{t("lbl_More") ?? "More"}
						</button>
					</div>
				)
			});
		} else {
			setNav(defNavPanel.login);
		}
	};
	return redirectPath !== null ? (
		<Redirect to={redirectPath} noThrow />
	) : (
		<>
			<HomeBanner />
			<Marquee list={announcementList} onClick={handleMarqueeClick} />
			{userInfo.isLogin === false && (
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
					<HotGames />
					<HotPromotion promotionList={promotionList} />
					<HomeMatch hotEventList={hotEventList} />
					<SportList />
					<TopWinner leaderBoardList={leaderBoardList} />
					<Jactpot />
					<FavoriteSlots hotGameList={hotGameList} />
					{userInfo.isLogin && (
						<RecentlyViewed
							recentlyViewedGames={recentlyViewedGames}
						/>
					)}
					<HomeDownLoad />
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
