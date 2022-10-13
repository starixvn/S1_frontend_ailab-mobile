import React, { useState, useEffect, useContext } from "react";
import { Redirect, Link, useNavigate } from "@reach/router";
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
import { useGetDomainList } from "../components/hook/useGetDomainList";
import Layout from "../components/common/layout";
import Header from "../components/common/header";
import NewYear, {
	defEventPeriod as NewYearEventPeriod
} from "../components/common/popbox.newYear";

const IndexPage = () => {
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const { setRoot } = useContext(rootContext);
	const [redirectPath, setRedirectPath] = useState(null);
	const [appHint, setAppHint] = useState(false);
	const navigate = useNavigate();

	useGetDomainList({
		setPopBox,
		userInfo,
		i18n
	});

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
							src={`${bannerImgUrl}/img/nonlogin/300x300_goal_${userInfo.langId}.jpg`}
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

		const popUpStack = [
			displayDepositPopup,
			displayNewYearPopup,
			displayAnnouncePopup
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
	}, [userInfo.currencyId, userInfo.userName]);

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
			<PlaytechJactpot />
			<Top10Winner i18n={i18n} setPopBox={setPopBox} />
			<MiddlePanel langId={userInfo.langId} i18n={i18n} />
			<Bottom i18n={i18n} langId={userInfo.langId} />
			<AddToHomePop i18n={i18n} userInfo={userInfo} />
		</Layout>
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
			<div className="jackpot">
				<img src={`${bannerImgUrl}/h5/img/jackpot.png`} alt="" />
				<p>VND</p>
				<p id="tick" />
			</div>
		</Link>
	);
};

export default IndexPage;
