import React, { useState, useEffect, useContext } from "react";
import { Redirect, Link, useLocation, useNavigate } from "@reach/router";
import Slider from "../components/home/slider";
import Marquee from "../components/home/marquee";
import {
	i18nContext,
	userInfoContext,
	popBoxContext,
	rootContext,
	navContext
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
import JoinPanel from "../components/join/join.refactor";
import LoginPanel from "../components/login/login";
import LinksPanel from "../components/home/links";
import EventSwipper from "../components/home/eventSwipper";
import HotGameSwipper from "../components/home/hotGameSwipper";
import jackpot from "../styles/img/jackpot.png";
import winner_vn from "../styles/img/EURO_Bwing/EURO-Bwing-VN.jpg";
import winner_en from "../styles/img/EURO_Bwing/EURO-Bwing-EN.jpg";
import defNav from "../components/casino/defNav";
import AddToHomePop from "../components/home/addToHomePop";
import Top10Winner from "../components/home/top10winner";
import config from "../config";
import { useGetDomainList } from "../components/hook/useGetDomainList";
import GameList from "../components/home/menu";

const IndexPage = () => {
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const [redirectPath, setRedirectPath] = useState(null);
	const { setRoot } = useContext(rootContext);
	const navigate = useNavigate();
	const { isDomainPopOpened } = useGetDomainList({
		setPopBox,
		userInfo,
		i18n
	});

	const { root } = useContext(rootContext);

	const location = useLocation();
	const pageInfo = GetPageInfo(location.pathname);

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
		const cookieName = `balanceHint${userInfo.userName}`;
		if (
			userInfo.currencyId &&
			userInfo.userName &&
			readCookie(cookieName) !== "1" &&
			isDomainPopOpened
		) {
			setCookie(cookieName, "1", 1);
			api_GetWalletInfo().then(res => {
				if (res.data.errorCode === 0) {
					const { data } = res.data;
					const mainWallet = {
						id: 0,
						displayKey: "lbl_MainWallet",
						balance: data?.balance
					};
					const tpWalletsArr = data?.tpWallets.map(i => {
						return {
							id: i.tpId,
							displayKey: i.displayKey,
							balance: i.balance
						};
					});

					const hasBalance =
						mainWallet.balance ||
						tpWalletsArr?.filter(t => {
							return t.balance > 0;
						}).length >= 1;

					if (!hasBalance) {
						const ClosePopUp = () => {
							setPopBox({
								isOpen: false
							});
						};

						const RedirectToDeposit = () => {
							setRedirectPath(`/${path.deposit.root}`);
							ClosePopUp();
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
										onClick={ClosePopUp}>
										{i18n.lbl_Later}
									</button>
									<button
										onClick={RedirectToDeposit}
										className="submit">
										{i18n.lbl_DepositNow}
									</button>
								</div>
							)
						});
					}
				}
			});
		}

		if (userInfo.isLogin === false) {
			const RankingWinnerPopup = () => {
				if (
					isEventPeriod({
						endDate: "2021/05/18 23:59:59"
					})
				) {
					setPopBox({
						isOpen: true,
						content: (
							<img
								src={
									userInfo.langId === "vn"
										? winner_vn
										: winner_en
								}
								alt="winner"
							/>
						),
						hasBtn: true
					});
				}
			};
			const closePopbox = () => {
				setPopBox({ isOpen: false });
			};

			const cookieOfficialAnnounce = "OfficialAnnounce_cookie";
			if (readCookie(cookieOfficialAnnounce)) {
				RankingWinnerPopup();
			} else {
				const toDownloadPage = () => {
					navigate(`/${path.appDownload.root}`);
					setPopBox({ isOpen: false });
				};
				setCookie(cookieOfficialAnnounce, true, 1);
				setPopBox({
					isOpen: true,
					content: (
						<img
							src={`${config.bannerImgUrl}/img/nonlogin/300x300_bwing_${userInfo.langId}.jpg`}
							alt="OfficialAnnounce"
							onClick={toDownloadPage}
						/>
					),
					hasBtn: true,
					btnBar: (
						<div className="btn-group">
							<button className="blue" onClick={closePopbox}>
								{i18n.lbl_Close}
							</button>
						</div>
					)
				});
			}
		}
	}, [
		i18n,
		setPopBox,
		userInfo.currencyId,
		userInfo.userName,
		userInfo.isLogin,
		isDomainPopOpened
	]);

	return redirectPath !== null ? (
		<Redirect to={redirectPath} noThrow />
	) : (
		<>
			<Slider />
			<Marquee />
			{userInfo.isLogin === false && (
				<div className="loginbut">
					<LoginPanel
						hideBtn={false}
						ButtonTitle={i18n.lbl_Login.toUpperCase()}
					/>
					<JoinPanel hideBtn={false} />
				</div>
			)}
			<GameList i18n={i18n} userInfo={userInfo} />
			<EventSwipper />
			<GamePanel i18n={i18n} userInfo={userInfo} />
			<HotGameSwipper i18n={i18n} userInfo={userInfo} />
			<PlaytechJactpot />
			<Top10Winner i18n={i18n} />
			<Streaming />
			{/* <MidBanner langId={userInfo.langId} /> */}
			<LinksPanel i18n={i18n} langId={userInfo.langId} />
			<AddToHomePop i18n={i18n} userInfo={userInfo} />
		</>
	);
};

const PlaytechJactpot = () => {
	useEffect(() => {
		const ticker2 =
			typeof Ticker === "undefined"
				? null
				: new Ticker({
						info: 2,
						casino: "hotspin88am",
						currency: "vnd"
				  });
		ticker2?.attachToTextBox("tick");
		ticker2?.SetCurrencySign("");
		ticker2?.tick();
	}, []);

	return (
		<Link to={`/${path.casino.root}`} state={{ nav: defNav.PROMO.key }}>
			<div className="bannerS">
				<img src={jackpot} alt="" />
				<p>VND</p>
				<p id="tick" />
			</div>
		</Link>
	);
};

export default IndexPage;
